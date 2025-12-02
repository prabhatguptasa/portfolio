import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Briefcase, Calendar, MapPin, ChevronDown } from 'lucide-react'

const experiences = [
  {
    title: 'Senior Software Engineer',
    company: 'Gameopedia',
    period: 'May 2024 - Present',
    location: 'Hyderabad, Telangana, India',
    role: 'Tech Lead for Lumos',
    highlights: [
      'Led cross-functional team of five (2 QA, 2 Data Scientists, 1 Backend Engineer)',
      'Architected ETL pipelines and integrated LLM-based chat systems',
      'Drove infrastructure evolution using AWS CDK for robust, automated deployment',
      'Mentored cross-functional team members in software design and deployment',
    ],
    tech: ['AWS CDK', 'Lambda', 'Fargate', 'Python', 'Docker', 'GraphQL', 'ETL', 'LLM APIs'],
  },
  {
    title: 'Software Engineer',
    company: 'Gameopedia',
    period: 'December 2021 - May 2024',
    location: 'Hyderabad, Telangana, India',
    highlights: [
      'Designed and launched Gameopedia\'s first serverless system on AWS Lambda and Fargate',
      'Implemented Infrastructure as Code (IaC) to enhance deployment scalability',
      'Led multiple efficiency initiatives, refactoring legacy codebases',
    ],
    tech: ['AWS Lambda', 'Fargate', 'Python', 'IaC', 'Serverless'],
  },
  {
    title: 'Quality Assurance Engineer',
    company: 'Gameopedia',
    period: 'January 2021 - December 2021',
    location: 'Hyderabad, Telangana, India',
    highlights: [
      'Built automated testing frameworks in Python',
      'Enhanced QA processes by integrating automation',
      'Improved reporting efficiency',
    ],
    tech: ['Python', 'Automation', 'Testing'],
  },
  {
    title: 'Jr. Quality Analyst',
    company: 'Gameopedia',
    period: 'September 2019 - January 2021',
    location: 'Hyderabad Area, India',
    highlights: [
      'Conducted comprehensive manual and automated testing using Python',
      'Managed and maintained web scraping projects',
      'Collaborated with cross-functional teams to identify and resolve defects',
    ],
    tech: ['Python', 'Web Scraping', 'Testing'],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [expandedCard, setExpandedCard] = useState(null)

  return (
    <div ref={ref} className="min-h-screen py-24 sm:py-32 px-6 sm:px-8 relative bg-background bg-pattern-dots">
      <div className="container mx-auto max-w-4xl">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-display font-display mb-4 text-gradient-primary text-tight">
            EXPERIENCE
          </h2>
          <div className="section-divider w-32" />
          <p className="text-subtitle font-serif text-muted-foreground mt-6 italic text-balance">
            8+ years of building scalable cloud-native systems
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-6 timeline-line pl-8">
          {experiences.map((exp, index) => {
            const isExpanded = expandedCard === index
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute -left-11 top-6 w-4 h-4 rounded-full bg-primary border-4 border-background pulse-glow" />
                
                <Card
                  className="card-glass card-accent-left hover-card cursor-pointer hover-rotate-3d"
                  onClick={() => setExpandedCard(isExpanded ? null : index)}
                >
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-title font-heading text-foreground">
                            {exp.title}
                          </h3>
                          {exp.role && (
                            <Badge variant="default" className="bg-primary text-primary-foreground border-0 font-heading text-small">
                              {exp.role}
                            </Badge>
                          )}
                        </div>
                        <p className="text-subtitle font-serif text-muted-foreground mb-3">{exp.company}</p>
                        <div className="flex flex-wrap items-center gap-4 text-small text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-muted-foreground"
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden pt-6 mt-6 border-t border-border"
                        >
                          <ul className="space-y-3 mb-6">
                            {exp.highlights.map((highlight, hIndex) => (
                              <li key={hIndex} className="flex items-start gap-3 text-body text-foreground/70">
                                <span className="text-primary mt-1 font-serif">▹</span>
                                <span className="text-extra-light text-balance">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-2">
                            {exp.tech.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-muted text-tiny font-heading text-muted-foreground rounded-full border border-border"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
