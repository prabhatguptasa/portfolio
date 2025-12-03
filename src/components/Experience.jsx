import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Briefcase, Calendar, MapPin, ChevronRight, Terminal, Cpu, Network } from 'lucide-react'

const experiences = [
  {
    title: 'Senior Software Engineer',
    company: 'Gameopedia',
    period: 'May 2024 - Present',
    location: 'Hyderabad, India',
    role: 'Tech Lead',
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
    period: 'Dec 2021 - May 2024',
    location: 'Hyderabad, India',
    role: 'Developer',
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
    period: 'Jan 2021 - Dec 2021',
    location: 'Hyderabad, India',
    role: 'QA Automation',
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
    period: 'Sep 2019 - Jan 2021',
    location: 'Hyderabad, India',
    role: 'QA',
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
  const [expandedIndex, setExpandedIndex] = useState(0)
  const [hoveredTech, setHoveredTech] = useState(null)

  return (
    <div ref={ref} className="min-h-screen py-20 md:py-32 px-4 md:px-6 relative bg-background overflow-hidden flex flex-col justify-center">
      {/* Tech Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-16 max-w-2xl mx-auto"
        >
          <div className="h-px bg-primary/50 w-12" />
          <h2 className="text-2xl font-mono text-primary tracking-wider font-bold flex items-center gap-2">
            <Network className="w-5 h-5" />
            // RUNTIME_LOGS
          </h2>
          <div className="h-px bg-primary/50 w-12" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Timeline / Selector */}
          <div className="lg:col-span-4 space-y-4 relative">
            {/* Connecting Line */}
            <div className="absolute left-8 top-8 bottom-8 w-px bg-border z-0 hidden lg:block" />

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="relative z-10"
              >
                <button
                  onClick={() => setExpandedIndex(index)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group relative overflow-hidden ${expandedIndex === index
                    ? 'bg-primary/10 border-primary shadow-[0_0_15px_rgba(var(--primary),0.2)]'
                    : 'bg-card/50 border-border hover:border-primary/50'
                    }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className={`font-mono text-sm mb-1 ${expandedIndex === index ? 'text-primary' : 'text-muted-foreground'}`}>
                        {exp.period}
                      </div>
                      <div className={`font-bold font-display text-xl ${expandedIndex === index ? 'text-foreground' : 'text-foreground/80'}`}>
                        {exp.company}
                      </div>
                      <div className="text-base text-muted-foreground">{exp.title}</div>
                    </div>
                    {expandedIndex === index && (
                      <motion.div
                        layoutId="active-arrow"
                        className="text-primary"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </motion.div>
                    )}
                  </div>

                  {/* Mini Tech Indicators */}
                  <div className="flex gap-1 mt-3 flex-wrap">
                    {exp.tech.slice(0, 3).map(t => (
                      <div
                        key={t}
                        className={`w-2 h-2 rounded-full ${hoveredTech === t ? 'bg-accent animate-pulse scale-150' : 'bg-primary/20'
                          } transition-all duration-300`}
                      />
                    ))}
                    {exp.tech.length > 3 && <div className="w-2 h-2 rounded-full bg-primary/20" />}
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Details Panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={expandedIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-primary/20 relative overflow-hidden group">
                  {/* Holographic Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Terminal className="w-64 h-64" />
                  </div>

                  <CardContent className="p-8 relative z-10">
                    <div className="flex flex-col gap-8">
                      {/* Header Info */}
                      <div>
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <h3 className="text-3xl md:text-4xl font-bold text-foreground font-display">
                            {experiences[expandedIndex].title}
                          </h3>
                          <Badge variant="outline" className="font-mono text-primary border-primary/30 bg-primary/5 px-3 py-1 text-sm">
                            {experiences[expandedIndex].role}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-6 text-base text-muted-foreground font-mono">
                          <span className="flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-primary" />
                            {experiences[expandedIndex].company}
                          </span>
                          <span className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-primary" />
                            {experiences[expandedIndex].location}
                          </span>
                        </div>
                      </div>

                      {/* Execution Log */}
                      <div className="space-y-4">
                        <div className="text-sm font-mono text-primary/70 uppercase tracking-widest font-bold flex items-center gap-2">
                          <Cpu className="w-4 h-4" />
                          EXECUTION_LOG
                        </div>
                        <ul className="space-y-4">
                          {experiences[expandedIndex].highlights.map((item, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + i * 0.1 }}
                              className="flex items-start gap-3 text-muted-foreground group/item text-base md:text-lg"
                            >
                              <span className="text-primary mt-1.5 text-xs group-hover/item:scale-150 transition-transform">►</span>
                              <span className="leading-relaxed">
                                {item.split(' ').map((word, wIndex) => {
                                  // Highlight key verbs
                                  const isKey = ['Led', 'Architected', 'Designed', 'Built', 'Managed'].includes(word);
                                  return isKey ? (
                                    <span key={wIndex} className="text-foreground font-medium">{word} </span>
                                  ) : (
                                    <span key={wIndex}>{word} </span>
                                  )
                                })}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack Grid */}
                      <div className="pt-6 border-t border-border/50">
                        <div className="text-sm font-mono text-primary/70 uppercase tracking-widest mb-4 font-bold">
                          TECH_STACK_MATRIX
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {experiences[expandedIndex].tech.map((tech) => (
                            <motion.span
                              key={tech}
                              onMouseEnter={() => setHoveredTech(tech)}
                              onMouseLeave={() => setHoveredTech(null)}
                              whileHover={{ scale: 1.05 }}
                              className={`
                                px-3 py-1.5 text-sm font-mono rounded-md border transition-all cursor-crosshair
                                ${hoveredTech === tech
                                  ? 'bg-accent text-accent-foreground border-accent shadow-[0_0_10px_rgba(var(--accent),0.3)]'
                                  : 'bg-secondary/20 text-secondary-foreground border-secondary/30 hover:border-primary/50'}
                              `}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
