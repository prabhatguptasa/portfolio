import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

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
  Cpu,
  Layers
} from 'lucide-react'

const skills = [
  { icon: Cloud, label: 'AWS Cloud', level: 95, category: 'Infrastructure' },
  { icon: Code, label: 'Python', level: 90, category: 'Language' },
  { icon: Database, label: 'Data Pipelines', level: 88, category: 'Data' },
  { icon: Brain, label: 'AI/LLM Integration', level: 85, category: 'AI' },
  { icon: Server, label: 'Serverless', level: 90, category: 'Infrastructure' },
  { icon: GitBranch, label: 'GraphQL', level: 85, category: 'API' },
  { icon: Zap, label: 'AWS CDK', level: 92, category: 'Infrastructure' },
  { icon: Shield, label: 'IaC', level: 88, category: 'DevOps' },
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
    <div ref={ref} className="min-h-screen py-20 md:py-32 px-4 md:px-6 relative bg-background overflow-hidden flex flex-col justify-center">
      {/* Tech Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Connector Line */}
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/40 to-primary/0 -translate-x-1/2 hidden md:block"
        />

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-16 relative max-w-2xl mx-auto"
        >
          <div className="h-px bg-primary/50 w-12" />
          <h2 className="text-2xl font-mono text-primary tracking-wider font-bold flex items-center gap-2">
            <Layers className="w-5 h-5" />
            {'// SYSTEM_ARCHITECTURE'}
          </h2>
          <div className="h-px bg-primary/50 w-12" />
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
        >
          {[
            { icon: Rocket, value: '08+', label: 'YEARS_EXP' },
            { icon: Target, value: '15+', label: 'PROJECTS_DONE' },
            { icon: TrendingUp, value: '100%', label: 'SATISFACTION' }
          ].map((stat, index) => (
            <div key={index} className="relative p-6 rounded-xl border border-primary/20 bg-primary/5 overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <stat.icon className="w-24 h-24" />
              </div>
              <div className="relative z-10">
                <div className="text-4xl font-mono font-bold text-foreground mb-1 font-display">{stat.value}</div>
                <div className="text-xs font-mono text-primary tracking-widest uppercase">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-10">
          {/* Bio - Terminal Style */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="h-full rounded-xl border border-primary/20 bg-black/40 backdrop-blur-sm overflow-hidden flex flex-col">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border-b border-primary/20">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <div className="ml-2 text-xs font-mono text-primary/70">user@portfolio:~/bio</div>
              </div>

              <div className="p-6 font-mono text-base md:text-lg leading-relaxed text-muted-foreground flex-1">
                <p className="mb-4">
                  <span className="text-green-500">➜</span> <span className="text-blue-400">whoami</span>
                </p>
                <p className="mb-6 pl-4 border-l-2 border-primary/20">
                  I&apos;m <span className="text-foreground font-bold">Prabhat</span> — a Senior Software Engineer with over 8 years of experience building cloud-native, data-driven, and AI-enhanced systems.
                </p>

                <p className="mb-4">
                  <span className="text-green-500">➜</span> <span className="text-blue-400">cat current_role.txt</span>
                </p>
                <p className="mb-6 pl-4 border-l-2 border-primary/20">
                  Currently leading as <span className="text-foreground font-bold">Tech Lead for Lumos</span>, a next-generation game analytics platform. I specialize in architecting ETL pipelines, integrating LLM-based chat systems, and driving infrastructure evolution using AWS CDK.
                </p>

                <div className="flex flex-wrap gap-2 mt-8">
                  {['Cloud-Native', 'AI/ML', 'Serverless', 'Leadership'].map((tag) => (
                    <span key={tag} className="px-3 py-1.5 bg-primary/10 text-primary text-sm border border-primary/20 rounded hover:bg-primary/20 transition-colors cursor-default">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Focus Areas */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            {focusAreas.map((area, index) => (
              <div key={index} className="p-5 border border-border bg-card/30 rounded-lg hover:bg-primary/5 transition-colors group cursor-default hover:border-primary/30 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start gap-4 relative z-10">
                  <div className="p-2 bg-primary/10 rounded-md group-hover:text-primary transition-colors">
                    <area.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-mono text-foreground text-base mb-1 font-bold">{area.label}</h4>
                    <p className="text-sm text-muted-foreground">{area.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-xl font-mono text-foreground font-bold flex items-center gap-2">
              <Cpu className="w-5 h-5 text-primary" />
              /SKILLS_MATRIX
            </h3>
            <div className="h-px bg-border flex-1" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02, y: -5 }}
                className="p-5 border border-border bg-card/50 rounded-lg hover:border-primary/50 transition-all group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex justify-between items-start mb-3 relative z-10">
                  <skill.icon className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <div className="font-mono text-base text-foreground mb-1 relative z-10 font-bold">{skill.label}</div>
                <div className="text-xs text-muted-foreground mb-3 relative z-10">{skill.category}</div>

                <div className="h-1 w-full bg-secondary/30 rounded-full overflow-hidden relative z-10">
                  <motion.div
                    className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
