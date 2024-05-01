package messages

import (
	"context"
	"server/internal/user"
)

type Message struct {
	ID int64 `json:"id" db:"id"`

	SenderID   int64 `json:"sender_id" db:"sender_id"`
	ReceiverID int64 `json:"receiver_id" db:"receiver_id"`

	Status string `json:"status" db:"status"`

	ContentType string `json:"content_type" db:"content_type"`
	Content     string `json:"content" db:"content"`

	Created_at string `json:"created_at" db:"created_at"`
	Updated_at string `json:"updated_at" db:"updated_at"`
}

type MessageWithSender struct {
	Message
	Sender *user.UserSimpleDisplay `json:"sender"`
}

type Repository interface {
	GetLastMessages(ctx context.Context, receiver_id int, limit int) ([]*MessageWithSender, error)
}

type Service interface {
	GetLastMessages(c context.Context, receiver_id int, limit int) ([]*MessageWithSender, error)
}

type MessagesRequest struct {
	ReceiverID int `json:"receiver_id"`
	Limit      int `json:"limit"`
}
