// This is basically the bottom layer of the user service.
//  It is responsible for interacting with the database.

package user

import (
	"context"
	"database/sql"
	"fmt"
	"time"
)

type DBTX interface {
	ExecContext(ctx context.Context, query string, args ...interface{}) (sql.Result, error)
	PrepareContext(ctx context.Context, query string) (*sql.Stmt, error)
	QueryContext(ctx context.Context, query string, args ...interface{}) (*sql.Rows, error)
	QueryRowContext(ctx context.Context, query string, args ...interface{}) *sql.Row
}

type repository struct {
	db DBTX
}

func NewRepository(db DBTX) Repository {
	// inject the database connection into the repository
	return &repository{db: db}
}

func (r *repository) CreateUser(ctx context.Context, u *User) (*User, error) {

	var lastInsertID int64
	timeNow := time.Now().Format("2006-01-02 15:04:05")

	query := "INSERT INTO users (username, password, email, bio, avatar_url, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id"

	err := r.db.QueryRowContext(ctx, query, u.Username, u.Password, u.Email, u.Bio, u.AvatarURL, timeNow, timeNow).Scan(&lastInsertID)

	if err != nil {
		return nil, err
	}

	u.ID = lastInsertID

	return u, nil
}

func (r *repository) GetUserForAuth(ctx context.Context, username string) (*User, error) {
	var u User

	query := "SELECT id, username, email, password FROM users WHERE username=$1"

	err := r.db.QueryRowContext(ctx, query, username).Scan(&u.ID, &u.Username, &u.Email, &u.Password)

	if err != nil {

		return nil, err
	}

	return &u, nil
}

func (r *repository) GetUserByUsername(ctx context.Context, username string) (*User, error) {
	var u User

	query := "SELECT id, username, email, password, bio, avatar_url, created_at, updated_at FROM users WHERE username=$1"

	err := r.db.QueryRowContext(ctx, query, username).Scan(&u.ID, &u.Username, &u.Password, &u.Email, &u.Bio, &u.AvatarURL, &u.Created_at, &u.Updated_at)

	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	return &u, nil
}
