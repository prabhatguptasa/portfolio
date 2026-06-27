import { render, screen, fireEvent } from '@testing-library/react'
import Navigation from './Navigation'
import { vi } from 'vitest'

// Mock matchMedia if needed by lucide-react or framer-motion in some environments
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

describe('Navigation component', () => {
  beforeEach(() => {
    // Reset timers and mocks before each test
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-01T12:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('renders correctly with default active section', () => {
    render(<Navigation activeSection="home" />)

    // Check system status bar
    expect(screen.getByText('SYSTEM_ONLINE')).toBeInTheDocument()
    // It should display the mocked time
    expect(screen.getByText('12:00:00')).toBeInTheDocument()

    // Check navigation items
    expect(screen.getByText('HOME')).toBeInTheDocument()
    expect(screen.getByText('SYSTEM')).toBeInTheDocument()
    expect(screen.getByText('LOGS')).toBeInTheDocument()

    // Ensure HOME is active and others are not
    const homeNavBtn = screen.getByLabelText('Navigate to HOME section')
    expect(homeNavBtn.firstChild).toHaveClass('bg-primary/10')
    expect(homeNavBtn.firstChild).toHaveClass('text-primary')

    const systemNavBtn = screen.getByLabelText('Navigate to SYSTEM section')
    expect(systemNavBtn.firstChild).not.toHaveClass('bg-primary/10')
  })

  it('handles navigation item click and scrolls', () => {
    // Mock the DOM element to intercept scrollIntoView
    const mockScrollIntoView = vi.fn()
    const originalGetElementById = document.getElementById
    const mockGetElementById = vi.fn((id) => {
      if (id === 'about') {
        return { scrollIntoView: mockScrollIntoView }
      }
      return null
    })
    document.getElementById = mockGetElementById

    render(<Navigation activeSection="home" />)

    const systemNavBtn = screen.getByLabelText('Navigate to SYSTEM section')
    fireEvent.click(systemNavBtn)

    expect(mockGetElementById).toHaveBeenCalledWith('about')
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })

    // Restore original
    document.getElementById = originalGetElementById
  })

  it('updates scroll progress correctly on window scroll', () => {
    render(<Navigation activeSection="home" />)

    // Check initial scroll progress
    expect(screen.getByText('0%')).toBeInTheDocument()

    // Mock document element dimensions
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: 500,
      writable: true
    })
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 2000,
      writable: true
    })
    Object.defineProperty(document.documentElement, 'clientHeight', {
      value: 1000,
      writable: true
    })

    // Simulate scroll event
    fireEvent.scroll(window)

    // Scroll formula is totalScroll / (scrollHeight - clientHeight)
    // 500 / (2000 - 1000) = 0.5 (50%)
    expect(screen.getByText('50%')).toBeInTheDocument()
  })
})
