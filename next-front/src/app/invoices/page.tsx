"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, Download, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { StatusBadge } from "@/components/status-badge"
import { Pagination } from "@/components/pagination"

// Dados de exemplo
const invoices = [
  {
    id: "#INV-001",
    date: "30/03/2025",
    description: "Compra Online #123",
    value: "R$ 1.500,00",
    status: "Aprovado" as const,
  },
  {
    id: "#INV-002",
    date: "29/03/2025",
    description: "Serviço Premium",
    value: "R$ 15.000,00",
    status: "Pendente" as const,
  },
  {
    id: "#INV-003",
    date: "28/03/2025",
    description: "Assinatura Mensal",
    value: "R$ 99,90",
    status: "Rejeitado" as const,
  },
]

export default function DashboardPage() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [status, setStatus] = useState("Todos")
  const [search, setSearch] = useState("")

  return (
    <div className="min-h-screen flex flex-col bg-[#1a202c]">
      <Header />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto bg-[#1e2533] rounded-lg shadow-lg p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Faturas</h1>
              <p className="text-gray-400 mt-1">Gerencie suas faturas e acompanhe os pagamentos</p>
            </div>
            <Button className="mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
              <Link href="/dashboard/nova-fatura">
                <Plus className="h-4 w-4 mr-2" />
                Nova Fatura
              </Link>
            </Button>
          </div>

          <div className="bg-[#2d3748] rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="bg-[#1e2533] border-gray-700">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="Aprovado">Aprovado</SelectItem>
                    <SelectItem value="Pendente">Pendente</SelectItem>
                    <SelectItem value="Rejeitado">Rejeitado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Data Inicial</label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-[#1e2533] border-gray-700"
                  placeholder="dd/mm/aaaa"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Data Final</label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-[#1e2533] border-gray-700"
                  placeholder="dd/mm/aaaa"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Buscar</label>
                <Input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-[#1e2533] border-gray-700"
                  placeholder="ID ou descrição"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="pb-3 text-gray-400 font-medium">ID</th>
                  <th className="pb-3 text-gray-400 font-medium">DATA</th>
                  <th className="pb-3 text-gray-400 font-medium">DESCRIÇÃO</th>
                  <th className="pb-3 text-gray-400 font-medium">VALOR</th>
                  <th className="pb-3 text-gray-400 font-medium">STATUS</th>
                  <th className="pb-3 text-gray-400 font-medium">AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-gray-700 hover:bg-[#2d3748]">
                    <td className="py-4">{invoice.id}</td>
                    <td className="py-4">{invoice.date}</td>
                    <td className="py-4">{invoice.description}</td>
                    <td className="py-4">{invoice.value}</td>
                    <td className="py-4">
                      <StatusBadge status={invoice.status} />
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                          <Link href={`/dashboard/fatura/${invoice.id.replace("#", "")}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination currentPage={1} totalPages={3} totalResults={50} resultsPerPage={3} />
        </div>
      </main>
    </div>
  )
}
