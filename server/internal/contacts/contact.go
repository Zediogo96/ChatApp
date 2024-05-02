package contacts

import (
	"context"
	"server/internal/user"
)

type Contact struct {
	User *user.Pub_User `json:"user"`
}

type Repository interface {
	GetFavouriteContacts(c context.Context, user_id int) ([]*Contact, error)
}

type Service interface {
	GetFavouriteContacts(c context.Context, user_id int) ([]*Contact, error)
}

type MessagesRequest struct {
	ReceiverID int `json:"receiver_id"`
	Limit      int `json:"limit"`
}
