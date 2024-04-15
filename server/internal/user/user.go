package user

import (
	"context"
)

type User struct {
	ID        int64  `json:"id" db:"id"`
	Username  string `json:"username" db:"username"`
	Email     string `json:"email" db:"email"`
	Password  string `json:"password" db:"password"`
	Bio       string `json:"bio" db:"bio"`
	AvatarURL string `json:"avatar_url" db:"avatar_url"`

	Created_at string `json:"created_at" db:"created_at"`
	Updated_at string `json:"updated_at" db:"updated_at"`
}

type CreateUserRequest struct {
	Username  string `json:"username"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	Bio       string `json:"bio"`
	AvatarURL string `json:"avatar_url"`
}

type CreateUserResponse struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Bio      string `json:"bio"`
	Avatar   string `json:"avatar_url"`
}

type Repository interface {
	CreateUser(ctx context.Context, u *User) (*User, error)
}

type Service interface {
	CreateUser(c context.Context, req *CreateUserRequest) (*CreateUserResponse, error)
}
