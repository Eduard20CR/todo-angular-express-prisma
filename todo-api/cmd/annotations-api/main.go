package main

import (
	"fmt"
	"net/http"

	"github.com/Scarus/annotations-api/internal/db"
	"github.com/Scarus/annotations-api/internal/routers"
)

func main() {
	port := ":3000"

	db.DbConnection()

	fmt.Println("Server running on port", port)
	r := routers.NewTodoRouter()
	err := http.ListenAndServe(port, r)
	if err != nil {
		fmt.Println(err.Error())
		panic(0)
	}

}
