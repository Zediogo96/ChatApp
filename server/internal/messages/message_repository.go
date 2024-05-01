// This is basically the bottom layer of the user service.
//  It is responsible for interacting with the database.

package messages

import (
	"context"
	"database/sql"
	"fmt"
	"server/internal/user"
)

type DBTX interface {
	ExecContext(ctx context.Context, query string, args ...interface{}) (sql.Result, error)
	PrepareContext(ctx context.Context, query string) (*sql.Stmt, error)
	QueryContext(ctx context.Context, query string, args ...interface{}) (*sql.Rows, error)
	QueryRowContext(ctx context.Context, query string, args ...interface{}) *sql.Row
}

type repository struct {
	db DBTX
}

func NewRepository(db DBTX) Repository {
	// inject the database connection into the repository
	return &repository{db: db}
}

func (r *repository) GetLastMessages(ctx context.Context, receiver_id int, limit int) ([]*MessageWithSender, error) {
	var messages []*MessageWithSender

	query := fmt.Sprintf(`
		SELECT m.*, u.id AS sender_id, u.username AS sender_name, u.avatar_url AS sender_avatar
		FROM message m
		JOIN users u ON m.sender_id = u.id
		WHERE m.receiver_id = %d
		ORDER BY m.created_at DESC
		LIMIT %d`, receiver_id, limit)

	rows, err := r.db.QueryContext(ctx, query)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		var m MessageWithSender
		var sender user.UserSimpleDisplay

		err := rows.Scan(
			&m.ID, &m.SenderID, &m.ReceiverID, &m.ContentType, &m.Content, &m.Status, &m.Created_at, &m.Updated_at,
			&sender.ID, &sender.Username, &sender.AvatarURL,
		)
		if err != nil {
			return nil, err
		}

		m.Sender = &sender // Assign sender user to the message
		messages = append(messages, &m)
	}

	return messages, nil

}
