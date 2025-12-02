import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Card, 
  CardBody, 
  CardHeader,
  Chip,
  Avatar,
  Divider,
  Tooltip,
  Listbox,
  ListboxItem,
  ListboxSection
} from '@heroui/react'
import { 
  Cloud, 
  Code, 
  Database, 
  Brain, 
  Server, 
  GitBranch,
  Zap,
  Shield,
  Rocket,
  Target,
  Users,
  TrendingUp,
} from 'lucide-react'

const skills = [
  { icon: Cloud, label: 'AWS Cloud', color: 'primary' },
  { icon: Code, label: 'Python', color: 'secondary' },
  { icon: Database, label: 'Data Pipelines', color: 'success' },
  { icon: Brain, label: 'AI/LLM', color: 'primary' },
  { icon: Server, label: 'Serverless', color: 'secondary' },
  { icon: GitBranch, label: 'GraphQL', color: 'success' },
  { icon: Zap, label: 'AWS CDK', color: 'primary' },
  { icon: Shield, label: 'IaC', color: 'secondary' },
]

const focusAreas = [
  { 
    key: 'cloud',
    icon: Cloud, 
    label: 'Cloud Engineering', 
    description: 'Scalable infrastructure',
    color: 'primary'
  },
  { 
    key: 'ai',
    icon: Brain, 
    label: 'AI Innovation', 
    description: 'LLM integration',
    color: 'secondary'
  },
  { 
    key: 'leadership',
    icon: Users, 
    label: 'Team Leadership', 
    description: 'Cross-functional teams',
    color: 'success'
  },
]

const stats = [
  { icon: Rocket, value: '8+', label: 'Years', color: 'primary' },
  { icon: Target, value: '15+', label: 'Projects', color: 'secondary' },
  { icon: TrendingUp, value: '100%', label: 'Satisfaction', color: 'success' },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className="space-y-4 sm:space-y-6">
      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Tooltip
                key={index}
                content={`${stat.value} ${stat.label}`}
                color={stat.color}
                showArrow
              >
                <Card className="bg-card/50 border border-border hover:scale-105 transition-transform cursor-pointer" radius="xl">
                  <CardBody className="p-3 sm:p-5 text-center">
                    <Avatar
                      icon={<Icon className="w-4 h-4 sm:w-6 sm:h-6" />}
                      size="md"
                      color={stat.color}
                      className="mx-auto mb-2 sm:mb-3"
                      isBordered
                    />
                    <div className="text-xl sm:text-2xl md:text-3xl font-display number-counter text-tight mb-1">{stat.value}</div>
                    <p className="text-xs sm:text-sm text-muted-foreground font-heading">{stat.label}</p>
                  </CardBody>
                </Card>
              </Tooltip>
            )
          })}
        </div>
      </motion.div>

      <Divider />

      {/* Who I Am Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Card className="bg-card/30 border border-border" radius="xl">
          <CardHeader className="flex items-center gap-2 sm:gap-3 pb-3 flex-wrap">
            <Avatar
              icon={<Code className="w-5 h-5 sm:w-6 sm:h-6" />}
              size="md"
              color="primary"
              isBordered
              className="flex-shrink-0"
            />
            <h3 className="text-lg sm:text-xl font-heading text-gradient-primary">Who I Am</h3>
          </CardHeader>
          <CardBody className="pt-0">
            <p className="text-sm sm:text-base text-foreground mb-3 sm:mb-4 text-balance leading-relaxed">
              I'm <span className="font-serif font-medium text-primary">Prabhat</span> — a Senior Software Engineer with over{' '}
              <span className="font-display font-medium number-counter">8 years</span> of experience building cloud-native, data-driven, and AI-enhanced systems.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 text-balance leading-relaxed">
              Currently leading as <span className="text-primary font-medium">Tech Lead for Lumos</span>, architecting ETL pipelines, integrating LLM-based chat systems, and driving infrastructure evolution using AWS CDK.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Cloud-Native', 'AI/ML', 'Serverless', 'Leadership'].map((tag, i) => (
                <Chip
                  key={tag}
                  size="sm"
                  variant="flat"
                  color="primary"
                  className="font-heading text-xs sm:text-sm"
                >
                  {tag}
                </Chip>
              ))}
            </div>
          </CardBody>
        </Card>
      </motion.div>

      <Divider />

      {/* Focus Areas Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Card className="bg-card/30 border border-border" radius="xl">
          <CardHeader className="flex items-center gap-2 sm:gap-3 pb-3 flex-wrap">
            <Avatar
              icon={<Target className="w-5 h-5 sm:w-6 sm:h-6" />}
              size="md"
              color="secondary"
              isBordered
              className="flex-shrink-0"
            />
            <h3 className="text-lg sm:text-xl font-heading text-gradient-primary">Focus Areas</h3>
          </CardHeader>
          <CardBody className="pt-0 p-0">
            <Listbox
              aria-label="Focus Areas"
              variant="flat"
              className="p-0"
            >
              <ListboxSection>
                {focusAreas.map((area) => {
                  const Icon = area.icon
                  return (
                    <ListboxItem
                      key={area.key}
                      textValue={area.label}
                      startContent={
                        <Avatar
                          icon={<Icon className="w-4 h-4 sm:w-5 sm:h-5" />}
                          size="sm"
                          color={area.color}
                          isBordered
                          className="flex-shrink-0"
                        />
                      }
                      description={area.description}
                      className="py-2 sm:py-3"
                    >
                      <span className="font-heading text-sm sm:text-base">{area.label}</span>
                    </ListboxItem>
                  )
                })}
              </ListboxSection>
            </Listbox>
          </CardBody>
        </Card>
      </motion.div>

      <Divider />

      {/* Technical Expertise Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl font-display text-gradient-primary mb-1">Technical Expertise</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">Technologies and tools I work with</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
          {skills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <Tooltip
                key={skill.label}
                content={skill.label}
                color={skill.color}
                showArrow
                placement="top"
              >
                <Card
                  className="bg-card/30 border border-border hover:border-primary/50 transition-all cursor-pointer hover:scale-105"
                  isPressable
                  radius="xl"
                >
                  <CardBody className="p-3 sm:p-4 md:p-5 text-center">
                    <Avatar
                      icon={<Icon className="w-5 h-5 sm:w-6 sm:h-7 md:w-7 md:h-7" />}
                      size="md"
                      color={skill.color}
                      className="mx-auto mb-2 sm:mb-3"
                      isBordered
                    />
                    <h4 className="text-xs sm:text-sm font-heading text-foreground line-clamp-2">{skill.label}</h4>
                  </CardBody>
                </Card>
              </Tooltip>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
