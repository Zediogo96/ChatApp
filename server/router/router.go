package router

import (
	"server/internal/middleware"

	"server/internal/contacts"
	"server/internal/messages"
	"server/internal/user"
	"server/internal/ws"

	"github.com/gin-gonic/gin"
)

var r *gin.Engine

func InitRouter(userHandler *user.Handler, messagesHandler *messages.Handler, contactsHandler *contacts.Handler) {
	r = gin.Default()

	r.POST("/signup", userHandler.CreateUser)
	r.POST("/login", userHandler.Login)

	// Initialize the websocket route
	r.GET("/ws/:userID", func(c *gin.Context) {
		userID := c.Param("userID")
		ws.ServeWs(c.Writer, c.Request, userID, c, messagesHandler)
	})

	// Initialize the middleware for protected routes, routes above this line are not protected
	r.Use(middleware.AuthMiddleware())

	r.GET("/user/:username", userHandler.GetUserByUsername)

	// Message Routes
	r.GET("/messages/last/:user_id", messagesHandler.GetLastMessages)
	r.GET("/messages/:user_id", messagesHandler.GetMessagesBySender)
	r.GET("/messages/search/:user_id", messagesHandler.SearchMessagesByQuery)

	// Contact Routes
	r.GET("/favourite-contacts/:user_id", contactsHandler.GetFavouriteContacts)
	r.GET("/blocked-contacts/:user_id", contactsHandler.GetBlockedContacts)

	// setup default route
	r.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"message": "Not Found"})
	})
}

func Start(addr string) error {
	return r.Run(addr)
}
