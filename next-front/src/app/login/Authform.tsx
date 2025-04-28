
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
    'use server';
    const apiKey = formData.get('apiKey');

    const response = await fetch('http://localhost:8080/accounts', {
      headers: {
        'X-API-KEY': apiKey as string,
      }
    })

    if (!response.ok) {
        throw new Error('Invalid API Key');
    }

    const cookiesStore = await cookies();
    cookiesStore.set('apiKey', apiKey as string) 

    redirect('/invoices');
}


export function AuthForm() {
    return (
        <form className="space-y-6" action={loginAction}>
        <div className="space-y-2">
          <label htmlFor="apiKey" className="block text-sm font-medium">
            API Key
          </label>
          <Input
            id="apiKey"
            type="text"
            name="apiKey"
            placeholder="Digite sua API Key"
            className="w-full bg-[#2d3748] border-gray-700"
          />
        </div>

        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
    )
}