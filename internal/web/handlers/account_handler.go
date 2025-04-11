package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/JP-Becker/Gateway-pagamento/internal/dto"
	"github.com/JP-Becker/Gateway-pagamento/internal/service"
)

type AccountHandler struct {
	accountService *service.AccountService
}

func NewAccountHadnler(accountService *service.AccountService) *AccountHandler {
	return &AccountHandler{accountService: accountService}
}

func (h *AccountHandler) Create(w http.ResponseWriter, r *http.Request) {
	var input dto.CreateAccountInput
	err := json.NewDecoder(r.Body).Decode(&input) // Decodifica o JSON do corpo da requisição para a struct CreateAccountInput
	if err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	output, err := h.accountService.CreatAccount(input)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Define o header da resposta como JSON
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated) // Define o status da resposta como 201 Created
	json.NewEncoder(w).Encode(output) // Codifica a struct AccountOutput para JSON e envia na resposta
}

func (h *AccountHandler) Get(w http.ResponseWriter, r *http.Request) {
	apiKey := r.Header.Get("X-API-Key") // Obtém a chave da API do header da requisição
	if apiKey == "" {
		http.Error(w, "API Key required", http.StatusUnauthorized)
		return
	}

	output, err := h.accountService.FindByAPIKey(apiKey)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(output) // Codifica a struct AccountOutput para JSON e envia na resposta
}
