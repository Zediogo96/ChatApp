package main

import (
	"log"
	"server/db"
	"server/internal/messages"
	"server/internal/user"
	"server/router"

	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("> Error loading .env file")
	}

	dbConn, err := db.NewDB() // db.NewDB() returns a pointer to a Database struct

	if err != nil {
		log.Fatalf("> Failed to initialize database: %s", err)
	}

	defer dbConn.Close() // defer ensures that the Close() method is called before the main function returns

	userRepository := user.NewRepository(dbConn.GetDB()) // user.NewRepository() returns a pointer to a repository struct
	userService := user.NewService(userRepository)       // user.NewService() returns a pointer to a service struct
	userHandler := user.NewHandler(userService)          // user.NewHandler() returns a pointer to a handler struct

	messagesRepository := messages.NewRepository(dbConn.GetDB())
	messagesService := messages.NewService(messagesRepository)
	messagesHandler := messages.NewHandler(messagesService)

	router.InitRouter(userHandler, messagesHandler) // router.InitRouter() initializes the router with the userHandler
	router.Start(":8080")                           // router.Start() starts the server

}
