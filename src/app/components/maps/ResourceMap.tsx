"use client";

import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, AlertTriangle, Droplets, Truck, Building2, Droplet } from "lucide-react";

// Types for resource data
type FirefightingResource = {
  id: string;
  type: string;
  name: string;
  status: 'available' | 'deployed' | 'maintenance';
  location: {
    lat: number;
    lng: number;
  };
  capacity: number;
  personnel: number;
  lastUpdated: string;
};

type FireStation = {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  resources: string[];
  coverage: number;
};

type WaterSource = {
  id: string;
  type: 'reservoir' | 'tank' | 'hydrant' | 'natural';
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  capacity: number;
  currentLevel: number;
};

type SprinklerSystem = {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  coverage: number;
  status: 'active' | 'standby' | 'maintenance';
  waterSource: string;
};

type ResourceData = {
  firefightingResources: FirefightingResource[];
  fireStations: FireStation[];
  waterSources: WaterSource[];
  sprinklerSystems: SprinklerSystem[];
  lastUpdated: string;
};

export default function ResourceMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [resourceData, setResourceData] = useState<ResourceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedResource, setSelectedResource] = useState<FirefightingResource | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  // Mock data for demonstration
  const mockResourceData: ResourceData = {
    firefightingResources: [
      {
        id: 'truck-1',
        type: 'truck',
        name: 'Fire Truck Alpha',
        status: 'available',
        location: { lat: 34.0522, lng: -118.2437 },
        capacity: 1000,
        personnel: 4,
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'drone-1',
        type: 'drone',
        name: 'Drone Bravo',
        status: 'deployed',
        location: { lat: 34.0195, lng: -118.4912 },
        capacity: 0,
        personnel: 0,
        lastUpdated: new Date().toISOString()
      }
    ],
    fireStations: [
      {
        id: 'station-1',
        name: 'Central Fire Station',
        location: { lat: 34.0522, lng: -118.2437 },
        resources: ['truck-1', 'truck-2'],
        coverage: 85
      }
    ],
    waterSources: [
      {
        id: 'water-1',
        type: 'reservoir',
        name: 'Main Reservoir',
        location: { lat: 34.0901, lng: -118.5010 },
        capacity: 1000000,
        currentLevel: 85
      }
    ],
    sprinklerSystems: [
      {
        id: 'sprinkler-1',
        name: 'Downtown System',
        location: { lat: 34.0522, lng: -118.2437 },
        coverage: 75,
        status: 'active',
        waterSource: 'water-1'
      }
    ],
    lastUpdated: new Date().toISOString()
  };

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
      setError('Mapbox token is missing. Please add NEXT_PUBLIC_MAPBOX_TOKEN to your .env.local file');
      setLoading(false);
      return;
    }

    // Use mock data for now
    setResourceData(mockResourceData);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !resourceData) return;

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
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl({
      showCompass: true,
      showZoom: true,
      visualizePitch: true
    }), 'top-right');

    // Add scale control
    map.current.addControl(new mapboxgl.ScaleControl({
      maxWidth: 100,
      unit: 'metric'
    }), 'bottom-right');

    // Add fullscreen control
    map.current.addControl(new mapboxgl.FullscreenControl({
      container: mapContainer.current
    }), 'top-right');

    // Handle map load
    map.current.on('load', () => {
      setIsMapLoaded(true);
    });

    // Handle window resize
    const handleResize = () => {
      if (map.current) {
        map.current.resize();
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      markersRef.current.forEach(marker => marker.remove());
      if (map.current) {
        map.current.remove();
      }
    };
  }, [resourceData]);

  // Update markers when resource data changes
  useEffect(() => {
    if (!map.current || !resourceData) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add firefighting resource markers
    resourceData.firefightingResources.forEach(resource => {
      const el = document.createElement('div');
      el.className = `w-8 h-8 rounded-full relative -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-blue-500 flex items-center justify-center shadow-sm`;
      
      const icon = document.createElement('span');
      icon.className = 'text-base';
      icon.textContent = resource.type === 'truck' ? '🚒' : '🚁';
      el.appendChild(icon);
      
      const marker = new mapboxgl.Marker({
        element: el,
        anchor: 'center'
      })
        .setLngLat([resource.location.lng, resource.location.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(
              `<div class="p-3 rounded-lg shadow-md">
                <h3 class="text-sm font-bold">${resource.name}</h3>
                <p class="text-xs">Status: ${resource.status}</p>
                <p class="text-xs">Type: ${resource.type}</p>
              </div>`
            )
        )
        .addTo(map.current!);
      
      markersRef.current.push(marker);
    });

    // Add fire station markers
    resourceData.fireStations.forEach(station => {
      const el = document.createElement('div');
      el.className = 'w-8 h-8 rounded-full relative -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-red-500 flex items-center justify-center shadow-sm';
      
      const icon = document.createElement('span');
      icon.className = 'text-base';
      icon.textContent = '🏢';
      el.appendChild(icon);
      
      const marker = new mapboxgl.Marker({
        element: el,
        anchor: 'center'
      })
        .setLngLat([station.location.lng, station.location.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(
              `<div class="p-3 rounded-lg shadow-md">
                <h3 class="text-sm font-bold">${station.name}</h3>
                <p class="text-xs">Coverage: ${station.coverage}%</p>
              </div>`
            )
        )
        .addTo(map.current!);
      
      markersRef.current.push(marker);
    });

    // Add water source markers
    resourceData.waterSources.forEach(source => {
      const el = document.createElement('div');
      el.className = 'w-8 h-8 rounded-full relative -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-green-500 flex items-center justify-center shadow-sm';
      
      const icon = document.createElement('span');
      icon.className = 'text-base';
      icon.textContent = '💧';
      el.appendChild(icon);
      
      const marker = new mapboxgl.Marker({
        element: el,
        anchor: 'center'
      })
        .setLngLat([source.location.lng, source.location.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(
              `<div class="p-3 rounded-lg shadow-md">
                <h3 class="text-sm font-bold">${source.name}</h3>
                <p class="text-xs">Type: ${source.type}</p>
                <p class="text-xs">Level: ${source.currentLevel}%</p>
              </div>`
            )
        )
        .addTo(map.current!);
      
      markersRef.current.push(marker);
    });

    // Add sprinkler system markers
    resourceData.sprinklerSystems.forEach(system => {
      const el = document.createElement('div');
      el.className = 'w-8 h-8 rounded-full relative -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-blue-300 flex items-center justify-center shadow-sm';
      
      const icon = document.createElement('span');
      icon.className = 'text-base';
      icon.textContent = '💧';
      el.appendChild(icon);
      
      const marker = new mapboxgl.Marker({
        element: el,
        anchor: 'center'
      })
        .setLngLat([system.location.lng, system.location.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(
              `<div class="p-3 rounded-lg shadow-md">
                <h3 class="text-sm font-bold">${system.name}</h3>
                <p class="text-xs">Status: ${system.status}</p>
                <p class="text-xs">Coverage: ${system.coverage}%</p>
              </div>`
            )
        )
        .addTo(map.current!);
      
      markersRef.current.push(marker);
    });
  }, [resourceData]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center bg-gray-50 rounded-lg">
        <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Map</h3>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px] rounded-lg overflow-hidden">
      <div 
        ref={mapContainer} 
        className="absolute inset-0 w-full h-full"
      />
      {loading && (
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
      {/* Resource legend */}
      <div className="absolute bottom-4 left-4 z-10 bg-white rounded-lg shadow-md p-3 text-sm">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center">
              <span className="text-base">🚒</span>
            </div>
            <span>Fire Truck</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-red-500 flex items-center justify-center">
              <span className="text-base">🏢</span>
            </div>
            <span>Fire Station</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-green-500 flex items-center justify-center">
              <span className="text-base">💧</span>
            </div>
            <span>Water Source</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-blue-300 flex items-center justify-center">
              <span className="text-base">💧</span>
            </div>
            <span>Sprinkler System</span>
          </div>
        </div>
      </div>
      {/* Resource details panel */}
      <AnimatePresence>
        {selectedResource && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-md p-4 max-w-xs"
          >
            <h3 className="font-semibold text-lg mb-2">{selectedResource.name}</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Status:</span> {selectedResource.status}</p>
              <p><span className="font-medium">Capacity:</span> {selectedResource.capacity}</p>
              <p><span className="font-medium">Personnel:</span> {selectedResource.personnel}</p>
              <p><span className="font-medium">Last Updated:</span> {new Date(selectedResource.lastUpdated).toLocaleString()}</p>
            </div>
            <button
              onClick={() => setSelectedResource(null)}
              className="mt-4 text-sm text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
