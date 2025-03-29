"use client"

import React, { useEffect, useRef, useState } from 'react'
import { MapPin, AlertTriangle } from "lucide-react"
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Type-safe environment variable access
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

if (!MAPBOX_TOKEN) {
  console.error('Mapbox token is not set. Please add NEXT_PUBLIC_MAPBOX_TOKEN to your .env.local file')
}

// Initialize Mapbox
mapboxgl.accessToken = MAPBOX_TOKEN || ''

interface FireLocation {
  id: string
  coordinates: [number, number]
  intensity: number
  timestamp: string
}

interface RiskZone {
  id: string
  coordinates: [number, number]
  riskLevel: number
  name: string
}

export default function FireMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  // Show error state if token is missing
  if (!MAPBOX_TOKEN) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center bg-gray-50 rounded-lg">
        <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Mapbox Token Missing</h3>
        <p className="text-gray-600">
          Please add your Mapbox token to the .env.local file:
          <br />
          <code className="mt-2 block p-2 bg-gray-100 rounded">NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here</code>
        </p>
      </div>
    )
  }

  // Mock data for demonstration
  const [fires] = useState<FireLocation[]>([
    {
      id: 'fire-1',
      coordinates: [-118.2437, 34.0522], // Los Angeles
      intensity: 0.8,
      timestamp: new Date().toISOString()
    },
    {
      id: 'fire-2',
      coordinates: [-118.4912, 34.0195], // Santa Monica
      intensity: 0.6,
      timestamp: new Date().toISOString()
    }
  ])

  const [riskZones] = useState<RiskZone[]>([
    {
      id: 'risk-1',
      coordinates: [-118.5010, 34.0901], // Mandeville Canyon
      riskLevel: 0.85,
      name: 'Mandeville Canyon'
    },
    {
      id: 'risk-2',
      coordinates: [-118.3733, 34.1259], // Laurel Canyon
      riskLevel: 0.78,
      name: 'Laurel Canyon'
    },
    {
      id: 'risk-3',
      coordinates: [-118.5504, 34.0952], // Santa Monica Mountains
      riskLevel: 0.92,
      name: 'Santa Monica Mountains'
    }
  ])

  useEffect(() => {
    if (!mapContainer.current) return

    // Initialize map with responsive settings
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-118.2437, 34.0522], // Los Angeles coordinates
      zoom: 11,
      attributionControl: false,
      preserveDrawingBuffer: true,
      maxZoom: 20,
      minZoom: 8,
      maxBounds: [
        [-118.8, 33.7], // Southwest coordinates
        [-117.9, 34.4]  // Northeast coordinates
      ]
    })

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl({
      showCompass: true,
      showZoom: true,
      visualizePitch: true
    }), 'top-right')

    // Add scale control
    map.current.addControl(new mapboxgl.ScaleControl({
      maxWidth: 100,
      unit: 'metric'
    }), 'bottom-right')

    // Add fullscreen control
    map.current.addControl(new mapboxgl.FullscreenControl({
      container: mapContainer.current
    }), 'top-right')

    // Handle map load
    map.current.on('load', () => {
      setIsMapLoaded(true)
    })

    // Handle window resize
    const handleResize = () => {
      if (map.current) {
        map.current.resize()
      }
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (map.current) {
        map.current.remove()
      }
    }
  }, [])

  // Update markers when data changes
  useEffect(() => {
    if (!map.current) return

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    // Wait for map to load
    map.current.on('load', () => {
      // Add fire markers with Tailwind classes
      fires.forEach(fire => {
        const el = document.createElement('div')
        el.className = 'w-6 h-6 rounded-full relative -translate-x-1/2 -translate-y-1/2 blur-sm bg-gradient-to-r from-orange-400 to-red-600 animate-pulse'
        
        const marker = new mapboxgl.Marker({
          element: el,
          anchor: 'center'
        })
          .setLngLat(fire.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(
                `<div class="p-3 rounded-lg shadow-md">
                  <h3 class="text-sm font-bold">Active Fire</h3>
                  <p class="text-xs">Intensity: ${Math.round(fire.intensity * 100)}%</p>
                  <p class="text-xs">Detected: ${new Date(fire.timestamp).toLocaleTimeString()}</p>
                </div>`
              )
          )
          .addTo(map.current!)
        
        markersRef.current.push(marker)
      })

      // Add risk zone markers with Tailwind classes
      riskZones.forEach(zone => {
        const el = document.createElement('div')
        el.className = `w-10 h-10 rounded-full relative -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-400/60 to-yellow-400/30 opacity-${Math.round(zone.riskLevel * 100)}`
        
        const marker = new mapboxgl.Marker({
          element: el,
          anchor: 'center'
        })
          .setLngLat(zone.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(
                `<div class="p-3 rounded-lg shadow-md">
                  <h3 class="text-sm font-bold">${zone.name}</h3>
                  <p class="text-xs">Risk Level: ${Math.round(zone.riskLevel * 100)}%</p>
                </div>`
              )
          )
          .addTo(map.current!)
        
        markersRef.current.push(marker)
      })
    })
  }, [fires, riskZones])

  return (
    <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px] rounded-lg overflow-hidden">
      <div 
        ref={mapContainer} 
        className="absolute inset-0 w-full h-full"
      />
      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-700"></div>
        </div>
      )}
      {/* Map controls overlay */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
        <button 
          className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
          onClick={() => map.current?.flyTo({
            center: [-118.2437, 34.0522],
            zoom: 11,
            duration: 2000
          })}
        >
          <MapPin className="w-5 h-5 text-gray-700" />
        </button>
      </div>
      {/* Map legend */}
      <div className="absolute bottom-4 left-4 z-10 bg-white rounded-lg shadow-md p-3 text-sm">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-400 to-red-600 animate-pulse" />
            <span>Active Fire</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400/60 to-yellow-400/30" />
            <span>High Risk Area</span>
          </div>
        </div>
      </div>
    </div>
  )
} 