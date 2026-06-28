import { useState, useEffect } from 'react'

export default function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="text-xs font-mono tracking-widest opacity-70">
      {time.toLocaleTimeString([], { hour12: false })}
    </div>
  )
}
