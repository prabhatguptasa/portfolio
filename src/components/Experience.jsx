import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Briefcase, MapPin, ChevronRight, Terminal, Cpu, Network } from 'lucide-react'

const experiences = [
  {
    title: 'Senior Software Engineer',
    company: 'Gameopedia',
    period: 'May 2024 - Present',
    location: 'Hyderabad, India',
    role: 'Tech Lead',
    highlights: [
      'Lead architecture and engineering execution for Lumos, an AI-powered game analytics platform for product, market, and feature intelligence use cases.',
      'Re-architected Lumos backend and CDN-backed data delivery using Python, FastAPI, AWS CDK, S3, CloudFront, Lambda/Fargate, and Boto3.',
      'Built Steam analytics ETL pipelines for DAU/MAU, wishlist trends, feature metrics, personas, temporal backfills, tag taxonomy mapping, and copies-sold/revenue prediction.',
      'Integrated LLM-based search/chat with Azure API support, enabling natural-language querying of game intelligence and analytics.',
      'Hardened subscription, payments, authentication, and access-control workflows across Stripe, Cognito, Mixpanel, usage limits, feature overrides, team invites, and DB-backed subscription lifecycle.',
      'Modernized AWS infrastructure and release operations using serverless architecture, deployment validation, global latency optimization, CloudFront CDN patterns, and production runbooks.',
      'Mentored engineers and led cross-functional delivery across architecture, API documentation, release notes, user guides, AWS inventories, Confluence documentation, and roadmaps.'
    ],
    tech: ['Python', 'FastAPI', 'AWS CDK', 'Lambda', 'Fargate', 'S3', 'CloudFront', 'LLM', 'Stripe'],
  },
  {
    title: 'Software Engineer',
    company: 'Gameopedia',
    period: 'Dec 2021 - May 2024',
    location: 'Hyderabad, India',
    role: 'Developer',
    highlights: [
      'Architected and launched the first serverless system using AWS Lambda and Fargate, reducing operational overhead and improving scalability.',
      'Implemented Infrastructure as Code with AWS CDK to improve deployment reliability, repeatability, and automation across cloud environments.',
      'Refactored legacy Python and FastAPI codebases to improve maintainability, system efficiency, delivery speed, and long-term platform reliability.',
      'Integrated third-party services and complex authentication flows to expand platform capabilities and support production use cases.'
    ],
    tech: ['AWS Lambda', 'Fargate', 'AWS CDK', 'Python', 'FastAPI', 'Serverless'],
  },
  {
    title: 'Quality Assurance Engineer',
    company: 'Gameopedia',
    period: 'Jan 2021 - Dec 2021',
    location: 'Hyderabad, India',
    role: 'QA Automation',
    highlights: [
      'Engineered automated testing frameworks using Python and Selenium WebDriver API, reducing manual testing cycles and improving regression coverage.',
      'Integrated QA automation into deployment pipelines and improved reporting workflows for faster defect detection and release validation.'
    ],
    tech: ['Python', 'Selenium', 'WebDriver API', 'Automation', 'CI/CD'],
  },
  {
    title: 'Jr. Quality Analyst / Data Collection Specialist',
    company: 'Gameopedia',
    period: 'Nov 2017 - Jan 2021',
    location: 'Hyderabad, India',
    role: 'QA & Data',
    highlights: [
      'Managed and maintained Python-based web scraping projects, optimizing large-scale data extraction workflows for gaming content and analytics.',
      'Conducted manual and automated testing, source-document evaluation, and data-quality reviews to improve accuracy and operational efficiency.',
      'Collaborated with cross-functional teams to streamline data collection methods, improving efficiency by 20%; led a two-member pod to coordinate project delivery.'
    ],
    tech: ['Python', 'Web Scraping', 'Data Quality', 'Testing'],
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
            {'// RUNTIME_LOGS'}
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
                          <div className="badge badge-primary badge-outline font-mono gap-2 p-3">
                            {experiences[expandedIndex].role}
                          </div>
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
                                badge badge-lg rounded-md font-mono transition-all cursor-crosshair
                                ${hoveredTech === tech
                                  ? 'badge-accent'
                                  : 'bg-primary/10 text-primary border-primary/30'}
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
