import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import About from './About'

describe('About Component', () => {
  it('renders without crashing', () => {
    render(<About />)
  })

  it('renders section headers', () => {
    render(<About />)
    expect(screen.getByText('// SYSTEM_ARCHITECTURE')).toBeInTheDocument()
    expect(screen.getByText('/SKILLS_MATRIX')).toBeInTheDocument()
  })

  it('renders biography text', () => {
    render(<About />)
    expect(screen.getByText(/Senior Software Engineer/i)).toBeInTheDocument()
    expect(screen.getByText(/whoami/i)).toBeInTheDocument()
    expect(screen.getByText(/Prabhat/i)).toBeInTheDocument()
  })

  it('renders stats', () => {
    render(<About />)
    expect(screen.getByText('YEARS_EXP')).toBeInTheDocument()
    expect(screen.getByText('PROJECTS_DONE')).toBeInTheDocument()
    expect(screen.getByText('SATISFACTION')).toBeInTheDocument()
    expect(screen.getByText('08+')).toBeInTheDocument()
  })

  it('renders focus areas', () => {
    render(<About />)
    expect(screen.getByText('Cloud Engineering')).toBeInTheDocument()
    expect(screen.getByText('AI Innovation')).toBeInTheDocument()
    expect(screen.getByText('Team Leadership')).toBeInTheDocument()
  })

  it('renders skills matrix', () => {
    render(<About />)
    expect(screen.getByText('Python & FastAPI')).toBeInTheDocument()
    expect(screen.getByText('AWS Serverless')).toBeInTheDocument()
    expect(screen.getByText('LLM & AI')).toBeInTheDocument()
  })
})
