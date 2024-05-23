// This is basically the bottom layer of the user service.
//  It is responsible for interacting with the database.

package contacts

import (
	"context"
	"database/sql"
	"fmt"
	"server/internal/user"
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

func (r *repository) GetFavouriteContacts(c context.Context, user_id int) ([]*Contact, error) {

	query := fmt.Sprintf(`
   SELECT u.id, u.username, u.email, u.avatar_url, u.bio, u.created_at, u.updated_at
   FROM contact c
   JOIN users u ON c.contact_id = u.id
   WHERE c.user_id = %d AND c.is_favourite = TRUE
`, user_id)

	rows, err := r.db.QueryContext(c, query)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	contacts := make([]*Contact, 0)

	for rows.Next() {

		c := &Contact{User: &user.Pub_User{}}

		err := rows.Scan(
			&c.User.ID,
			&c.User.Username,
			&c.User.Email,
			&c.User.AvatarURL,
			&c.User.Bio,
			&c.User.Created_at,
			&c.User.Updated_at,
		)

		if err != nil {
			return nil, err
		}

		contacts = append(contacts, c)
	}

	return contacts, nil
}

func (r *repository) GetBlockedContacts(c context.Context, user_id int) ([]*Contact, error) {

	query := fmt.Sprintf(`
	   SELECT u.id, u.username, u.email, u.avatar_url, u.bio, u.created_at, u.updated_at
	   FROM contact
	   JOIN users u ON contact.contact_id = u.id
	   WHERE contact.user_id = %d AND contact.is_blocked = TRUE
	`, user_id)

	rows, err := r.db.QueryContext(c, query)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	contacts := make([]*Contact, 0)

	for rows.Next() {

		c := &Contact{User: &user.Pub_User{}}

		err := rows.Scan(
			&c.User.ID,
			&c.User.Username,
			&c.User.Email,
			&c.User.AvatarURL,
			&c.User.Bio,
			&c.User.Created_at,
			&c.User.Updated_at,
		)

		if err != nil {
			return nil, err
		}

		contacts = append(contacts, c)
	}

	return contacts, nil
}
