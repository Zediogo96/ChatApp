package contacts

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

func (h *Handler) GetFavouriteContacts(c *gin.Context) {
	user_id, err := strconv.Atoi(c.Param("user_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user_id"})
		return
	}

	contacts, err := h.Service.GetFavouriteContacts(c, user_id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, contacts)
}

func (h *Handler) GetBlockedContacts(c *gin.Context) {
	user_id, err := strconv.Atoi(c.Param("user_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user_id"})
		return
	}

	contacts, err := h.Service.GetBlockedContacts(c, user_id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, contacts)
}
