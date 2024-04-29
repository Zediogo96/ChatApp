package middleware

import (
	"net/http"
	"server/internal/token"

	"github.com/gin-gonic/gin"
)

// AuthMiddleware is the middleware for token validation
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		authHeader := c.GetHeader("Authorization")

		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is missing"})
			c.Abort()
			return
		}

		// Validate token using the ValidateToken function from the token package
		claims, err := token.ValidateToken(authHeader)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		// Set userID in context for further use
		c.Set("userID", claims.ID)
		c.Next()
	}
}
