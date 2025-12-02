import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Card, 
  CardBody,
  Button,
  Divider,
  Link,
  Avatar,
  Tooltip,
  Chip
} from '@heroui/react'
import { ArrowRight, Mail, Linkedin, Github, MessageCircle } from 'lucide-react'

const contactMethods = [
  {
    key: 'linkedin',
    label: 'Connect on LinkedIn',
    href: 'https://in.linkedin.com/in/prabhat--gupta',
    icon: Linkedin,
    color: 'primary',
    variant: 'solid',
    description: 'Professional network and updates'
  },
  {
    key: 'email',
    label: 'Send Email',
    href: 'mailto:prabhat.gupta@example.com',
    icon: Mail,
    color: 'secondary',
    variant: 'bordered',
    description: 'Direct email communication'
  },
  {
    key: 'github',
    label: 'View GitHub',
    href: 'https://github.com/prabhat-gupta',
    icon: Github,
    color: 'default',
    variant: 'flat',
    description: 'Code repositories and projects'
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className="space-y-4 sm:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.1, type: 'spring' }}
          className="flex justify-center mb-3 sm:mb-4"
        >
          <Avatar
            icon={<MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />}
            size="lg"
            color="success"
            isBordered
          />
        </motion.div>
        <h3 className="text-lg sm:text-xl font-heading text-foreground mb-2">Let's Connect</h3>
        <p className="text-sm sm:text-base font-serif text-muted-foreground text-balance px-2">
          Have a project in mind? Let's collaborate and build something amazing together.
        </p>
      </motion.div>

      <Divider />

      <Card className="bg-card/30 border border-border" radius="xl">
        <CardBody className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          {contactMethods.map((method, index) => {
            const Icon = method.icon
            return (
              <Tooltip
                key={method.key}
                content={method.description}
                color={method.color}
                showArrow
                placement="left"
              >
                <Button
                  as={Link}
                  href={method.href}
                  target={method.key !== 'email' ? '_blank' : undefined}
                  rel={method.key !== 'email' ? 'noopener noreferrer' : undefined}
                  color={method.color}
                  variant={method.variant}
                  size="lg"
                  startContent={<Icon className="w-4 h-4 sm:w-5 sm:h-5" />}
                  endContent={<ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />}
                  className="w-full font-heading text-sm sm:text-base"
                  aria-label={method.label}
                >
                  {method.label}
                </Button>
              </Tooltip>
            )
          })}
        </CardBody>
      </Card>

      <Divider />

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <Chip
          size="md"
          variant="flat"
          color="success"
          className="font-heading text-xs sm:text-sm"
        >
          Open to opportunities and collaborations
        </Chip>
      </motion.div>
    </div>
  )
}
