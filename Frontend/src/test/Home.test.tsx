import { render, screen } from '@testing-library/react';
import Home from '../pages/auth/Authentication';

test('renders Home heading', () => {
  render(<Home />);
  expect(screen.getByText(/welcome to the home page/i)).toBeInTheDocument();
});
