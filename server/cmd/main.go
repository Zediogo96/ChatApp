package main

import (
	"log"
	"server/db"
	"server/internal/user"
	"server/router"
)

func main() {

	dbConn, err := db.NewDB() // db.NewDB() returns a pointer to a Database struct

	if err != nil {
		log.Fatalf("> Failed to initialize database: %s", err)
	}

	defer dbConn.Close() // defer ensures that the Close() method is called before the main function returns

	userRepository := user.NewRepository(dbConn.GetDB()) // user.NewRepository() returns a pointer to a repository struct
	userService := user.NewService(userRepository)       // user.NewService() returns a pointer to a service struct
	userHandler := user.NewHandler(userService)          // user.NewHandler() returns a pointer to a handler struct

	router.InitRouter(userHandler) // router.InitRouter() initializes the router
	router.Start(":8080")          // router.Start() starts the server

}
