package messages

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

func (s *service) GetLastMessages(c context.Context, receiver_id int, limit int) ([]*MessageWithSender, error) {
	ctx, cancel := context.WithTimeout(c, s.timeout)
	defer cancel()

	messages, err := s.repository.GetLastMessages(ctx, receiver_id, limit)

	if err != nil {
		return nil, err
	}

	return messages, nil
}
