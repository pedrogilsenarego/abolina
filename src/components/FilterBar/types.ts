export interface status {
  id: number
  name: string
  value: string
}

export interface FilterProps {
  title?: string
  label: string
  options: any[]
  selectedOption: number | string
  totalCount: number
  onChange: (newFilter: number | string) => void
  refKey?: string
  refValue?: string
}
