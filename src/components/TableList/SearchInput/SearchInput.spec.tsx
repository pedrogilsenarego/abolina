import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchInput from '.'

describe('SearchInput', () => {
  it('should be render correctly', () => {
    const mockOnChange = jest.fn()
    const { container } = render(
      <SearchInput value="" onChange={mockOnChange} placeholder="Test input" />
    )

    expect(container).toMatchSnapshot()

    const input = screen.getByRole('textbox')

    userEvent.type(input, 'Test')

    expect(mockOnChange).toHaveBeenCalled()
    expect(mockOnChange).toHaveBeenCalledTimes(4)
  })
})
