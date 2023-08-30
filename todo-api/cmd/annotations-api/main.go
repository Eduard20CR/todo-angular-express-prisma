package main

import (
	"fmt"
	"net/http"

	"github.com/Scarus/annotations-api/internal/db"
	"github.com/Scarus/annotations-api/internal/routers"
)

func main() {

	db.DbConnection()

	fmt.Println(db.GetDB())

	r := routers.NewTodoRouter()

	http.ListenAndServe(":3000", r)
}
