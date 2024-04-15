package user

import (
	"context"
	"server/util"
	"strconv"
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

func (s *service) CreateUser(c context.Context, req *CreateUserRequest) (*CreateUserResponse, error) {
	ctx, cancel := context.WithTimeout(c, s.timeout)
	defer cancel()

	hashedPassword, err := util.HashPassword(req.Password)

	if err != nil {
		return nil, err
	}

	u := &User{
		Username:  req.Username,
		Email:     req.Email,
		Password:  hashedPassword,
		Bio:       req.Bio,
		AvatarURL: req.AvatarURL,
	}

	r, err := s.repository.CreateUser(ctx, u)

	if err != nil {
		return nil, err
	}

	return &CreateUserResponse{
		ID:       strconv.FormatInt(r.ID, 10),
		Username: r.Username,
		Email:    r.Email,
		Bio:      r.Bio,
		Avatar:   r.AvatarURL,
	}, nil

}
