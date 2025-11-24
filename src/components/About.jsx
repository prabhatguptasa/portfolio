import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
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
  { icon: Cloud, label: 'AWS Cloud', level: 95, color: 'primary' },
  { icon: Code, label: 'Python', level: 90, color: 'accent' },
  { icon: Database, label: 'Data Pipelines', level: 88, color: 'secondary' },
  { icon: Brain, label: 'AI/LLM Integration', level: 85, color: 'primary' },
  { icon: Server, label: 'Serverless Architecture', level: 90, color: 'accent' },
  { icon: GitBranch, label: 'GraphQL', level: 85, color: 'secondary' },
  { icon: Zap, label: 'AWS CDK', level: 92, color: 'primary' },
  { icon: Shield, label: 'Infrastructure as Code', level: 88, color: 'accent' },
]

const focusAreas = [
  { icon: Cloud, label: 'Cloud Engineering', description: 'Scalable infrastructure' },
  { icon: Brain, label: 'AI Innovation', description: 'LLM integration & AI systems' },
  { icon: Users, label: 'Team Leadership', description: 'Leading cross-functional teams' },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div ref={ref} className="min-h-screen py-24 sm:py-32 px-6 sm:px-8 relative bg-background overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-animated opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl rotate-slow" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-accent/10 blur-3xl rotate-slow" style={{ animationDirection: 'reverse' }} />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Creative Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-display font-display mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <span className="text-shimmer text-tight">ABOUT</span>
          </motion.h2>
          <div className="section-divider-thick w-48 mx-auto mb-8" />
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-subtitle font-serif text-muted-foreground max-w-2xl mx-auto text-balance italic"
          >
            Crafting innovative solutions with passion and precision
          </motion.p>
        </motion.div>

        {/* Hero Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <Card className="card-gradient-border bg-card/30 border-0 hover-lift overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
            <CardContent className="p-8 text-center relative z-10">
              <Rocket className="w-12 h-12 mx-auto mb-4 text-primary float-animation" />
              <div className="text-display font-display mb-2 number-counter text-tight">8+</div>
              <p className="text-small text-wide text-muted-foreground">Years Experience</p>
            </CardContent>
          </Card>

          <Card className="card-gradient-border bg-card/30 border-0 hover-lift overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
            <CardContent className="p-8 text-center relative z-10">
              <Target className="w-12 h-12 mx-auto mb-4 text-accent float-animation" style={{ animationDelay: '0.5s' }} />
              <div className="text-display font-display mb-2 number-counter text-tight">15+</div>
              <p className="text-small text-wide text-muted-foreground">Projects Delivered</p>
            </CardContent>
          </Card>

          <Card className="card-gradient-border bg-card/30 border-0 hover-lift overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
            <CardContent className="p-8 text-center relative z-10">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-secondary float-animation" style={{ animationDelay: '1s' }} />
              <div className="text-display font-display mb-2 number-counter text-tight">100%</div>
              <p className="text-small text-wide text-muted-foreground">Client Satisfaction</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content - Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          {/* Story - Takes 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="lg:col-span-3"
          >
            <Card className="card-glass card-accent-left hover-card h-full">
              <CardContent className="p-8 sm:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-primary/20">
                    <Code className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-light text-gradient-primary">Who I Am</h3>
                </div>
                <p className="text-body-large text-extra-light mb-6 text-foreground text-balance">
                  I'm <span className="font-serif font-medium text-primary">Prabhat</span> — a Senior Software Engineer with over{' '}
                  <span className="font-display font-medium number-counter">8 years</span> of experience building cloud-native, data-driven, and AI-enhanced systems.
                </p>
                <p className="text-body text-extra-light text-muted-foreground mb-6 text-balance">
                  Currently leading as <span className="text-primary font-medium">PTL for Lumos</span>, a next-generation game analytics platform, where I architect ETL pipelines, integrate LLM-based chat systems, and drive infrastructure evolution using AWS CDK.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Cloud-Native', 'AI/ML', 'Serverless', 'Leadership'].map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="px-4 py-2 bg-primary/10 text-primary text-small font-heading rounded-full border border-primary/20 hover-bg-primary hover-text-primary hover-scale cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Focus Areas - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="lg:col-span-2 space-y-6"
          >
            <Card className="card-glass hover-card h-full">
              <CardContent className="p-6">
                <h3 className="text-title font-heading mb-6 text-gradient-primary flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Focus Areas
                </h3>
                <div className="space-y-4">
                  {focusAreas.map((area, index) => {
                    const Icon = area.icon
                    return (
                      <motion.div
                        key={area.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="p-4 rounded-lg border border-border hover-bg-primary group cursor-pointer transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-subtitle font-heading text-foreground mb-1 group-hover:text-primary transition-colors">
                              {area.label}
                            </h4>
                            <p className="text-small text-muted-foreground font-serif italic">{area.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Skills Grid - Creative Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-title-large font-display text-gradient-primary">
              Technical Expertise
            </h3>
            <div className="hidden md:block section-divider flex-1 ml-8" />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon
              return (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                  transition={{ 
                    delay: 0.9 + index * 0.1, 
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 200
                  }}
                >
                  <Card className="card-glass hover-card cursor-pointer h-full group relative overflow-hidden">
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                      skill.color === 'primary' ? 'bg-primary/5' : 
                      skill.color === 'accent' ? 'bg-accent/5' : 
                      'bg-secondary/5'
                    }`} />
                    <CardContent className="p-6 text-center relative z-10">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className={`w-10 h-10 mx-auto mb-4 hover-icon ${
                          skill.color === 'primary' ? 'text-primary' : 
                          skill.color === 'accent' ? 'text-accent' : 
                          'text-secondary'
                        }`} />
                      </motion.div>
                      <h4 className="text-small font-heading mb-3 text-foreground group-hover:text-primary transition-colors">
                        {skill.label}
                      </h4>
                      <div className="relative">
                        <Progress value={skill.level} className="h-2 mb-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-tiny font-display text-muted-foreground">{skill.level}%</span>
                          <div className="w-2 h-2 rounded-full bg-primary pulse-glow" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
