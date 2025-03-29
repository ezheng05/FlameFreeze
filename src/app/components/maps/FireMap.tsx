"use client"

import React, { useEffect, useRef, useState } from 'react'
import { MapPin, AlertTriangle, Droplets, Truck } from "lucide-react"
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

interface Resource {
  id: string
  type: 'truck' | 'drone' | 'sprinkler'
  coordinates: [number, number]
  status: 'responding' | 'onsite' | 'patrolling'
  eta?: string
}

export default function FireMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])

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

  const [resources] = useState<Resource[]>([
    {
      id: 'truck-1',
      type: 'truck',
      coordinates: [-118.2437, 34.0522],
      status: 'responding',
      eta: '5 min'
    },
    {
      id: 'drone-1',
      type: 'drone',
      coordinates: [-118.3733, 34.1259],
      status: 'patrolling'
    },
    {
      id: 'drone-2',
      type: 'drone',
      coordinates: [-118.5010, 34.0901],
      status: 'patrolling'
    },
    {
      id: 'sprinkler-1',
      type: 'sprinkler',
      coordinates: [-118.4912, 34.0195],
      status: 'onsite'
    },
    {
      id: 'sprinkler-2',
      type: 'sprinkler',
      coordinates: [-118.5504, 34.0952],
      status: 'onsite'
    }
  ])

  useEffect(() => {
    if (!mapContainer.current) return

    // Initialize map with Tailwind classes
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-118.4, 34.05],
      zoom: 11,
      attributionControl: false
    })

    // Add navigation controls with Tailwind styling
    const navControl = new mapboxgl.NavigationControl()
    navControl._container.className = 'rounded-lg shadow-md overflow-hidden'
    map.current.addControl(navControl)

    // Clean up on unmount
    return () => {
      markersRef.current.forEach(marker => marker.remove())
      map.current?.remove()
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

      // Add resource markers with Tailwind classes
      resources.forEach(resource => {
        const el = document.createElement('div')
        el.className = `w-8 h-8 rounded-full relative -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-blue-500 flex items-center justify-center shadow-sm`
        
        const icon = document.createElement('span')
        icon.className = 'text-base'
        icon.textContent = resource.type === 'truck' ? '🚒' : 
                         resource.type === 'drone' ? '🚁' : '💧'
        el.appendChild(icon)
        
        const marker = new mapboxgl.Marker({
          element: el,
          anchor: 'center'
        })
          .setLngLat(resource.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(
                `<div class="p-3 rounded-lg shadow-md">
                  <h3 class="text-sm font-bold">${resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</h3>
                  <p class="text-xs">Status: ${resource.status}</p>
                  ${resource.eta ? `<p class="text-xs">ETA: ${resource.eta}</p>` : ''}
                </div>`
              )
          )
          .addTo(map.current!)
        
        markersRef.current.push(marker)
      })
    })
  }, [fires, riskZones, resources])

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Live Fire Monitoring</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-400 to-red-600 animate-pulse" />
            <span className="text-sm text-gray-600">Active Fire</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400/60 to-yellow-400/30" />
            <span className="text-sm text-gray-600">High Risk Area</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center">
              <span className="text-xs">🚒</span>
            </div>
            <span className="text-sm text-gray-600">Fire Truck</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center">
              <span className="text-xs">🚁</span>
            </div>
            <span className="text-sm text-gray-600">Drone Unit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center">
              <span className="text-xs">💧</span>
            </div>
            <span className="text-sm text-gray-600">Sprinkler Station</span>
          </div>
        </div>
      </div>
      <div 
        ref={mapContainer} 
        className="w-full h-[500px] rounded-lg overflow-hidden"
      />
    </div>
  )
} 