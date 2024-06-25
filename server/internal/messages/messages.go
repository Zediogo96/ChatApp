package messages

import (
	"context"
	"server/internal/user"
)

type Message struct {
	ID int64 `json:"id" db:"id"`

	SenderID   int64 `json:"sender_id" db:"sender_id"`
	ReceiverID int64 `json:"receiver_id" db:"receiver_id"`

	Status string `json:"status" db:"status"` // read, not_read

	ContentType string `json:"content_type" db:"content_type"`
	Content     string `json:"content" db:"content"`

	Created_at string `json:"created_at" db:"created_at"`
	Updated_at string `json:"updated_at" db:"updated_at"`
}

type MessageWithSender struct {
	Message
	Sender       *user.UserSimpleDisplay `json:"sender"`
	NotReadCount int                     `json:"unread_count"`
}

// define an enum for message status

type Repository interface {
	GetLastMessages(ctx context.Context, receiver_id int, limit int) ([]*MessageWithSender, error)
	GetMessagesBySender(ctx context.Context, receiver_id int, sender_id int) ([]*MessageWithSender, error)
	SearchMessagesByQuery(ctx context.Context, receiver_id int, query string) ([]*MessageWithSender, error)

	SaveMessage(ctx context.Context, m *Message) error
}

type Service interface {
	GetLastMessages(c context.Context, receiver_id int, limit int) ([]*MessageWithSender, error)
	GetMessagesBySender(c context.Context, receiver_id int, sender_id int) ([]*MessageWithSender, error)
	SearchMessagesByQuery(c context.Context, receiver_id int, query string) ([]*MessageWithSender, error)

	SaveMessage(c context.Context, m *Message) error
}

type MessagesRequest struct {
	ReceiverID int `json:"receiver_id"`
	Limit      int `json:"limit"`
}
