package routes

import (
	"github.com/Scarus/annotations-api/internal/controllers"

	"github.com/go-chi/chi/v5"
)

func AuthRoutes() *chi.Mux {
	r := chi.NewRouter()

	r.Post("/sign-up", controllers.SignUser)
	r.Post("/login", controllers.LoginUser)

	return r
}
