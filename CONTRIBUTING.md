# Contributing to Scouty

Thank you for your interest in contributing to Scouty! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please be respectful and professional in all interactions.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (browser, OS, etc.)

### Suggesting Features

We welcome feature suggestions! Please:
- Check existing issues first
- Clearly describe the feature and its benefits
- Explain how it fits with Scouty's mission
- Provide use cases or examples

### Code Contributions

#### Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/Scouty.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`
5. Make your changes
6. Test thoroughly
7. Commit with clear messages
8. Push and create a Pull Request

#### Code Style

- Use TypeScript for all new code
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

#### Commit Messages

Use clear, descriptive commit messages:
- `feat: add token security scanner`
- `fix: resolve wallet connection issue`
- `docs: update installation instructions`
- `style: improve button hover effects`
- `refactor: simplify API calls`

#### Pull Request Process

1. Update documentation if needed
2. Ensure all tests pass
3. Update the README if adding features
4. Reference any related issues
5. Wait for review and address feedback

### Testing

Before submitting:
- Test in multiple browsers
- Verify mobile responsiveness
- Check wallet connection flows
- Test with different Solana wallets
- Run `npm run typecheck` to verify types
- Run `npm run build` to ensure production build works

## Development Guidelines

### File Organization

- Place components in `src/components/`
- Place pages in `src/pages/`
- Place utilities in `src/lib/`
- Keep files focused and single-purpose

### Component Structure

```tsx
// Component imports
import { useState } from 'react';

// Type definitions
interface MyComponentProps {
  title: string;
}

// Component
export default function MyComponent({ title }: MyComponentProps) {
  const [state, setState] = useState(false);

  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}
```

### Database Changes

- Create migrations for schema changes
- Include comprehensive comments
- Test RLS policies thoroughly
- Never commit sensitive data

### Security Considerations

- Never commit API keys or secrets
- Validate all user input
- Use parameterized queries
- Follow OWASP guidelines
- Test security implications

## Questions?

Feel free to:
- Open an issue for questions
- Join our Discord community
- Email us at hello@scouty.fun

Thank you for contributing to Scouty!
