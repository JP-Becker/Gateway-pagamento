'use server'
import Link from "next/link"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function logoutAction() {
  'use server'
  const cookiesStore = await cookies();
  cookiesStore.delete('apiKey');
  redirect('/login')
}

export async function Header() {
  const cookiesStore = await cookies()

  const isAuthPage = cookiesStore.get("apiKey")?.value !== undefined;

  return (
    <header className="w-full bg-[#1a202c] border-b border-gray-800 py-4 px-6">
      <div className="flex justify-between items-center">
        <Link href="/invoices" className="text-xl font-bold text-white">
          Full Cycle Gateway
        </Link>
        {!isAuthPage && (
          <div className="flex items-center gap-4">
          <span className="text-gray-300">Olá, usuário</span>
          <form action="logoutAction">
          <Button variant="destructive" size="sm" className="flex items-center gap-1">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
          </form>
         
        </div>
        )}
        
      </div>
    </header>
  )
}
