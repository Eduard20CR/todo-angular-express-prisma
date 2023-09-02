package routers

import (
	"net/http"

	"github.com/Scarus/annotations-api/internal/middlewares"
	"github.com/Scarus/annotations-api/internal/routes"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func NewTodoRouter() *chi.Mux {
	r := chi.NewRouter()

	// Chi Middlewares
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"https://*", "http://*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"},
	}))
	r.Use(middleware.Logger)
	r.Use(middleware.AllowContentType("application/json"))
	r.Use(middleware.CleanPath)

	// Custom Middlewares
	r.Use(middlewares.AuthMiddleware)

	// Routes
	r.Mount("/auth", routes.AuthRoutes())
	r.Mount("/users", routes.UserRoutes())
	r.Mount("/groups", routes.GroupsRoutes())

	// Not found and method not allowed
	r.NotFound(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(404)
		w.Write([]byte("route does not exist"))
	})
	r.MethodNotAllowed(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(405)
		w.Write([]byte("method is not valid"))
	})

	return r
}
