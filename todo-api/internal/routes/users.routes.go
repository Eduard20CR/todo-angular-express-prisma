package routes

import (
	"github.com/Scarus/annotations-api/internal/controllers"

	"github.com/go-chi/chi/v5"
)

func UserRoutes() *chi.Mux {
	r := chi.NewRouter()

	r.Get("/", controllers.GetUsers)
	r.Get("/:id", controllers.GetUserById)
	r.Post("/", controllers.CreateUser)
	r.Patch("/:id", controllers.UpdateUser)

	return r
}
