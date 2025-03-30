"use client"

import React, { useEffect, useRef, useState } from 'react'
import { AlertTriangle, Droplets, Wind, Thermometer, Compass } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AirPurificationSystem from '../components/AirPurificationSystem'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { 
  updateSimulationState, 
  getSimulationState, 
  getSystemStatus
} from '@/lib/system-integration'
import { Label } from '@/components/ui/label'
import { EnhancedSlider } from '@/components/ui/enhanced-slider'

const GRID_SIZE = 8
const SPRINKLER_RADIUS = 50
const FIRE_SPREAD_THRESHOLD = 0.3
const SPRINKLER_EFFECTIVENESS = 0.8
const ANIMATION_DURATION = 2000 // ms

interface Sprinkler {
  x: number
  y: number
  isActive: boolean
  waterPressure: number // 0-1
}

interface FireSpot {
  x: number
  y: number
  intensity: number
  spreadRate: number
  direction: number
}

interface WeatherConditions {
  temperature: number // Celsius
  humidity: number // percentage
  windSpeed: number // mph
  windDirection: number // degrees
}

export default function SimulationPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const activeSprinklersRef = useRef<Set<string>>(new Set())
  const [sprinklers, setSprinklers] = useState<Sprinkler[]>([])
  const [fireSpots, setFireSpots] = useState<FireSpot[]>([])
  const [weather, setWeather] = useState<WeatherConditions>({
    temperature: 30,
    humidity: 20,
    windSpeed: 10,
    windDirection: 45
  })
  const [isSimulationRunning, setIsSimulationRunning] = useState(false)
  const [sprinklersActive, setSprinklersActive] = useState(false)
  const [sprinklerPressure, setSprinklerPressure] = useState(0.5)
  const [simulationInterval, setSimulationInterval] = useState<NodeJS.Timeout | null>(null)
  const [fanSpeed, setFanSpeed] = useState(50)
  const [pollutionLevel, setPollutionLevel] = useState(30)

  // Initialize sprinklers in a grid pattern
  useEffect(() => {
    const newSprinklers: Sprinkler[] = []
    const spacing = SPRINKLER_RADIUS * 1.5

    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        newSprinklers.push({
          x: spacing + (i * spacing * 2),
          y: spacing + (j * spacing * 2),
          isActive: false,
          waterPressure: 1
        })
      }
    }

    setSprinklers(newSprinklers)
  }, [])

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = 800
    canvas.height = 800

    // Draw initial grid
    drawGrid(ctx)
  }, [])

  // Draw grid
  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1

    for (let i = 0; i <= GRID_SIZE; i++) {
      const position = (canvasRef.current?.width || 0) * (i / GRID_SIZE)
      ctx.beginPath()
      ctx.moveTo(position, 0)
      ctx.lineTo(position, canvasRef.current?.height || 0)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, position)
      ctx.lineTo(canvasRef.current?.width || 0, position)
      ctx.stroke()
    }
  }

  // Calculate fire spread based on FireBench model
  const calculateFireSpread = (fire: FireSpot, weather: WeatherConditions) => {
    const baseSpreadRate = 0.5
    const windFactor = weather.windSpeed / 10
    const humidityFactor = (100 - weather.humidity) / 100
    const temperatureFactor = (weather.temperature - 20) / 30

    // Calculate spread rate based on environmental conditions
    const spreadRate = baseSpreadRate * (1 + windFactor) * humidityFactor * (1 + temperatureFactor)
    
    // Calculate spread direction influenced by wind
    const windInfluence = Math.min(weather.windSpeed / 20, 0.8)
    const randomDirection = Math.random() * Math.PI * 2
    const spreadDirection = (1 - windInfluence) * randomDirection + 
                          windInfluence * ((weather.windDirection * Math.PI) / 180)

    return {
      spreadRate,
      direction: spreadDirection
    }
  }

  // Calculate sprinkler effectiveness based on distance and pressure
  const calculateSprinklerEffectiveness = (sprinkler: Sprinkler, fire: FireSpot) => {
    const distance = Math.hypot(sprinkler.x - fire.x, sprinkler.y - fire.y)
    const distanceFactor = Math.max(0, 1 - (distance / SPRINKLER_RADIUS))
    return distanceFactor * sprinkler.waterPressure * SPRINKLER_EFFECTIVENESS
  }

  // Activate sprinklers near fire spots
  const activateNearbySprinklers = (fires: FireSpot[]) => {
    if (!sprinklersActive) return

    // Update the active sprinklers ref immediately
    sprinklers.forEach(sprinkler => {
      const closestFire = fires.reduce((closest, fire) => {
        const currentDistance = Math.hypot(sprinkler.x - fire.x, sprinkler.y - fire.y)
        const closestDistance = Math.hypot(sprinkler.x - closest.x, sprinkler.y - closest.y)
        return currentDistance < closestDistance ? fire : closest
      }, fires[0])

      const distance = Math.hypot(sprinkler.x - closestFire.x, sprinkler.y - closestFire.y)
      const activationRadius = SPRINKLER_RADIUS * (1.5 + (closestFire.intensity * 0.5))
      const shouldActivate = distance < activationRadius

      if (shouldActivate) {
        activeSprinklersRef.current.add(`${sprinkler.x},${sprinkler.y}`)
      }
    })

    // Update the state for persistence
    setSprinklers(prev => prev.map(sprinkler => {
      const closestFire = fires.reduce((closest, fire) => {
        const currentDistance = Math.hypot(sprinkler.x - fire.x, sprinkler.y - fire.y)
        const closestDistance = Math.hypot(sprinkler.x - closest.x, sprinkler.y - closest.y)
        return currentDistance < closestDistance ? fire : closest
      }, fires[0])

      const distance = Math.hypot(sprinkler.x - closestFire.x, sprinkler.y - closestFire.y)
      const activationRadius = SPRINKLER_RADIUS * (1.5 + (closestFire.intensity * 0.5))
      const shouldActivate = distance < activationRadius
      const pressure = shouldActivate ? 
        Math.max(0.4, 1 - (distance / activationRadius)) : 
        sprinkler.waterPressure

      return {
        ...sprinkler,
        isActive: sprinkler.isActive || shouldActivate,
        waterPressure: shouldActivate ? pressure : sprinkler.waterPressure
      }
    }))
  }

  // Handle canvas click with enhanced fire behavior
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const { spreadRate, direction } = calculateFireSpread({ 
      x, y, intensity: 0.8, spreadRate: 0, direction: 0 
    }, weather)

    // Immediately draw the fire spot
    const ctx = canvasRef.current.getContext('2d')
    if (ctx) {
      // Draw fire spot with gradient
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 30 * 0.8)
      gradient.addColorStop(0, `rgba(255, ${Math.floor(165 * 0.2)}, 0, 0.8)`)
      gradient.addColorStop(0.6, `rgba(255, 0, 0, 0.48)`)
      gradient.addColorStop(1, 'rgba(255, 0, 0, 0)')
      
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, 30 * 0.8, 0, Math.PI * 2)
      ctx.fill()

      // Draw spread indicator
      ctx.strokeStyle = `rgba(255, 165, 0, 0.4)`
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(
        x + Math.cos(direction) * (40 * spreadRate),
        y + Math.sin(direction) * (40 * spreadRate)
      )
      ctx.stroke()
    }

    // Add the fire spot to state
    setFireSpots(prev => [...prev, {
      x, y, 
      intensity: 0.8, 
      spreadRate, 
      direction 
    }])
    
    // Activate nearby sprinklers based on fire location and intensity
    if (sprinklersActive) {
      activateNearbySprinklers([{
        x, y, 
        intensity: 0.8, 
        spreadRate, 
        direction 
      }])
    }
  }

  // Handle pressure change
  const handlePressureChange = (value: number[]) => {
    const newPressure = value[0] / 100
    setSprinklerPressure(newPressure)
    setSprinklers(prev => prev.map(s => ({
      ...s,
      waterPressure: newPressure
    })))
  }

  // Handle weather change
  const handleWeatherChange = (key: keyof WeatherConditions, value: number) => {
    setWeather(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Handle sprinkler toggle
  const handleSprinklerToggle = () => {
    setSprinklersActive(prev => !prev)
    if (!sprinklersActive) {
      // Clear active sprinklers when deactivating
      activeSprinklersRef.current.clear()
    }
    setSprinklers(prev => prev.map(s => ({
      ...s,
      isActive: !sprinklersActive
    })))
  }

  // Start simulation
  const startSimulation = () => {
    setIsSimulationRunning(true)
    const interval = setInterval(updateSimulation, 100)
    setSimulationInterval(interval)
  }

  // Pause simulation
  const pauseSimulation = () => {
    setIsSimulationRunning(false)
    if (simulationInterval) {
      clearInterval(simulationInterval)
      setSimulationInterval(null)
    }
  }

  // Update simulation with enhanced fire behavior
  const updateSimulation = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawGrid(ctx)

    // Update and draw fire spots with enhanced visualization
    setFireSpots(prev => {
      if (prev.length === 0) {
        setIsSimulationRunning(false)
        if (simulationInterval) {
          clearInterval(simulationInterval)
          setSimulationInterval(null)
        }
        return prev
      }

      const updatedFires = prev.map(fire => {
        // Calculate total suppression from all active sprinklers
        const totalSuppression = sprinklersActive ? sprinklers.reduce((acc, s) => 
          acc + (activeSprinklersRef.current.has(`${s.x},${s.y}`) ? calculateSprinklerEffectiveness(s, fire) : 0), 0) : 0

        const { spreadRate, direction } = calculateFireSpread(fire, weather)

        // Draw fire spot with gradient and suppression effect
        const gradient = ctx.createRadialGradient(fire.x, fire.y, 0, fire.x, fire.y, 30 * fire.intensity)
        gradient.addColorStop(0, `rgba(255, ${Math.floor(165 * (1 - fire.intensity))}, 0, ${fire.intensity})`)
        gradient.addColorStop(0.6, `rgba(255, 0, 0, ${fire.intensity * 0.6})`)
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(fire.x, fire.y, 30 * fire.intensity, 0, Math.PI * 2)
        ctx.fill()

        // Draw suppression effect if sprinklers are active
        if (sprinklersActive && totalSuppression > 0) {
          const suppressionGradient = ctx.createRadialGradient(
            fire.x, fire.y, 0,
            fire.x, fire.y, 30 * fire.intensity * (1 + totalSuppression)
          )
          suppressionGradient.addColorStop(0, `rgba(0, 150, 255, ${0.3 * totalSuppression})`)
          suppressionGradient.addColorStop(1, 'rgba(0, 150, 255, 0)')
          
          ctx.fillStyle = suppressionGradient
          ctx.beginPath()
          ctx.arc(fire.x, fire.y, 30 * fire.intensity * (1 + totalSuppression), 0, Math.PI * 2)
          ctx.fill()
        }

        // Draw spread indicator
        if (fire.spreadRate > 0) {
          ctx.strokeStyle = `rgba(255, 165, 0, ${fire.intensity * 0.5})`
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(fire.x, fire.y)
          ctx.lineTo(
            fire.x + Math.cos(fire.direction) * (40 * fire.spreadRate),
            fire.y + Math.sin(fire.direction) * (40 * fire.spreadRate)
          )
          ctx.stroke()
        }

        return {
          ...fire,
          intensity: Math.max(0, fire.intensity - (0.05 * totalSuppression)),
          spreadRate: spreadRate * (1 - totalSuppression),
          direction
        }
      }).filter(fire => fire.intensity > 0)

      // Add new fire spots based on spread
      const newFires = updatedFires.flatMap(fire => {
        if (Math.random() < fire.spreadRate * 0.2) {
          const spreadDistance = 30 + Math.random() * 20
          const newX = fire.x + Math.cos(fire.direction) * spreadDistance
          const newY = fire.y + Math.sin(fire.direction) * spreadDistance
          
          // Validate new fire position is within canvas bounds
          if (newX >= 0 && newX <= canvas.width &&
              newY >= 0 && newY <= canvas.height) {
            const { spreadRate, direction } = calculateFireSpread({ 
              x: newX, y: newY, intensity: 0.6, spreadRate: 0, direction: 0 
            }, weather)

            return [{
              x: newX,
              y: newY,
              intensity: 0.6,
              spreadRate,
              direction
            }]
          }
        }
        return []
      })

      // Activate nearby sprinklers in response to fire spread
      if (sprinklersActive) {
        activateNearbySprinklers([...updatedFires, ...newFires])
      }

      return [...updatedFires, ...newFires]
    })

    // Draw all sprinklers with enhanced water effects
    sprinklers.forEach(sprinkler => {
      const isActive = activeSprinklersRef.current.has(`${sprinkler.x},${sprinkler.y}`)
      
      // Draw sprinkler base with activation state
      ctx.fillStyle = isActive ? 'rgba(0, 150, 255, 0.8)' : 'rgba(200, 200, 200, 0.5)'
      ctx.beginPath()
      ctx.arc(sprinkler.x, sprinkler.y, 5, 0, Math.PI * 2)
      ctx.fill()

      // Draw activation indicator for active sprinklers
      if (isActive) {
        ctx.strokeStyle = 'rgba(0, 150, 255, 0.6)'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(sprinkler.x, sprinkler.y, 8, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Draw water effects for active sprinklers when system is active
      if (isActive && sprinklersActive) {
        // Water coverage area with pressure-based opacity
        const gradient = ctx.createRadialGradient(
          sprinkler.x, sprinkler.y, 0,
          sprinkler.x, sprinkler.y, SPRINKLER_RADIUS
        )
        gradient.addColorStop(0, `rgba(0, 150, 255, ${0.4 * sprinkler.waterPressure})`)
        gradient.addColorStop(1, 'rgba(0, 150, 255, 0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(sprinkler.x, sprinkler.y, SPRINKLER_RADIUS, 0, Math.PI * 2)
        ctx.fill()

        // Water particles with wind effect and pressure variation
        const particleCount = Math.floor(20 * sprinkler.waterPressure)
        const angleStep = (Math.PI * 2) / particleCount
        const windRadians = (weather.windDirection * Math.PI) / 180
        const windEffect = weather.windSpeed / 20

        for (let i = 0; i < particleCount; i++) {
          const angle = i * angleStep
          const distance = Math.random() * SPRINKLER_RADIUS * sprinkler.waterPressure
          const windOffsetX = Math.cos(windRadians) * distance * windEffect
          const windOffsetY = Math.sin(windRadians) * distance * windEffect
          
          ctx.fillStyle = `rgba(0, 150, 255, ${0.9 * sprinkler.waterPressure})`
          ctx.beginPath()
          ctx.arc(
            sprinkler.x + Math.cos(angle) * distance + windOffsetX,
            sprinkler.y + Math.sin(angle) * distance + windOffsetY,
            2,
            0,
            Math.PI * 2
          )
          ctx.fill()
        }
      }
    })
  }

  // Reset simulation
  const resetSimulation = () => {
    // Clear all fire spots
    setFireSpots([])
    
    // Reset sprinklers to initial state
    setSprinklers(prev => prev.map(s => ({
      ...s,
      isActive: false,
      waterPressure: 1
    })))
    
    // Clear active sprinklers ref
    activeSprinklersRef.current.clear()
    
    // Stop simulation if running
    setIsSimulationRunning(false)
    if (simulationInterval) {
      clearInterval(simulationInterval)
      setSimulationInterval(null)
    }

    // Redraw the grid
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawGrid(ctx)
    }
  }

  // Cleanup
  useEffect(() => {
    return () => {
      if (simulationInterval) {
        clearInterval(simulationInterval)
      }
    }
  }, [simulationInterval])

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Tabs defaultValue="sprinkler" className="space-y-6">
        <TabsList className="h-12 rounded-xl bg-white/80 backdrop-blur-sm border border-white/20">
          <TabsTrigger 
            value="sprinkler" 
            className="rounded-lg data-[state=active]:bg-indigo-500/10 transition-all duration-200 hover:bg-indigo-500/5 hover:scale-105"
          >
            <Droplets className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:scale-110" />
            Sprinkler System
          </TabsTrigger>
          <TabsTrigger 
            value="fan" 
            className="rounded-lg data-[state=active]:bg-indigo-500/10 transition-all duration-200 hover:bg-indigo-500/5 hover:scale-105"
          >
            <Wind className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:scale-110" />
            Air Purification
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sprinkler" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="relative rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={600}
                  className="w-full h-[600px] cursor-crosshair transition-transform duration-200 hover:scale-[1.01]"
                  onClick={handleCanvasClick}
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    onClick={isSimulationRunning ? pauseSimulation : startSimulation}
                    className="rounded-lg bg-white/90 backdrop-blur-sm hover:bg-white/95 border border-indigo-100 transition-all duration-200 hover:scale-105 hover:shadow-md"
                  >
                    {isSimulationRunning ? "Pause" : "Start"} Simulation
                  </Button>
                  <Button
                    onClick={resetSimulation}
                    className="rounded-lg bg-white/90 backdrop-blur-sm hover:bg-white/95 border border-indigo-100 transition-all duration-200 hover:scale-105 hover:shadow-md"
                  >
                    Reset Simulation
                  </Button>
                  <Button
                    onClick={handleSprinklerToggle}
                    className={`rounded-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-md ${
                      sprinklersActive 
                        ? "bg-green-500/90 hover:bg-green-500/95 text-white border border-green-400" 
                        : "bg-white/90 hover:bg-white/95 border border-indigo-100"
                    }`}
                  >
                    <Droplets className={`w-4 h-4 mr-2 transition-transform duration-200 ${sprinklersActive ? "text-white" : "text-indigo-500"}`} />
                    {sprinklersActive ? "Sprinklers Active" : "Sprinklers Inactive"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="rounded-2xl bg-white/90 backdrop-blur-sm border border-indigo-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                <CardHeader className="rounded-t-2xl bg-gradient-to-r from-orange-500/10 to-orange-400/5 pb-4 border-b border-orange-50">
                  <CardTitle className="text-xl font-semibold text-orange-900 flex items-center">
                    <Droplets className="w-5 h-5 mr-2 text-orange-500 transition-transform duration-200 group-hover:scale-110" />
                    Simulation Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <EnhancedSlider
                      label="Water Pressure"
                      value={sprinklerPressure * 100}
                      onChange={(value) => setSprinklerPressure(value / 100)}
                      min={0}
                      max={100}
                      step={5}
                      icon={<Droplets className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />}
                      unit="%"
                      lowLabel="Low"
                      highLabel="High"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl bg-white/90 backdrop-blur-sm border border-indigo-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                <CardHeader className="rounded-t-2xl bg-gradient-to-r from-orange-500/10 to-orange-400/5 pb-4 border-b border-orange-50">
                  <CardTitle className="text-xl font-semibold text-orange-900 flex items-center">
                    <Thermometer className="w-5 h-5 mr-2 text-orange-500 transition-transform duration-200 group-hover:scale-110" />
                    Weather Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <EnhancedSlider
                      label="Temperature"
                      value={weather.temperature}
                      onChange={(value) => handleWeatherChange('temperature', value)}
                      min={0}
                      max={40}
                      step={0.5}
                      icon={<Thermometer className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />}
                      unit="°C"
                      lowLabel="Cold"
                      highLabel="Hot"
                    />
                    
                    <EnhancedSlider
                      label="Humidity"
                      value={weather.humidity}
                      onChange={(value) => handleWeatherChange('humidity', value)}
                      min={0}
                      max={100}
                      step={1}
                      icon={<Droplets className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />}
                      unit="%"
                      lowLabel="Dry"
                      highLabel="Humid"
                    />
                    
                    <EnhancedSlider
                      label="Wind Speed"
                      value={weather.windSpeed}
                      onChange={(value) => handleWeatherChange('windSpeed', value)}
                      min={0}
                      max={30}
                      step={0.5}
                      icon={<Wind className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />}
                      unit=" m/s"
                      lowLabel="Calm"
                      highLabel="Strong"
                    />
                    
                    <EnhancedSlider
                      label="Wind Direction"
                      value={weather.windDirection}
                      onChange={(value) => handleWeatherChange('windDirection', value)}
                      min={0}
                      max={360}
                      step={5}
                      icon={<Compass className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />}
                      unit="°"
                      lowLabel="N (0°)"
                      midLabel="E (90°)"
                      highLabel="N (360°)"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="fan" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="relative rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                <AirPurificationSystem />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
