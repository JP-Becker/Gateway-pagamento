package domain

import (
	"crypto/rand"
	"encoding/hex"
	"sync"
	"time"

	"github.com/google/uuid"
)

type Account struct {
	ID        string
	Name      string
	Email     string
	APIKey    string
	Balance   float64
	mu        sync.RWMutex // para evitar que sejam sobrescritos os dados da conta (condição de corrida)
	CreatedAt time.Time
	UpdatedAt time.Time
}

func generateAPIKey() string {
	// vai criar um array "slice" de 16 posições, array slice pode mudar de tamanho
	b := make([]byte, 16)
	rand.Read(b)                 // lê 16 bytes aleatórios do sistema operacional e coloca no slice b
	return hex.EncodeToString(b) // converte os bytes em string hexadecimal
}

// Esse asterisco do account ali é um ponteiro, que significa que em qualquer lugar que o objeto for alterado,
// vai ser alterado em todos os lugares. É um apontamento de memória. Se não tivesse o ponteiro, ele ia criar uma cópia do objeto e não ia alterar o original.
// Isso é importante para economizar memória e evitar cópias desnecessárias de objetos grandes.
func NewAccount(name, email string) *Account {

	// o & é pra falar que é um apontamento
	account := &Account{
		ID:        uuid.New().String(),
		Name:      name,
		Email:     email,
		Balance:   0,
		APIKey:    generateAPIKey(),
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	return account
}

// Essa função vai ser tipo um método da struct Account, que vai adicionar um valor ao saldo da conta.
func (a *Account) AddBalance(amount float64) {
	a.mu.Lock()         // bloqueia o mutex para evitar que outros goroutines acessem a conta enquanto ela está sendo atualizada
	defer a.mu.Unlock() // garante que o mutex vai ser liberado depois que a função terminar, mesmo que ocorra um panic
	a.Balance += amount
	a.UpdatedAt = time.Now()

}
