import { render } from '@testing-library/react'
import Title from '.'

describe('Title', () => {
  it('should be render correctly', () => {
    const { container } = render(<Title label="Title" />)

    expect(container).toMatchSnapshot()
  })
})
