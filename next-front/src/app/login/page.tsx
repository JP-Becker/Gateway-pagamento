import type React from "react"

import { Info } from "lucide-react"
import { Header } from "@/components/header"
import { AuthForm } from "./Authform"

export default function LoginPage() {

  return (
    <div className="min-h-screen flex flex-col bg-[#1a202c]">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#1e2533] rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Autenticação Gateway</h1>
            <p className="text-gray-400">Insira sua API Key para acessar o sistema</p>
          </div>

         <AuthForm />

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
