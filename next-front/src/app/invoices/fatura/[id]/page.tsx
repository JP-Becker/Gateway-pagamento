"use client"

import Link from "next/link"
import { ArrowLeft, Download, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { StatusBadge } from "@/components/status-badge"

interface InvoiceDetailsPageProps {
  params: {
    id: string
  }
}

export default function InvoiceDetailsPage({ params }: InvoiceDetailsPageProps) {
  const invoiceId = `#${params.id}`

  // Dados de exemplo
  const invoice = {
    id: "#INV-001",
    status: "Aprovado" as const,
    createdAt: "30/03/2025 às 14:30",
    value: "R$ 1.500,00",
    creationDate: "30/03/2025 14:30",
    lastUpdate: "30/03/2025 14:35",
    description: "Compra Online #123",
    paymentMethod: {
      type: "Cartão de Crédito",
      lastDigits: "**** **** **** 1234",
      holder: "João da Silva",
    },
    timeline: [
      {
        title: "Fatura Criada",
        date: "30/03/2025 14:30",
      },
      {
        title: "Pagamento Processado",
        date: "30/03/2025 14:32",
      },
      {
        title: "Transação Aprovada",
        date: "30/03/2025 14:35",
      },
    ],
    additionalData: {
      accountId: "ACC-12345",
      clientIp: "192.168.1.1",
      device: "Desktop - Chrome",
    },
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#1a202c]">
      <Header />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto bg-[#1e2533] rounded-lg shadow-lg p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="mr-2" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Voltar
                </Link>
              </Button>
              <h1 className="text-2xl font-bold">Fatura {invoiceId}</h1>
              <StatusBadge status={invoice.status} className="ml-3" />
            </div>
            <Button variant="outline" size="sm" className="mt-4 sm:mt-0">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
          <p className="text-gray-400 mb-6">Criada em {invoice.createdAt}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#2d3748] rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Informações da Fatura</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">ID da Fatura</span>
                  <span>{invoice.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Valor</span>
                  <span>{invoice.value}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Data de Criação</span>
                  <span>{invoice.creationDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Última Atualização</span>
                  <span>{invoice.lastUpdate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Descrição</span>
                  <span>{invoice.description}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#2d3748] rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Status da Transação</h2>
              <div className="space-y-6">
                {invoice.timeline.map((event, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-400">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#2d3748] rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Método de Pagamento</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Tipo</span>
                  <span>{invoice.paymentMethod.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Últimos Dígitos</span>
                  <span>{invoice.paymentMethod.lastDigits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Titular</span>
                  <span>{invoice.paymentMethod.holder}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#2d3748] rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Dados Adicionais</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">ID da Conta</span>
                  <span>{invoice.additionalData.accountId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">IP do Cliente</span>
                  <span>{invoice.additionalData.clientIp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Dispositivo</span>
                  <span>{invoice.additionalData.device}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
