package db

import (
	"database/sql"

	_ "github.com/lib/pq"
)

type Database struct {
	db *sql.DB // lower case ensures in Go that this field is private => not accessible from outside the package
}

func NewDB() (*Database, error) {
	db, err := sql.Open("postgres", "postgresql://root:password@localhost:5433/go-chat?sslmode=disable")

	if err != nil {
		return nil, err
	}

	return &Database{db: db}, nil
}

func (d *Database) Close() error {
	err := d.db.Close()
	if err != nil {
		return err
	}
	return nil
}

func (d *Database) Ping() error {
	err := d.db.Ping()
	if err != nil {
		return err
	}
	return nil
}

func (d *Database) GetDB() *sql.DB {
	return d.db
}
