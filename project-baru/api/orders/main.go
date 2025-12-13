package handler

import (
	"encoding/json"
	"net/http"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	response := map[string]string{
		"service": "Order Service",
		"message": "Halo dari Go!",
	}
	json.NewEncoder(w).Encode(response)
}