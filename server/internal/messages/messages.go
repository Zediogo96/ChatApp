package messages

import (
	"context"
)

type Message struct {
	ID int64 `json:"id" db:"id"`

	SenderID   int64 `json:"sender_id" db:"sender_id"`
	ReceiverID int64 `json:"receiver_id" db:"receiver_id"`

	ContentType string `json:"content_type" db:"content_type"`
	Content     string `json:"content" db:"content"`

	Created_at string `json:"created_at" db:"created_at"`
	Updated_at string `json:"updated_at" db:"updated_at"`
}

type Repository interface {
	GetLastMessages(ctx context.Context, receiver_id int, limit int) ([]*Message, error)
}

type Service interface {
	GetLastMessages(c context.Context, receiver_id int, limit int) ([]*Message, error)
}

type MessagesRequest struct {
	ReceiverID int `json:"receiver_id"`
	Limit      int `json:"limit"`
}
