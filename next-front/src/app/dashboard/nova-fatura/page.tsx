"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CreditCard, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Header } from "@/components/header"

export default function CreateInvoicePage() {
  const router = useRouter()
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardName, setCardName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica para processar o pagamento
    router.push("/dashboard")
  }

  const handleCancel = () => {
    router.push("/dashboard")
  }

  // Calcula valores baseados no valor inserido
  const subtotal = Number.parseFloat(amount) || 0
  const processingFee = subtotal * 0.02
  const total = subtotal + processingFee

  // Formata valores para exibição
  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#1a202c]">
      <Header />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto bg-[#1e2533] rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Criar Nova Fatura</h1>
            <p className="text-gray-400 mt-1">Preencha os dados abaixo para processar um novo pagamento</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium mb-1">
                    Valor
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                    <Input
                      id="amount"
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-8 bg-[#2d3748] border-gray-700"
                      placeholder="0,00"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Descrição
                  </label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-[#2d3748] border-gray-700 min-h-[100px]"
                    placeholder="Descreva o motivo do pagamento"
                  />
                </div>
              </div>

              <div className="bg-[#2d3748] rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Dados do Cartão</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                      Número do Cartão
                    </label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="bg-[#1e2533] border-gray-700 pl-10"
                        placeholder="0000 0000 0000 0000"
                      />
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">
                        Data de Expiração
                      </label>
                      <Input
                        id="expiryDate"
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="bg-[#1e2533] border-gray-700"
                        placeholder="MM/AA"
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium mb-1">
                        CVV
                      </label>
                      <Input
                        id="cvv"
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="bg-[#1e2533] border-gray-700"
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium mb-1">
                      Nome no Cartão
                    </label>
                    <Input
                      id="cardName"
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="bg-[#1e2533] border-gray-700"
                      placeholder="Como aparece no cartão"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#2d3748] rounded-lg p-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxa de Processamento (2%)</span>
                  <span>{formatCurrency(processingFee)}</span>
                </div>
                <div className="border-t border-gray-700 my-2 pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Lock className="h-4 w-4 mr-2" />
                Processar Pagamento
              </Button>
            </div>
          </form>
        </div>
      </main>
      <footer className="bg-[#1a202c] text-center py-4 text-sm text-gray-500">
        © 2025 Full Cycle Gateway. Todos os direitos reservados.
      </footer>
    </div>
  )
}
