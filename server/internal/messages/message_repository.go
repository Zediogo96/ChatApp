// This is basically the bottom layer of the user service.
//  It is responsible for interacting with the database.

package messages

import (
	"context"
	"database/sql"
	"fmt"
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

func (r *repository) GetLastMessages(ctx context.Context, limit int, receiver_id int) ([]*Message, error) {
	var messages []*Message

	query := fmt.Sprintf("SELECT * FROM messages WHERE receiver_id = %d ORDER BY created_at DESC LIMIT %d", receiver_id, limit)

	rows, err := r.db.QueryContext(ctx, query)

	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var m Message

		err = rows.Scan(&m.ID, &m.SenderID, &m.ReceiverID, &m.ContentType, &m.Content, &m.Created_at, &m.Updated_at)

		if err != nil {
			return nil, err
		}

		messages = append(messages, &m)
	}

	return messages, nil

}
