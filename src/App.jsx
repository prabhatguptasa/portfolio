import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
  Divider,
  Spacer,
  Card,
} from '@heroui/react'
import { User, Briefcase, Mail, Sparkles, X } from 'lucide-react'
import About from './components/About'
import Experience from './components/Experience'
import Contact from './components/Contact'

const sections = [
  {
    id: 'about',
    title: 'About Me',
    icon: User,
    description: 'Discover my journey, skills, and expertise',
    color: 'primary',
    component: About,
  },
  {
    id: 'experience',
    title: 'Experience',
    icon: Briefcase,
    description: 'Explore my professional journey',
    color: 'secondary',
    component: Experience,
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: Mail,
    description: 'Get in touch and collaborate',
    color: 'success',
    component: Contact,
  },
]

function App() {
  const [openModal, setOpenModal] = useState(null)

  const handleOpen = (sectionId) => {
    setOpenModal(sectionId)
  }

  const handleClose = () => {
    setOpenModal(null)
  }

  return (
    <div className="h-screen overflow-hidden bg-background bg-gradient-animated relative">
      <div className="absolute inset-0 bg-pattern-dots opacity-20" />
      
      <div className="relative z-10 h-full flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center w-full max-w-6xl mx-auto"
        >
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 sm:mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="flex justify-center mb-4 sm:mb-6"
            >
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary animate-pulse" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="flex justify-center mb-4 sm:mb-6"
            >
              <div className="relative">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent flex items-center justify-center">
                  <span className="text-xl sm:text-2xl font-display font-bold text-primary-foreground tracking-tighter">
                    PG
                  </span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-3xl sm:text-5xl md:text-7xl font-display mb-3 sm:mb-4"
            >
              <span className="text-shimmer text-tight">PRABHAT</span>
              <br />
              <span className="text-gradient-primary font-serif text-tight">GUPTA</span>
            </motion.h1>

            <Divider className="my-4 sm:my-6 w-24 sm:w-32 mx-auto" />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-base sm:text-lg md:text-xl font-heading text-wide text-muted-foreground mb-2"
            >
              Senior Software Engineer
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xs sm:text-sm md:text-base text-extra-light text-muted-foreground max-w-2xl mx-auto px-4"
            >
              Building cloud-native systems powered by AI
              <br />
              Leading teams to innovation
            </motion.p>
          </motion.div>

          <Spacer y={2} />

          {/* Section Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-4xl mx-auto"
          >
            {sections.map((section, index) => {
              const Icon = section.icon
              const SectionComponent = section.component
              
              // Contact section - direct link, no modal
              if (section.id === 'contact') {
                return (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="w-full sm:w-auto sm:flex-1 max-w-xs"
                  >
                    <Button
                      as="a"
                      href="https://in.linkedin.com/in/prabhat--gupta"
                      target="_blank"
                      rel="noopener noreferrer"
                      color={section.color}
                      variant="flat"
                      size="lg"
                      onPress={() => {}}
                      startContent={<Icon className="w-5 h-5" />}
                      className="w-full h-24 sm:h-28 font-heading text-base sm:text-lg"
                      radius="xl"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-semibold">{section.title}</span>
                        <span className="text-xs opacity-70 font-normal">
                          {section.description}
                        </span>
                      </div>
                    </Button>
                  </motion.div>
                )
              }
              
              // Other sections - with modal
              return (
                <div key={section.id} className="w-full sm:w-auto sm:flex-1 max-w-xs">
                  <Modal
                    isOpen={openModal === section.id}
                    onClose={handleClose}
                    backdrop="blur"
                    size="5xl"
                    scrollBehavior="inside"
                    placement="center"
                    hideCloseButton={true}
                    classNames={{
                      base: "border border-border/50 mx-2 sm:mx-4 rounded-2xl",
                      wrapper: "max-h-[95vh]",
                      backdrop: "bg-background/80 backdrop-blur-md",
                      header: "border-b border-border/50 px-4 sm:px-6 flex-shrink-0 rounded-t-2xl",
                      body: "py-4 sm:py-6 px-4 sm:px-6 overflow-y-auto max-h-[calc(95vh-200px)]",
                      footer: "border-t border-border/50 px-4 sm:px-6 flex-shrink-0 rounded-b-2xl",
                    }}
                    motionProps={{
                      variants: {
                        enter: {
                          y: 0,
                          opacity: 1,
                          scale: 1,
                          transition: {
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1]
                          }
                        },
                        exit: {
                          y: -20,
                          opacity: 0,
                          scale: 0.95,
                          transition: {
                            duration: 0.2,
                            ease: [0.4, 0, 0.2, 1]
                          }
                        }
                      }
                    }}
                  >
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader className="flex flex-col gap-2 pb-4">
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                <Avatar
                                  icon={<Icon className="w-5 h-5 sm:w-6 sm:h-6" />}
                                  size="lg"
                                  color={section.color}
                                  isBordered
                                  className="flex-shrink-0"
                                />
                                <div className="min-w-0 flex-1">
                                  <h2 className="text-xl sm:text-2xl md:text-3xl font-display text-gradient-primary truncate">
                                    {section.title}
                                  </h2>
                                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
                                    {section.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <Divider />
                          </ModalHeader>
                          <ModalBody>
                            <div className="py-2">
                              <SectionComponent />
                            </div>
                          </ModalBody>
                          <ModalFooter className="flex-col sm:flex-row justify-between gap-2">
                            <Button
                              variant="light"
                              onPress={onClose}
                              startContent={<X className="w-4 h-4" />}
                              className="font-heading w-full sm:w-auto"
                            >
                              Close
                            </Button>
                            <Button
                              color={section.color}
                              variant="flat"
                              onPress={onClose}
                              className="font-heading w-full sm:w-auto"
                            >
                              Done
                            </Button>
                          </ModalFooter>
                        </>
                      )}
                    </ModalContent>
                  </Modal>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    <Button
                      color={section.color}
                      variant="flat"
                      size="lg"
                      onPress={() => handleOpen(section.id)}
                      startContent={<Icon className="w-5 h-5" />}
                      className="w-full h-24 sm:h-28 font-heading text-base sm:text-lg"
                      radius="xl"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-semibold">{section.title}</span>
                        <span className="text-xs opacity-70 font-normal">
                          {section.description}
                        </span>
                      </div>
                    </Button>
                  </motion.div>
                </div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default App
