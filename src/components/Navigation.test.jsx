import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import Navigation from './Navigation'

// Mock the smooth scroll behavior to prevent jsdom errors
window.HTMLElement.prototype.scrollIntoView = vi.fn()

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => {
  const React = require('react')
  return {
    motion: {
      header: ({ children, ...props }) => {
        const { initial, animate, transition, ...validProps } = props; void initial; void animate; void transition;
        return React.createElement('header', validProps, children)
      },
      div: ({ children, ...props }) => {
        const { initial, animate, transition, layoutId, ...validProps } = props; void initial; void animate; void transition; void layoutId;
        return React.createElement('div', validProps, children)
      },
      a: ({ children, ...props }) => {
        const { whileHover, whileTap, ...validProps } = props; void whileHover; void whileTap;
        return React.createElement('a', validProps, children)
      },
      button: ({ children, ...props }) => {
        const { whileHover, whileTap, ...validProps } = props; void whileHover; void whileTap;
        return React.createElement('button', validProps, children)
      },
      nav: ({ children, ...props }) => {
        const { initial, animate, transition, ...validProps } = props; void initial; void animate; void transition;
        return React.createElement('nav', validProps, children)
      },
      span: ({ children, ...props }) => {
        const { layoutId, ...validProps } = props; void layoutId;
        return React.createElement('span', validProps, children)
      }
    },
    AnimatePresence: ({ children }) => children,
    useScroll: () => ({ scrollYProgress: { get: () => 0, onChange: () => () => {} } }),
    useTransform: () => 0,
    useMotionValueEvent: () => {}
  }
})

describe('Navigation', () => {
  beforeEach(() => {
    // Reset mock before each test
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders correctly with desktop links', () => {
    render(<Navigation activeSection="home" />)

    // Check navigation links
    expect(screen.getByText('SYSTEM')).toBeInTheDocument()
    expect(screen.getByText('LOGS')).toBeInTheDocument()
  })

  it('handles navigation link clicks', () => {
    render(<Navigation activeSection="home" />)

    // Mock the target element
    const mockElement = document.createElement('div')
    mockElement.id = 'about'
    document.body.appendChild(mockElement)

    // Click a nav link
    const projectsLink = screen.getByRole('button', { name: /SYSTEM/i })
    fireEvent.click(projectsLink)

    // Verify scroll function was called
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled()

    document.body.removeChild(mockElement)
  })
})
