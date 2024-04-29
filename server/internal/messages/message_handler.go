package messages

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	Service Service
}

func NewHandler(s Service) *Handler {
	return &Handler{s}
}

func (h *Handler) GetLastMessages(c *gin.Context) {
	var u MessagesRequest

	if err := c.ShouldBindJSON(&u); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	fmt.Printf("ReceiverID: %d, Limit: %d\n", u.ReceiverID, u.Limit)

	res, err := h.Service.GetLastMessages(c.Request.Context(), u.ReceiverID, u.Limit)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)

}
