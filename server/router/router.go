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

}

func Start(addr string) error {
	return r.Run(addr)
}
