"use client";

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { AlertTriangle, Truck, Droplets, Wind } from 'lucide-react';

// Initialize Mapbox
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface FireLocation {
  id: string;
  coordinates: [number, number];
  intensity: number;
  timestamp: string;
}

interface Resource {
  id: string;
  type: 'truck' | 'helicopter' | 'sprinkler';
  coordinates: [number, number];
  status: 'responding' | 'onsite' | 'returning';
  eta?: string;
}

export default function MonitoringDashboard() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [fires, setFires] = useState<FireLocation[]>([
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
  ]);
  const [resources, setResources] = useState<Resource[]>([
    {
      id: 'truck-1',
      type: 'truck',
      coordinates: [-118.2437, 34.0522],
      status: 'responding',
      eta: '5 min'
    },
    {
      id: 'sprinkler-1',
      type: 'sprinkler',
      coordinates: [-118.4912, 34.0195],
      status: 'onsite'
    }
  ]);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-118.2437, 34.0522], // Los Angeles
      zoom: 10
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl());

    // Clean up on unmount
    return () => {
      map.current?.remove();
    };
  }, []);

  // Update markers when fires or resources change
  useEffect(() => {
    if (!map.current) return;

    // Wait for map to load
    map.current.on('load', () => {
      // Add fire markers
      fires.forEach(fire => {
        const el = document.createElement('div');
        el.className = 'fire-marker active';
        
        new mapboxgl.Marker({
          element: el,
          anchor: 'center'
        })
          .setLngLat(fire.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(
                `<h3 class="text-sm font-bold">Fire Alert</h3>
                <p class="text-xs">Intensity: ${Math.round(fire.intensity * 100)}%</p>
                <p class="text-xs">Detected: ${new Date(fire.timestamp).toLocaleTimeString()}</p>`
              )
          )
          .addTo(map.current!);
      });

      // Add resource markers
      resources.forEach(resource => {
        const el = document.createElement('div');
        el.className = `resource-marker ${resource.type}`;
        
        new mapboxgl.Marker({
          element: el,
          anchor: 'center'
        })
          .setLngLat(resource.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(
                `<h3 class="text-sm font-bold">${resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</h3>
                <p class="text-xs">Status: ${resource.status}</p>
                ${resource.eta ? `<p class="text-xs">ETA: ${resource.eta}</p>` : ''}`
              )
          )
          .addTo(map.current!);
      });
    });
  }, [fires, resources]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Live Fire Monitoring</h1>
          <p className="text-gray-600">
            Real-time monitoring of fire incidents and emergency response resources powered by FireSat™ satellite data.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Map */}
          <div className="lg:col-span-3">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div 
                ref={mapContainer} 
                className="w-full h-[600px] rounded overflow-hidden"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Active Incidents */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Incidents</h3>
              <div className="space-y-4">
                {fires.map(fire => (
                  <div key={fire.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Fire {fire.id}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(fire.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-red-600">
                      {Math.round(fire.intensity * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resource Status */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resource Status</h3>
              <div className="space-y-4">
                {resources.map(resource => (
                  <div key={resource.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {resource.type === 'truck' ? (
                        <Truck className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Droplets className="h-5 w-5 text-blue-600" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)} {resource.id}
                        </p>
                        <p className="text-xs text-gray-500">
                          {resource.status}
                          {resource.eta ? ` • ETA: ${resource.eta}` : ''}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      resource.status === 'responding' ? 'bg-yellow-100 text-yellow-800' :
                      resource.status === 'onsite' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {resource.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Map Legend</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="fire-marker active w-4 h-4" />
                  <span className="text-sm text-gray-600">Active Fire</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="resource-marker truck w-4 h-4" />
                  <span className="text-sm text-gray-600">Fire Truck</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="resource-marker sprinkler w-4 h-4" />
                  <span className="text-sm text-gray-600">Sprinkler System</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 