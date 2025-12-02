import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Avatar,
  Tooltip,
} from '@heroui/react'
import { Home, User, Briefcase, Mail } from 'lucide-react'

const navItems = [
  { id: 'home', label: 'Home', icon: Home, description: 'Return to homepage' },
  { id: 'about', label: 'About', icon: User, description: 'Learn about me' },
  { id: 'experience', label: 'Experience', icon: Briefcase, description: 'View my work history' },
  { id: 'contact', label: 'Contact', icon: Mail, description: 'Get in touch' },
]

export default function Navigation({ activeSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <Navbar
      isBordered
      className={`transition-all ${isScrolled ? 'bg-background/90 backdrop-blur-lg' : 'bg-transparent'}`}
      maxWidth="full"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Tooltip content="Prabhat Gupta - Portfolio" color="primary" showArrow>
            <div 
              className="flex items-center gap-3 cursor-pointer" 
              onClick={() => scrollToSection('home')}
            >
              <Avatar
                name="PG"
                size="sm"
                color="primary"
                isBordered
                className="bg-gradient-to-br from-primary via-primary/90 to-secondary"
              />
              <div className="hidden sm:block">
                <div className="text-sm font-display font-semibold text-foreground">
                  <span className="text-primary">P</span>rabhat{' '}
                  <span className="text-secondary">G</span>upta
                </div>
              </div>
            </div>
          </Tooltip>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-2" justify="center">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          return (
            <NavbarItem key={item.id} isActive={isActive}>
              <Tooltip
                content={item.description}
                color={isActive ? 'primary' : 'default'}
                showArrow
                placement="bottom"
              >
                <Button
                  as={Link}
                  variant={isActive ? 'solid' : 'light'}
                  color={isActive ? 'primary' : 'default'}
                  onPress={() => scrollToSection(item.id)}
                  startContent={<Icon className="w-4 h-4" />}
                  className="font-heading"
                  aria-label={`Navigate to ${item.label} section`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Button>
              </Tooltip>
            </NavbarItem>
          )
        })}
      </NavbarContent>

      <NavbarMenu>
        {navItems.map((item, index) => {
          const Icon = item.icon
          return (
            <NavbarMenuItem key={`${item.id}-${index}`}>
              <Link
                color={activeSection === item.id ? 'primary' : 'foreground'}
                className="w-full flex items-center gap-2"
                onPress={() => scrollToSection(item.id)}
                size="lg"
                aria-label={`Navigate to ${item.label} section`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            </NavbarMenuItem>
          )
        })}
      </NavbarMenu>
    </Navbar>
  )
}
