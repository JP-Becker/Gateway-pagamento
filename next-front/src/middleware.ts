import { NextRequest, NextResponse } from "next/server";

//componente para fazer com que as páginas fora do login so possam ser acessadas caso o usuário esteja autenticado
export function middleware(request: NextRequest) {
  const apiKey = request.cookies.get("apiKey")?.value;

  if (!apiKey) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/invoices/:path*"],
};