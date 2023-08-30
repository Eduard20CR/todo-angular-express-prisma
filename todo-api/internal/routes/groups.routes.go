package routes

import (
	"github.com/Scarus/annotations-api/internal/controllers"

	"github.com/go-chi/chi/v5"
)

func GroupsRoutes() *chi.Mux {
	r := chi.NewRouter()

	r.Get("/", controllers.GetGroups)
	r.Get("/:id", controllers.GetGroupById)
	r.Post("/", controllers.CreateGroup)
	r.Patch("/:id", controllers.UpdateGroup)

	return r
}
