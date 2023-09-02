package controllers

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

func GetUsers(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("users"))
}

func GetUserById(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	w.Write([]byte(id))
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("user updated"))
}
