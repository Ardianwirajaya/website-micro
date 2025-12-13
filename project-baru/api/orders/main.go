package handler

import (
	"fmt"
	"net/http"
	"encoding/json"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	response := map[string]string{
		"service": "Order Service",
		"status":  "Active",
		"message": "Halo dari Go (Golang) Microservice!",
	}

	json.NewEncoder(w).Encode(response)
}