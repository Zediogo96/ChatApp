package main

import (
	"log"
	"server/db"
	"fmt"
)

func main() {
	
	dbConn, err := db.NewDB() // db.NewDB() returns a pointer to a Database struct
	defer dbConn.Close() // defer ensures that the Close() method is called before the main function returns
	
	if err != nil {
		log.Fatalf("> Failed to initialize database: %s", err)
	}

}