interface status {
  id: number
  name: string
}

export interface FilterProps {
  title: string
  label: string
  options: Array<status>
  selectedOption: number
  totalCount: number
  onChange: (newFilter: number) => void
}
