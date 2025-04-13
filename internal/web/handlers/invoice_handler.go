package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/JP-Becker/Gateway-pagamento/internal/domain"
	"github.com/JP-Becker/Gateway-pagamento/internal/dto"
	"github.com/JP-Becker/Gateway-pagamento/internal/service"
	"github.com/go-chi/chi/v5"
)

type InvoiceHandler struct {
	service *service.InvoiceService
}

func NewInvoiceHandler(invoiceService *service.InvoiceService) *InvoiceHandler {
	return &InvoiceHandler{service: invoiceService}
}

func (h *InvoiceHandler) Create(w http.ResponseWriter, r *http.Request) {
	var input dto.CreateInvoiceInput
	err := json.NewDecoder(r.Body).Decode(&input) // Decodifica o JSON do corpo da requisição para a struct CreateInvoiceInput
	if err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	input.APIKey = r.Header.Get("X-API-Key") // Obtém a chave da API do header da requisição
	output, err := h.service.Create(input)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Define o header da resposta como JSON
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated) // Define o status da resposta como 201 Created
	json.NewEncoder(w).Encode(output) // Codifica a struct InvoiceOutput para JSON e envia na resposta
}

func (h *InvoiceHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if id == "" {
		http.Error(w, "ID required", http.StatusBadRequest)
		return
	}

	apiKey := r.Header.Get("X-API-Key") // Obtém a chave da API do header da requisição
	if apiKey == "" {
		http.Error(w, "API Key required", http.StatusUnauthorized)
		return
	}

	output, err := h.service.GetByID(id, apiKey)
	if err != nil {
		switch err {
		case domain.ErrInvoiceNotFound:
			http.Error(w, "Invoice not found", http.StatusNotFound)
			return
		case domain.ErrAccountNotFound:
			http.Error(w, "Account not found", http.StatusNotFound)
			return
		case domain.ErrUnauthorizedAccess:
			http.Error(w, "Unauthorized access", http.StatusForbidden)
			return
		default:
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(output) // Codifica a struct InvoiceOutput para JSON e envia na resposta
}

func (h *InvoiceHandler) ListByAccount(w http.ResponseWriter, r *http.Request) {
	apiKey := r.Header.Get("X-API-Key") // Obtém a chave da API do header da requisição
	if apiKey == "" {
		http.Error(w, "X-API-Key required", http.StatusUnauthorized)
		return
	}

	output, err := h.service.ListByAccountAPIKey(apiKey)
	if err != nil {
		switch err {
		case domain.ErrAccountNotFound:
			http.Error(w, "Account not found", http.StatusNotFound)
			return
		default:
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(output) // Codifica a struct InvoiceOutput para JSON e envia na resposta
}
