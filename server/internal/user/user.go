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

type UserSimpleDisplay struct {
	ID        int64  `json:"id" db:"id"`
	Username  string `json:"username" db:"username"`
	AvatarURL string `json:"avatar_url" db:"avatar_url"`
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

type LoginResponse struct {
	ID         string `json:"id"`
	Token      string `json:"token"`
	Username   string `json:"username"`
	Email      string `json:"email"`
	Bio        string `json:"bio"`
	Avatar     string `json:"avatar_url"`
	Created_at string `json:"created_at"`
	Updated_at string `json:"updated_at"`
}

type Repository interface {
	CreateUser(ctx context.Context, u *User) (*User, error)
	GetUserByUsername(ctx context.Context, username string) (*User, error)
	GetUserForAuth(ctx context.Context, username string) (*User, error)
}

type Service interface {
	CreateUser(c context.Context, req *CreateUserRequest) (*CreateUserResponse, error)
	GetUserByUsername(c context.Context, username string) (*User, error)
	GetUserForAuth(c context.Context, username string) (*User, error)
	Login(c context.Context, username, password string) (*LoginResponse, error)
}
