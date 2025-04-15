package server

import (
	"net/http"

	"github.com/JP-Becker/Gateway-pagamento/internal/service"
	"github.com/JP-Becker/Gateway-pagamento/internal/web/handlers"
	"github.com/JP-Becker/Gateway-pagamento/internal/web/middleware"
	"github.com/go-chi/chi/v5"
)

type Server struct {
	router         *chi.Mux
	server         *http.Server
	accountService *service.AccountService
	invoiceService *service.InvoiceService
	port           string
}

func NewServer(accountService *service.AccountService, invoiceService *service.InvoiceService, port string) *Server {
	return &Server{
		router:         chi.NewRouter(),
		accountService: accountService,
		invoiceService: invoiceService,
		port:           port,
	}
}

func (s *Server) ConfigureRoutes() {
	accountHandler := handlers.NewAccountHandler(s.accountService)
	invoiceHandler := handlers.NewInvoiceHandler(s.invoiceService)
	authMiddleware := middleware.NewAuthMiddleware(s.accountService)

	s.router.Post("/accounts", accountHandler.Create)
	s.router.Get("/accounts", accountHandler.Get)

	// rotas desse grupo vão utilizar o middleware de autenticação
	// ou seja, só vão ser acessadas se o middleware não retornar erro
	s.router.Group(func(r chi.Router) {
		r.Use(authMiddleware.Authenticate)
		r.Post("/invoice", invoiceHandler.Create)
		r.Get("/invoice/{id}", invoiceHandler.GetByID)
		r.Get("/invoice", invoiceHandler.ListByAccount)
	})

	s.router.Post("/invoices", invoiceHandler.Create)
	s.router.Get("/invoices/{id}", invoiceHandler.GetByID)
	s.router.Get("/invoice", invoiceHandler.ListByAccount)
}

func (s *Server) Start() error {
	s.server = &http.Server{
		Addr:    ":" + s.port,
		Handler: s.router,
	}
	return s.server.ListenAndServe()
}
