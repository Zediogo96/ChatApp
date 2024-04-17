package router

import (
	"server/internal/user"

	"github.com/gin-gonic/gin"
)

var r *gin.Engine

func InitRouter(userHandler *user.Handler) {
	r = gin.Default()

	r.POST("/signup", userHandler.CreateUser)
	r.GET("/user/:username", userHandler.GetUserByUsername)
	r.POST("/login", userHandler.Login)

	// setup default route
	r.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"message": "Not Found"})
	})
}

func Start(addr string) error {
	return r.Run(addr)
}
