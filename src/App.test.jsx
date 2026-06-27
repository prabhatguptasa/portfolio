import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import App from './App'

// Mock the nested components
vi.mock('./components/HeroNeural', () => ({
  default: () => <div data-testid="hero-neural">Hero Neural</div>
}))

vi.mock('./components/Navigation', () => ({
  default: ({ activeSection }) => (
    <div data-testid="navigation" data-active-section={activeSection}>
      Navigation
    </div>
  )
}))

vi.mock('./components/About', () => ({
  default: () => <div data-testid="about">About Section</div>
}))

vi.mock('./components/Experience', () => ({
  default: () => <div data-testid="experience">Experience Section</div>
}))

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div data-testid="motion-div" {...props}>{children}</div>
  }
}))

describe('App', () => {
  let originalInnerHeight;
  let originalScrollY;

  beforeEach(() => {
    // Save original window properties
    originalInnerHeight = window.innerHeight;
    originalScrollY = window.scrollY;

    // Mock scroll functionality
    window.scrollTo = vi.fn();

    // Reset DOM mock properties
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      value: 1000
    });
  })

  afterEach(() => {
    // Restore window properties
    window.innerHeight = originalInnerHeight;
    window.scrollY = originalScrollY;
    vi.restoreAllMocks();
  })

  it('renders the application correctly and handles lazy loaded components', async () => {
    render(<App />)

    // Check main sections are present
    expect(screen.getByTestId('hero-neural')).toBeInTheDocument()
    expect(screen.getByTestId('navigation')).toBeInTheDocument()

    // Initially, navigation should have 'home' as active section
    expect(screen.getByTestId('navigation')).toHaveAttribute('data-active-section', 'home')

    // Wait for Suspense to resolve and components to appear
    await waitFor(() => {
      expect(screen.getByTestId('about')).toBeInTheDocument()
      expect(screen.getByTestId('experience')).toBeInTheDocument()
    })
  })

  it('updates active section on scroll to section offsets', async () => {
    // Setup section offsets mock
    const mockGetElementById = vi.spyOn(document, 'getElementById').mockImplementation((id) => {
      if (id === 'home') return { offsetTop: 0, offsetHeight: 300 }
      if (id === 'about') return { offsetTop: 300, offsetHeight: 400 }
      if (id === 'experience') return { offsetTop: 700, offsetHeight: 500 }
      return null
    })

    render(<App />)

    // Wait for Suspense components
    await waitFor(() => {
      expect(screen.getByTestId('about')).toBeInTheDocument()
    })

    // Initially 'home'
    expect(screen.getByTestId('navigation')).toHaveAttribute('data-active-section', 'home')

    // Simulate scrolling down to 'about' section
    // scrollY + 200 >= offsetTop (300) -> scrollY >= 100
    window.scrollY = 150
    fireEvent.scroll(window)

    expect(screen.getByTestId('navigation')).toHaveAttribute('data-active-section', 'about')

    // Simulate scrolling down to 'experience' section
    // scrollY + 200 >= offsetTop (700) -> scrollY >= 500
    window.scrollY = 550
    fireEvent.scroll(window)

    expect(screen.getByTestId('navigation')).toHaveAttribute('data-active-section', 'experience')

    mockGetElementById.mockRestore()
  })

  it('updates active section to "experience" when scrolling to bottom', async () => {
    render(<App />)

    // Wait for Suspense components
    await waitFor(() => {
      expect(screen.getByTestId('about')).toBeInTheDocument()
    })

    // Simulate scrolling to bottom of page
    // (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50
    window.innerHeight = 500
    window.scrollY = 460
    document.documentElement.scrollHeight = 1000

    fireEvent.scroll(window)

    expect(screen.getByTestId('navigation')).toHaveAttribute('data-active-section', 'experience')
  })
})
