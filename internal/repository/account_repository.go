package repository

import (
	"database/sql"
	"time"

	"github.com/JP-Becker/Gateway-pagamento/internal/domain"
)

type AccountRepository struct {
	db *sql.DB
}

// Update implements domain.AccountRepository.
func (r *AccountRepository) Update(account *domain.Account) error {
	panic("unimplemented")
}

func NewAccountRepository(db *sql.DB) *AccountRepository {
	return &AccountRepository{db: db}
}

func (r *AccountRepository) Save(account *domain.Account) error {
	// Faz a conexão com o banco de dados
	stmt, err := r.db.Prepare(`
	INSERT INTO accounts (id, name, email, api_key, balance, created_at, updated_at)
	VALUES ($1, $2, $3, $4, $5, $6, $7)
	`)

	// verifica se o erro está em branco e retorna ele caso nao esteja
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(
		account.ID,
		account.Name,
		account.Email,
		account.APIKey,
		account.Balance,
		account.CreatedAt,
		account.UpdatedAt,
	)
	if err != nil {
		return err
	}
	return nil
}

func (r *AccountRepository) FindByAPIKey(apiKey string) (*domain.Account, error) {
	var account domain.Account
	var createdAt, updatedAt time.Time

	// QueryRow faz a consulta no banco de dados e retorna uma linha
	// Scan faz o mapeamento dos dados retornados para as variáveis passadas como argumento
	err := r.db.QueryRow(`
	SELECT id, name, email, api_key, balance, created_at, updated_at
	FROM accounts WHERE api_key = $1`, apiKey).Scan(
		&account.ID,
		&account.Name,
		&account.Email,
		&account.APIKey,
		&account.Balance,
		&createdAt,
		&updatedAt,
	)

	if err == sql.ErrNoRows {
		return nil, domain.ErrAccountNotFound
	}
	if err != nil {
		return nil, err
	}

	account.CreatedAt = createdAt
	account.UpdatedAt = updatedAt

	return &account, nil
}

func (r *AccountRepository) FindByID(id string) (*domain.Account, error) {
	var account domain.Account
	var createdAt, updatedAt time.Time

	// QueryRow faz a consulta no banco de dados e retorna uma linha
	// Scan faz o mapeamento dos dados retornados para as variáveis passadas como argumento
	err := r.db.QueryRow(`
	SELECT id, name, email, api_key, balance, created_at, updated_at
	FROM accounts WHERE id = $1`, id).Scan(
		&account.ID,
		&account.Name,
		&account.Email,
		&account.APIKey,
		&account.Balance,
		&createdAt,
		&updatedAt,
	)

	if err == sql.ErrNoRows {
		return nil, domain.ErrAccountNotFound
	}
	if err != nil {
		return nil, err
	}

	account.CreatedAt = createdAt
	account.UpdatedAt = updatedAt

	return &account, nil
}

func (r *AccountRepository) UpdateBalance(account *domain.Account) error {
	tx, err := r.db.Begin()
	if err != nil {
		return err
	}
	// O rollback é usado para desfazer a transação em caso de erro
	// O defer garante que o rollback será chamado quando a função terminar, mesmo que ocorra um panic
	defer tx.Rollback()

	var currentBalance float64
	err = tx.QueryRow(`SELECT balance FROM accounts WHERE id = $1 FOR UPDATE`, account.ID).Scan(&currentBalance)

	if err == sql.ErrNoRows {
		return domain.ErrAccountNotFound
	}
	if err != nil {
		return err
	}
	_, err = tx.Exec(`
	UPDATE accounts
	SET balance = $1, updated_at = $2
	WHERE id = $3`, currentBalance+account.Balance, time.Now(), account.ID)
	if err != nil {
		return err
	}
	return tx.Commit()
}
