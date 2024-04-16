package user

import (
	"context"
	"os"
	"server/constants"
	"server/util"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v4"
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

func (s *service) GetUserByUsername(c context.Context, username string) (*User, error) {
	ctx, cancel := context.WithTimeout(c, s.timeout)
	defer cancel()

	u, err := s.repository.GetUserByUsername(ctx, username)

	if err != nil {
		return nil, err
	}

	return u, nil
}

func (s *service) GetUserForAuth(c context.Context, username string) (*User, error) {
	ctx, cancel := context.WithTimeout(c, s.timeout)
	defer cancel()

	u, err := s.repository.GetUserForAuth(ctx, username)

	if err != nil {
		return nil, err
	}

	return u, nil
}

type JWTClaims struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	jwt.RegisteredClaims
}

func (s *service) Login(c context.Context, username, password string) (*LoginResponse, error) {
	ctx, cancel := context.WithTimeout(c, s.timeout)
	defer cancel()

	u, err := s.repository.GetUserForAuth(ctx, username)

	if err != nil {
		return nil, err
	}

	if util.CheckPasswordHash(password, u.Password) != nil {
		return nil, err
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, JWTClaims{
		ID:       strconv.FormatInt(u.ID, 10),
		Username: u.Username,
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:    strconv.Itoa(int(u.ID)),
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 12)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	})

	secret := os.Getenv(constants.JWT_SECRET)

	tokenString, err := token.SignedString([]byte(secret))

	if err != nil {
		return nil, err
	}

	return &LoginResponse{
		ID:         strconv.FormatInt(u.ID, 10),
		Token:      tokenString,
		Username:   u.Username,
		Email:      u.Email,
		Bio:        u.Bio,
		Avatar:     u.AvatarURL,
		Created_at: u.Created_at,
		Updated_at: u.Updated_at,
	}, nil
}
