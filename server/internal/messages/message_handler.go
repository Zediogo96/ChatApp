package messages

import (
	"net/http"
	"strconv"

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

	id := c.Query("id")
	limit := c.Query("limit")

	if id == "" || limit == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id and limit are required"})
		return
	}

	// convert the id to an integer
	u.ReceiverID, _ = strconv.Atoi(id)
	u.Limit, _ = strconv.Atoi(limit)

	res, err := h.Service.GetLastMessages(c.Request.Context(), u.ReceiverID, u.Limit)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)

}
