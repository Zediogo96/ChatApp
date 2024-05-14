package messages

import (
	"fmt"
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

	user_id, err := strconv.Atoi(c.Param("user_id"))
	limit := c.Query("limit")

	if err != nil || limit == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id and limit are required"})
		return
	}

	// convert the id to an integer
	u.ReceiverID = user_id
	u.Limit, _ = strconv.Atoi(limit)

	res, err := h.Service.GetLastMessages(c.Request.Context(), u.ReceiverID, u.Limit)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)

}

func (h *Handler) GetMessagesBySender(c *gin.Context) {
	var u MessagesRequest

	user_id, err := strconv.Atoi(c.Param("user_id"))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID missing from the request body"})
		return
	}

	senderID, err := strconv.Atoi(c.Query("senderID"))

	fmt.Println(senderID)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Sender ID missing from the request body"})
		return
	}

	u.ReceiverID = user_id

	res, err := h.Service.GetMessagesBySender(c.Request.Context(), u.ReceiverID, senderID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}

func (h *Handler) SearchMessagesByQuery(c *gin.Context) {
	var u MessagesRequest

	user_id, err := strconv.Atoi(c.Param("user_id"))
	query := c.Query("query")

	if err != nil || query == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id and query are required"})
		return
	}

	u.ReceiverID = user_id

	res, err := h.Service.SearchMessagesByQuery(c.Request.Context(), u.ReceiverID, query)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}
