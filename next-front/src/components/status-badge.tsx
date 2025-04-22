import { cn } from "@/lib/utils"

type StatusType = "Aprovado" | "Pendente" | "Rejeitado"

interface StatusBadgeProps {
  status: StatusType
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusClass = (status: StatusType) => {
    switch (status) {
      case "Aprovado":
        return "bg-green-100 text-green-800"
      case "Pendente":
        return "bg-yellow-100 text-yellow-800"
      case "Rejeitado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <span className={cn("px-3 py-1 rounded-full text-xs font-medium", getStatusClass(status), className)}>
      {status}
    </span>
  )
}
