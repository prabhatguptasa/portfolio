import { motion } from 'framer-motion'
import { Button, Avatar, Divider, Tooltip, Spacer } from '@heroui/react'
import { 
  User, 
  Briefcase, 
  Mail, 
  Sparkles,
  ArrowRight
} from 'lucide-react'

const sections = [
  {
    id: 'about',
    title: 'About',
    icon: User,
    preview: '8+ Years • 15+ Projects',
    color: 'primary',
    description: 'Discover my journey, skills, and expertise'
  },
  {
    id: 'experience',
    title: 'Experience',
    icon: Briefcase,
    preview: 'Tech Lead • Cloud & AI',
    color: 'secondary',
    description: 'Explore my professional journey'
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: Mail,
    preview: 'Let\'s Connect',
    color: 'success',
    description: 'Get in touch and collaborate'
  },
]

export default function Hero() {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="h-full flex items-center justify-center relative overflow-hidden bg-gradient-animated">
      <div className="absolute inset-0 bg-pattern-dots opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, type: 'spring' }}
            className="flex justify-center mb-4"
          >
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, type: 'spring' }}
            className="flex justify-center mb-4"
          >
            <Avatar
              src="https://i.pravatar.cc/150?u=prabhat"
              name="Prabhat Gupta"
              size="lg"
              className="w-20 h-20 text-large"
              isBordered
              color="primary"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-display mb-3"
          >
            <span className="text-shimmer text-tight">PRABHAT</span>
            <br />
            <span className="text-gradient-primary font-serif text-tight">GUPTA</span>
          </motion.h1>

          <Divider className="my-4 w-24 mx-auto" />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm md:text-base font-heading text-wide text-muted-foreground mb-4"
          >
            Senior Software Engineer
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs md:text-sm text-extra-light mb-6 text-muted-foreground max-w-md mx-auto"
          >
            Building cloud-native systems powered by AI
            <br />
            Leading teams to innovation
          </motion.p>

          <Spacer y={2} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 gap-2 max-w-xs mx-auto"
          >
            {sections.map((section, index) => {
              const Icon = section.icon
              return (
                <Tooltip
                  key={section.id}
                  content={section.description}
                  placement="right"
                  showArrow
                  color={section.color}
                >
                  <Button
                    color={section.color}
                    variant="flat"
                    onPress={() => scrollToSection(section.id)}
                    startContent={<Icon className="w-4 h-4" />}
                    endContent={<ArrowRight className="w-3 h-3" />}
                    className="justify-start font-heading text-xs w-full"
                    aria-label={`Navigate to ${section.title} section`}
                  >
                    <div className="flex-1 text-left">
                      <div className="font-medium">{section.title}</div>
                      <div className="text-xs opacity-70">{section.preview}</div>
                    </div>
                  </Button>
                </Tooltip>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
