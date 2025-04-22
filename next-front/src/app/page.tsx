"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader } from "lucide-react"
import { Header } from "@/components/header"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redireciona para o dashboard após a renderização
    router.push("/dashboard")
  }, [router])

  return (
    <div className="min-h-screen flex flex-col bg-[#1a202c]">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Loader className="h-10 w-10 text-indigo-600 animate-spin" />
          </div>
          <p className="text-gray-400">Redirecionando para o dashboard</p>
        </div>
      </main>
      <footer className="bg-[#1a202c] text-center py-4 text-sm text-gray-500">
        © 2025 Full Cycle Gateway. Todos os direitos reservados.
      </footer>
    </div>
  )
}
