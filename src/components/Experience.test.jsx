import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Experience from './Experience'

// Mock framer-motion to avoid animation complexities in testing
vi.mock('framer-motion', () => {
  const React = require('react')
  return {
    motion: {
      div: ({ children, ...props }) => {
        // filter out framer-motion specific props to prevent DOM warnings
        const { initial, animate, exit, transition, layoutId, whileHover, ...validProps } = props; void initial; void animate; void exit; void transition; void layoutId; void whileHover;
        return React.createElement('div', validProps, children)
      },
      li: ({ children, ...props }) => {
        const { initial, animate, transition, ...validProps } = props; void initial; void animate; void transition;
        return React.createElement('li', validProps, children)
      },
      span: ({ children, ...props }) => {
        const { whileHover, ...validProps } = props; void whileHover;
        return React.createElement('span', validProps, children)
      }
    },
    AnimatePresence: ({ children }) => children,
    useInView: () => true
  }
})

describe('Experience component', () => {
  it('renders section title', () => {
    render(<Experience />)
    expect(screen.getByText('// RUNTIME_LOGS')).toBeInTheDocument()
  })

  it('renders the first experience details initially', () => {
    render(<Experience />)
    expect(screen.getAllByText('Gameopedia').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Senior Software Engineer').length).toBeGreaterThan(0)
  })

  it('allows clicking an experience to show its details', () => {
    render(<Experience />)

    const qaButton = screen.getByRole('button', { name: /Quality Assurance Engineer/i })
    fireEvent.click(qaButton)

    expect(screen.getAllByText('Quality Assurance Engineer').length).toBeGreaterThan(0)

    // Check that 'Selenium' tech is displayed (it might show up multiple times in different parts of UI)
    const seleniumTexts = screen.getAllByText('Selenium')
    expect(seleniumTexts.length).toBeGreaterThan(0)
  })
})
