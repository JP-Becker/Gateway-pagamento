"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { InvoiceForm } from "./invoiceForm"

export default function CreateInvoicePage() {
  const [amount, setAmount] = useState("")
  
  return (
    <div className="min-h-screen flex flex-col bg-[#1a202c]">
      {/* <Header /> */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto bg-[#1e2533] rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Criar Nova Fatura</h1>
            <p className="text-gray-400 mt-1">Preencha os dados abaixo para processar um novo pagamento</p>
          </div>

          <InvoiceForm/>
        </div>
      </main>
      <footer className="bg-[#1a202c] text-center py-4 text-sm text-gray-500">
        © 2025 Full Cycle Gateway. Todos os direitos reservados.
      </footer>
    </div>
  )
}
