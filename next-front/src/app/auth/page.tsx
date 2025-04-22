"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"

export default function AuthPage() {
  const [apiKey, setApiKey] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (apiKey.trim()) {
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#1a202c]">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#1e2533] rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Autenticação Gateway</h1>
            <p className="text-gray-400">Insira sua API Key para acessar o sistema</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="apiKey" className="block text-sm font-medium">
                API Key
              </label>
              <Input
                id="apiKey"
                type="text"
                placeholder="Digite sua API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-[#2d3748] border-gray-700"
              />
            </div>

            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-8 p-4 bg-[#2d3748] rounded-lg border border-gray-700">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-indigo-400 mt-0.5" />
              <div>
                <h3 className="font-medium text-indigo-400 mb-1">Como obter uma API Key?</h3>
                <p className="text-sm text-gray-400">
                  Para obter sua API Key, você precisa criar uma conta de comerciante. Entre em contato com nosso
                  suporte para mais informações.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
