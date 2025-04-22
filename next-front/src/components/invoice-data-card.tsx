interface DataItem {
  label: string
  value: string
}

interface InvoiceDataCardProps {
  title: string
  data: DataItem[]
}

export function InvoiceDataCard({ title, data }: InvoiceDataCardProps) {
  return (
    <div className="bg-[#2d3748] rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">{title}</h2>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-gray-400">{item.label}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
