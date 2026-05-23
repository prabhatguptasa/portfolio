import { Link, Globe } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="footer footer-center p-10 bg-base-200/20 text-base-content rounded-t-2xl backdrop-blur-md border-t border-primary/10">
            <nav className="grid grid-flow-col gap-4">
                <a
                    href="https://in.linkedin.com/in/prabhat--gupta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-hover hover:text-primary transition-colors font-mono opacity-70 hover:opacity-100"
                >
                    LINKEDIN
                </a>
                <a
                    href="https://prabhatgupta.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-hover hover:text-primary transition-colors font-mono opacity-70 hover:opacity-100"
                >
                    WEBSITE
                </a>
            </nav>
            <nav>
                <div className="grid grid-flow-col gap-6">
                    <a
                        href="https://in.linkedin.com/in/prabhat--gupta"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors hover:scale-110 transform duration-200"
                    >
                        <Link className="w-6 h-6" />
                    </a>
                    <a
                        href="https://prabhatgupta.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors hover:scale-110 transform duration-200"
                    >
                        <Globe className="w-6 h-6" />
                    </a>
                </div>
            </nav>
            <aside>
                <p className="font-mono text-xs opacity-50">
          {'// Copyright © '}{new Date().getFullYear()}{' - System by Prabhat Gupta'}
                </p>
            </aside>
        </footer>
    )
}
