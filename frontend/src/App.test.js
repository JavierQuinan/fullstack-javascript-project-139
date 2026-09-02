/* eslint-env jest */
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuthProvider from './contexts/AuthProvider.jsx';
import ChatNavbar from './components/Navbar/ChatNavbar.jsx';

test('renders the chat brand for an anonymous user', () => {
  render(
    <AuthProvider>
      <MemoryRouter>
        <ChatNavbar />
      </MemoryRouter>
    </AuthProvider>,
  );

  expect(screen.getByRole('link', { name: /Hexlet Chat/i })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /Log out/i })).not.toBeInTheDocument();
});
