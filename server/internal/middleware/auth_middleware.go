package middleware

import (
	"net/http"
	"server/internal/token"
	"strings"

	"github.com/gin-gonic/gin"
)

// AuthMiddleware is the middleware for token validation
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		authorizationHeader := c.GetHeader("Authorization")

		extract_token := strings.TrimSpace(strings.Replace(authorizationHeader, "Bearer", "", 1))

		if extract_token == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		claims, err := token.ValidateToken(extract_token)
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
