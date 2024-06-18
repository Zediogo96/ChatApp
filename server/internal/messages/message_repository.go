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

func (r *repository) GetLastMessages(ctx context.Context, receiverID int, limit int) ([]*MessageWithSender, error) {
	var messages []*MessageWithSender

	query := `
		SELECT m.*, u.id AS sender_id, u.username AS sender_name, u.avatar_url AS sender_avatar
		FROM message m
		JOIN users u ON m.sender_id = u.id
		WHERE m.receiver_id = $1
		ORDER BY m.created_at DESC
		LIMIT $2`

	rows, err := r.db.QueryContext(ctx, query, receiverID, limit)
	if err != nil {
		return nil, fmt.Errorf("failed to execute query: %w", err)
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
			return nil, fmt.Errorf("failed to scan row: %w", err)
		}

		m.Sender = &sender
		messages = append(messages, &m)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("rows iteration error: %w", err)
	}

	return messages, nil
}

func (r *repository) SearchMessagesByQuery(ctx context.Context, receiverID int, searchQuery string) ([]*MessageWithSender, error) {
	var messages []*MessageWithSender

	query := `
		SELECT m.*, u.id AS sender_id, u.username AS sender_name, u.avatar_url AS sender_avatar
		FROM message m
		JOIN users u ON m.sender_id = u.id
		WHERE m.receiver_id = $1 AND (m.content LIKE '%' || $2 || '%' OR u.username LIKE '%' || $2 || '%')
		ORDER BY m.created_at DESC`

	rows, err := r.db.QueryContext(ctx, query, receiverID, searchQuery)
	if err != nil {
		return nil, fmt.Errorf("failed to execute query: %w", err)
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
			return nil, fmt.Errorf("failed to scan row: %w", err)
		}

		m.Sender = &sender
		messages = append(messages, &m)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("rows iteration error: %w", err)
	}

	return messages, nil
}

func (r *repository) GetMessagesBySender(ctx context.Context, receiverID int, senderID int) ([]*MessageWithSender, error) {
	var messages []*MessageWithSender

	query := `
		SELECT m.*, u.id AS sender_id, u.username AS sender_name, u.avatar_url AS sender_avatar
		FROM message m
		JOIN users u ON m.sender_id = u.id
		WHERE (m.receiver_id = $1 AND m.sender_id = $2)
		OR (m.receiver_id = $2 AND m.sender_id = $1)
		ORDER BY m.created_at DESC`

	rows, err := r.db.QueryContext(ctx, query, receiverID, senderID)
	if err != nil {
		return nil, fmt.Errorf("failed to execute query: %w", err)
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
			return nil, fmt.Errorf("failed to scan row: %w", err)
		}

		m.Sender = &sender
		messages = append(messages, &m)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("rows iteration error: %w", err)
	}

	return messages, nil
}

func (r *repository) SaveMessage(ctx context.Context, m *Message) error {
	query := `
		INSERT INTO message (sender_id, receiver_id, content, content_type)
		VALUES ($1, $2, $3, $4)`

	_, err := r.db.ExecContext(ctx, query, m.SenderID, m.ReceiverID, m.Content, m.ContentType)
	if err != nil {
		return fmt.Errorf("failed to execute query: %w", err)
	}

	return nil
}
