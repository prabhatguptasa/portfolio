import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Chip, 
  Accordion, 
  AccordionItem,
  Badge,
  Divider,
  Tooltip,
  Avatar,
  Card,
  CardBody,
} from '@heroui/react'
import { Briefcase, Calendar, MapPin, Building2 } from 'lucide-react'

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
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className="space-y-4 sm:space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-card/30 border border-border" radius="xl">
          <CardBody className="p-4 sm:p-5">
            <div className="flex items-center gap-3 sm:gap-4">
              <Avatar
                icon={<Briefcase className="w-6 h-6 sm:w-7 sm:h-7" />}
                size="lg"
                color="secondary"
                isBordered
                className="flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-lg sm:text-xl font-heading text-foreground mb-1">Professional Journey</h3>
                <p className="text-sm sm:text-base text-muted-foreground">8+ years of building scalable cloud-native systems</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      <Accordion
        variant="bordered"
        selectionMode="multiple"
        defaultExpandedKeys={["0"]}
        className="gap-4 sm:gap-5"
        itemClasses={{
          base: "bg-card/30 border border-border rounded-xl overflow-hidden mb-4 sm:mb-5 last:mb-0",
          title: "font-heading text-base sm:text-lg",
          trigger: "py-4 sm:py-5 px-3 sm:px-5",
          content: "pt-3 pb-4 sm:pb-5 px-3 sm:px-5",
          indicator: "text-secondary",
        }}
      >
        {experiences.map((exp, index) => (
          <AccordionItem
            key={index}
            aria-label={exp.title}
            indicator={({ isOpen }) => (
              <Avatar
                icon={<Building2 className="w-5 h-5 sm:w-6 sm:h-6" />}
                size="md"
                color={isOpen ? "secondary" : "default"}
                className="transition-colors flex-shrink-0"
                isBordered
              />
            )}
            title={
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 min-w-0 w-full">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <span className="font-heading text-base sm:text-lg min-w-0 truncate">{exp.title}</span>
                  {exp.role && (
                    <Badge color="secondary" size="sm" variant="flat" className="flex-shrink-0">
                      {exp.role}
                    </Badge>
                  )}
                </div>
              </div>
            }
            subtitle={
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground mt-2">
                <Tooltip content={exp.period} color="secondary" showArrow>
                  <div className="flex items-center gap-1.5 sm:gap-2 cursor-help">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate max-w-[200px] sm:max-w-none">{exp.period}</span>
                  </div>
                </Tooltip>
                <Tooltip content={exp.location} color="secondary" showArrow>
                  <div className="flex items-center gap-1.5 sm:gap-2 cursor-help">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate max-w-[150px] sm:max-w-none">{exp.company}</span>
                  </div>
                </Tooltip>
              </div>
            }
          >
            <div className="space-y-4 pt-2">
              <ul className="space-y-3">
                {exp.highlights.map((highlight, hIndex) => (
                  <li key={hIndex} className="flex items-start gap-3 text-sm sm:text-base text-foreground/90">
                    <Avatar
                      icon={<span className="text-secondary font-serif text-lg">▹</span>}
                      size="sm"
                      className="mt-0.5 flex-shrink-0"
                    />
                    <span className="text-extra-light text-balance leading-relaxed flex-1">{highlight}</span>
                  </li>
                ))}
              </ul>
              <Divider className="my-3" />
              <div>
                <p className="text-sm font-heading text-muted-foreground mb-3">Technologies Used:</p>
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((tech) => (
                    <Tooltip
                      key={tech}
                      content={`Experience with ${tech}`}
                      color="secondary"
                      showArrow
                    >
                      <Chip
                        size="sm"
                        variant="flat"
                        color="secondary"
                        className="cursor-help font-heading"
                      >
                        {tech}
                      </Chip>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
