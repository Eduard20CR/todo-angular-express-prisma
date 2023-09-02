package controllers

import "net/http"

func SignUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("user created"))
}

func LoginUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("user created"))
}
