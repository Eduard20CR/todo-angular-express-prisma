package routers

import (
	"github.com/Scarus/annotations-api/internal/routes"

	"github.com/go-chi/chi/v5"
)

func NewTodoRouter() *chi.Mux {
	r := chi.NewRouter()

	r.Mount("/users", routes.UserRoutes())
	r.Mount("/groups", routes.GroupsRoutes())

	return r
}
