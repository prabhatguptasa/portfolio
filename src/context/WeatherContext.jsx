import { createContext, useContext, useEffect, useRef, useState } from 'react'

const WeatherContext = createContext(null)

// Weather color palettes for different conditions
const weatherThemes = {
    sunny: {
        name: 'sunny',
        gradient: 'from-amber-900/20 via-orange-900/10 to-yellow-900/5',
        particleColor: 'rgba(255, 215, 100, 0.4)',
        glowColor: 'rgba(255, 180, 50, 0.3)',
        accentHue: 35,
    },
    'clear-night': {
        name: 'clear-night',
        gradient: 'from-slate-950/40 via-indigo-950/30 to-slate-900/20',
        particleColor: 'rgba(255, 255, 255, 0.6)', // Stars
        glowColor: 'rgba(100, 120, 255, 0.15)', // Moon glow
        accentHue: 240,
    },
    rain: {
        name: 'rain',
        gradient: 'from-slate-900/30 via-blue-900/20 to-slate-800/10',
        particleColor: 'rgba(150, 180, 220, 0.5)',
        glowColor: 'rgba(100, 150, 200, 0.2)',
        accentHue: 210,
    },
    cloudy: {
        name: 'cloudy',
        gradient: 'from-slate-800/30 via-purple-900/10 to-gray-800/20',
        particleColor: 'rgba(180, 180, 200, 0.3)',
        glowColor: 'rgba(150, 150, 180, 0.15)',
        accentHue: 270,
    },
    'cloudy-night': {
        name: 'cloudy-night',
        gradient: 'from-slate-950/40 via-gray-900/30 to-purple-950/20',
        particleColor: 'rgba(150, 160, 180, 0.2)',
        glowColor: 'rgba(100, 100, 120, 0.1)',
        accentHue: 260,
    },
    snow: {
        name: 'snow',
        gradient: 'from-blue-900/20 via-slate-800/15 to-cyan-900/10',
        particleColor: 'rgba(220, 235, 255, 0.6)',
        glowColor: 'rgba(200, 220, 255, 0.25)',
        accentHue: 200,
    },
    thunder: {
        name: 'thunder',
        gradient: 'from-purple-950/40 via-slate-900/30 to-blue-950/20',
        particleColor: 'rgba(130, 150, 200, 0.5)',
        glowColor: 'rgba(100, 100, 180, 0.3)',
        accentHue: 250,
    },
    clear: {
        name: 'clear',
        gradient: 'from-indigo-900/15 via-purple-900/10 to-slate-900/5',
        particleColor: 'rgba(200, 200, 255, 0.3)',
        glowColor: 'rgba(180, 180, 220, 0.2)',
        accentHue: 260,
    },
}

export function WeatherProvider({ children }) {
    const [weatherCondition, setWeatherCondition] = useState('clear')
    const [loading, setLoading] = useState(true)
    const [windSpeed, setWindSpeed] = useState(0)
    const [permissionStatus, setPermissionStatus] = useState('prompt') // 'prompt', 'granted', 'denied'
    const hasFetched = useRef(false)

    useEffect(() => {
        if (hasFetched.current) return
        hasFetched.current = true

        const fetchWeather = async (lat, lon) => {
            try {
                const weatherRes = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
                )
                const weatherData = await weatherRes.json()
                const code = weatherData.current_weather.weathercode
                const isDay = weatherData.current_weather.is_day
                const wind = weatherData.current_weather.windspeed

                console.log('Weather Data:', { code, isDay, wind })
                setWindSpeed(wind)

                // Map weather code to condition
                let condition = 'clear'

                // Rain
                if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) condition = 'rain'
                // Snow
                else if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) condition = 'snow'
                // Thunderstorm
                else if (code >= 95 && code <= 99) condition = 'thunder'
                // Cloudy / Fog
                else if (code >= 1 && code <= 3 || code === 45 || code === 48) {
                    condition = isDay === 0 ? 'cloudy-night' : 'cloudy'
                }
                // Clear / Sunny
                else if (code === 0) {
                    condition = isDay === 0 ? 'clear-night' : 'sunny'
                }

                setWeatherCondition(condition)
            } catch (error) {
                console.error('Weather fetch failed:', error)
                setWeatherCondition('clear')
            } finally {
                setLoading(false)
            }
        }

        const getLocation = () => {
            if (navigator.geolocation) {
                // Set state to prompt initially
                setPermissionStatus('prompt')

                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setPermissionStatus('granted')
                        fetchWeather(position.coords.latitude, position.coords.longitude)
                    },
                    (error) => {
                        console.log('Geolocation denied, trying IP fallback:', error)
                        setPermissionStatus('denied')
                        fetchLocationIP()
                    }
                )
            } else {
                fetchLocationIP()
            }
        }

        const fetchLocationIP = async () => {
            try {
                const locationRes = await fetch('https://ipapi.co/json/')
                const locationData = await locationRes.json()
                const { latitude, longitude } = locationData

                if (!latitude || !longitude) throw new Error('IP Location not found')

                fetchWeather(latitude, longitude)
            } catch (error) {
                console.error('IP Location fetch failed:', error)
                setWeatherCondition('clear')
                setLoading(false)
            }
        }

        // Delay starting location fetch slightly to allow UI to mount if needed, 
        // or just call it immediately but UI handles the 'prompt' state.
        // Let's call it immediately but the UI will show the message while the browser prompt is active.
        getLocation()
    }, [])

    const theme = weatherThemes[weatherCondition] || weatherThemes.clear

    const value = {
        weatherCondition,
        loading,
        theme,
        windSpeed,
        permissionStatus,
        setWeatherCondition,
    }

    return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
}

export function useWeather() {
    const context = useContext(WeatherContext)
    if (!context) {
        throw new Error('useWeather must be used within a WeatherProvider')
    }
    return context
}

export { weatherThemes }
