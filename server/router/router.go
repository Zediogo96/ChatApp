package router

import (
	"server/internal/middleware"
	"server/internal/user"
	"server/internal/ws"

	"github.com/gin-gonic/gin"
)

var r *gin.Engine

func InitRouter(userHandler *user.Handler) {
	r = gin.Default()

	r.POST("/signup", userHandler.CreateUser)
	r.POST("/login", userHandler.Login)

	// Initialize the websocket route
	r.GET("/ws/:username", func(c *gin.Context) {
		username := c.Param("username")
		ws.ServeWs(c.Writer, c.Request, username)
	})

	// Initialize the middleware for protected routes, routes above this line are not protected
	r.Use(middleware.AuthMiddleware())

	r.GET("/user/:username", userHandler.GetUserByUsername)

	// setup default route
	r.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"message": "Not Found"})
	})
}

func Start(addr string) error {
	return r.Run(addr)
}
