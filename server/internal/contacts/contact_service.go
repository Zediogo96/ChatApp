package contacts

import (
	"context"
	"time"
)

type service struct {
	repository Repository
	timeout    time.Duration
}

func NewService(r Repository) Service {
	return &service{
		r,
		time.Duration(2) * time.Second,
	}
}

func (s *service) GetFavouriteContacts(c context.Context, user_id int) ([]*Contact, error) {
	ctx, cancel := context.WithTimeout(c, s.timeout)
	defer cancel()

	contacts, err := s.repository.GetFavouriteContacts(ctx, user_id)
	if err != nil {
		return nil, err
	}

	return contacts, nil
}

func (s *service) GetBlockedContacts(c context.Context, user_id int) ([]*Contact, error) {
	ctx, cancel := context.WithTimeout(c, s.timeout)
	defer cancel()

	contacts, err := s.repository.GetBlockedContacts(ctx, user_id)
	if err != nil {
		return nil, err
	}

	return contacts, nil
}
