package ws

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"server/internal/messages"

	"github.com/gorilla/websocket"
)

var clients = make(map[*Client]bool)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,

	// TODO: Add a check to make sure the origin is allowed
	CheckOrigin: func(r *http.Request) bool { return true },
}

type Client struct {
	Conn   *websocket.Conn
	userID string
}

// define our WebSocket endpoint
func ServeWs(w http.ResponseWriter, r *http.Request, userID string) {
	fmt.Println(r.Host, r.URL.Query())

	

	// upgrade this connection to a WebSocket
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}

	client := &Client{Conn: ws, userID: userID}
	// register client
	clients[client] = true

	// listen indefinitely for new messages coming through the ws conn
	receiver(client)

}

func receiver(client *Client) {
	for {
		// read in a message
		// readMessage returns messageType, message, err
		// messageType: 1-> Text Message, 2 -> Binary Message
		_, p, err := client.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		fmt.Println("Message Received: ", string(p))

		// parse message from json string to Message struct
		var message messages.Message
		err = json.Unmarshal(p, &message)

		if err != nil {
			log.Println(err)
			return
		}

		fmt.Println("Message Parsed: ", message)

		var receiverID string = strconv.FormatInt(message.ReceiverID, 10)

		fmt.Println("Receiver ID: ", receiverID)

		// find the client that has the same id as the receiver id
		for client := range clients {
			fmt.Println("Client ID: ", client.userID)
			if client.userID == receiverID {
				fmt.Println("Sending message to receiver: ", message)
				// send the message to the receiver
				if err := client.Conn.WriteMessage(1, p); err != nil {
					log.Println(err)
					client.Conn.Close()
					delete(clients, client)
				}
			}
		}

	}
}
