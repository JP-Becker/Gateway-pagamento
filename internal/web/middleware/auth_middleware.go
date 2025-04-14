package middleware

import (
	"net/http"

	"github.com/JP-Becker/Gateway-pagamento/internal/domain"
	"github.com/JP-Becker/Gateway-pagamento/internal/service"
)

type AuthMiddleware struct {
	accountService service.AccountService
}

func NewAuthMiddleware(accountService service.AccountService) *AuthMiddleware {
	return &AuthMiddleware{
		accountService: accountService,
	}
}

func (m *AuthMiddleware) Authenticate(next http.Handler) http.Handler {
	// essa handlerFunc é basicamente uma função que vai chamando as funções do middleware,
	// ou seja, ela vai ser chamada antes de cada handler
	// e se não houver erro, ela vai chamar o próximo handler na pilha
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		apiKey := r.Header.Get("X-API-Key")
		if apiKey == "" {
			http.Error(w, "X-API-Key required", http.StatusUnauthorized)
			return
		}

		_, err := m.accountService.FindByAPIKey(apiKey)
		if err != nil {
			if err == domain.ErrAccountNotFound {
				http.Error(w, err.Error(), http.StatusUnauthorized)
				return
			}

			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		// vai continuar pra proxima funcao do handler caso nao tenha erro
		// se o accountService não retornar erro, significa que a chave da API é válida
		next.ServeHTTP(w, r)
	})
}
