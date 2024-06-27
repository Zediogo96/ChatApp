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

func (s *service) SearchMessagesByQuery(c context.Context, receiver_id int, query string) ([]*MessageWithSender, error) {
	ctx, cancel := context.WithTimeout(c, s.timeout)
	defer cancel()

	messages, err := s.repository.SearchMessagesByQuery(ctx, receiver_id, query)

	if err != nil {
		return nil, err
	}

	return messages, nil
}

func (s *service) GetMessagesBySender(c context.Context, receiver_id int, sender_id int) ([]*MessageWithSender, error) {
	ctx, cancel := context.WithTimeout(c, s.timeout)
	defer cancel()

	messages, err := s.repository.GetMessagesBySender(ctx, receiver_id, sender_id)

	if err != nil {
		return nil, err
	}

	return messages, nil
}

func (s *service) SaveMessage(c context.Context, m *Message) error {
	ctx, cancel := context.WithTimeout(c, s.timeout)
	defer cancel()

	err := s.repository.SaveMessage(ctx, m)

	if err != nil {
		return err
	}

	return nil
}
