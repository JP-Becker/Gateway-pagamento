package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/JP-Becker/Gateway-pagamento/internal/repository"
	"github.com/JP-Becker/Gateway-pagamento/internal/service"
	"github.com/JP-Becker/Gateway-pagamento/internal/web/server"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq" // Importa o driver do postgres, tem o underline pq não vai ser usado diretamente,
	// só o docker vai usar
)

func getEnv(key, defaultValue string) string {
	// se existir a variavel de ambiente, retorna ela, se não existir, retorna o valor padrão
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func main() {
	// Vai tentar carregar as variáveis do ambiente env e se não encontrar, vai soltar um erro e travar a aplicaçao
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	connStr := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		getEnv("DB_HOST", "db"),
		getEnv("DB_PORT", "5432"),
		getEnv("DB_USER", "postgres"),
		getEnv("DB_PASSWORD", "postgres"),
		getEnv("DB_NAME", "gateway"),
		getEnv("DB_SSL_MODE", "disable"),
	)

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("Error connecting to database: ", err)
	}
	defer db.Close()

	accountRepository := repository.NewAccountRepository(db)
	accountService := service.NewAccountService(accountRepository)

	invoiceRepository := repository.NewInvoiceRepository(db)
	invoiceService := service.NewInvoiceService(invoiceRepository, *accountService)

	port := getEnv("HTTP_PORT", "8080")
	srv := server.NewServer(accountService, invoiceService, port)
	srv.ConfigureRoutes()

	if err := srv.Start(); err != nil {
		log.Fatal("Error starting server: ", err)
	}
}
