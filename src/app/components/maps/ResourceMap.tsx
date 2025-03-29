"use client";

import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion, AnimatePresence } from 'framer-motion';

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

type HighRiskArea = {
  id: string;
  name: string;
  riskLevel: number;
  location: {
    lat: number;
    lng: number;
  };
  radius: number;
};

type ResourceData = {
  firefightingResources: FirefightingResource[];
  fireStations: FireStation[];
  waterSources: WaterSource[];
  sprinklerSystems: SprinklerSystem[];
  highRiskAreas: HighRiskArea[];
  lastUpdated: string;
};

export default function ResourceMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [resourceData, setResourceData] = useState<ResourceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedResource, setSelectedResource] = useState<FirefightingResource | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
      setError('Mapbox token is missing. Please add NEXT_PUBLIC_MAPBOX_TOKEN to your .env.local file');
      setLoading(false);
      return;
    }

    async function fetchResourceData() {
      try {
        const response = await fetch('/api/resources');
        if (!response.ok) {
          throw new Error('Failed to fetch resource data');
        }
        const data = await response.json() as ResourceData;
        setResourceData(data);
        setLoading(false);
      } catch (err) {
        setError('Error loading resource data');
        setLoading(false);
        console.error('Error fetching resource data:', err);
      }
    }

    fetchResourceData();
  }, []);

  useEffect(() => {
    if (!mapContainer.current || loading || error || !resourceData) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-118.243683, 34.052235],
      zoom: 10,
      pitch: 45,
      bearing: -17.6
    });

    map.current.on('load', () => {
      // Add 3D buildings layer
      map.current!.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'height']
          ],
          'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'min_height']
          ],
          'fill-extrusion-opacity': 0.6
        }
      });

      // Add markers for each resource type
      const addMarker = (location: { lat: number; lng: number }, icon: string, popupContent: string, resource?: FirefightingResource) => {
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = `url(${icon})`;
        el.style.width = '24px';
        el.style.height = '24px';
        el.style.backgroundSize = 'contain';
        el.style.backgroundRepeat = 'no-repeat';
        
        const marker = new mapboxgl.Marker(el)
          .setLngLat([location.lng, location.lat])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent))
          .addTo(map.current!);

        if (resource) {
          el.addEventListener('click', () => {
            setSelectedResource(resource);
            map.current!.flyTo({
              center: [location.lng, location.lat],
              zoom: 15,
              pitch: 60,
              bearing: 0,
              duration: 2000
            });
          });
        }
      };

      // Add fire stations with 3D buildings
      resourceData.fireStations.forEach(station => {
        addMarker(
          station.location,
          '/images/fire-station.svg',
          `<div class="p-2">
            <h3 class="text-lg font-semibold text-gray-800 mb-1">${station.name}</h3>
            <p class="text-sm text-gray-600">Resources: ${station.resources.length}</p>
            <p class="text-sm text-gray-600">Coverage: ${station.coverage}km²</p>
          </div>`
        );
      });

      // Add firefighting resources with status indicators
      resourceData.firefightingResources.forEach(resource => {
        const icon = resource.type === 'engine' ? '/images/fire-engine.svg' :
                    resource.type === 'helicopter' ? '/images/helicopter.svg' :
                    '/images/resource.svg';
        
        const statusColor = resource.status === 'available' ? 'text-green-500' :
                          resource.status === 'deployed' ? 'text-red-500' :
                          'text-yellow-500';
        
        addMarker(
          resource.location,
          icon,
          `<div class="p-2">
            <h3 class="text-lg font-semibold text-gray-800 mb-1">${resource.name}</h3>
            <p class="text-sm ${statusColor}">${resource.status}</p>
            <p class="text-sm text-gray-600">Capacity: ${resource.capacity}</p>
          </div>`,
          resource
        );
      });

      // Add water sources with level indicators
      resourceData.waterSources.forEach(source => {
        const levelColor = source.currentLevel > 80 ? 'text-green-500' :
                          source.currentLevel > 40 ? 'text-yellow-500' :
                          'text-red-500';
        
        addMarker(
          source.location,
          '/images/water-source.svg',
          `<div class="p-2">
            <h3 class="text-lg font-semibold text-gray-800 mb-1">${source.name}</h3>
            <p class="text-sm ${levelColor}">Level: ${source.currentLevel}%</p>
            <p class="text-sm text-gray-600">Capacity: ${source.capacity} gallons</p>
          </div>`
        );
      });

      // Add high risk areas with heat map effect
      resourceData.highRiskAreas.forEach((area, index) => {
        map.current!.addSource(`risk-area-${index}`, {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {
              name: area.name,
              riskLevel: area.riskLevel
            },
            geometry: {
              type: 'Point',
              coordinates: [area.location.lng, area.location.lat]
            }
          }
        });

        map.current!.addLayer({
          id: `risk-area-${index}`,
          type: 'circle',
          source: `risk-area-${index}`,
          paint: {
            'circle-radius': {
              base: 1.75,
              stops: [[12, area.radius * 50], [22, area.radius * 200]]
            },
            'circle-color': [
              'interpolate',
              ['linear'],
              ['get', 'riskLevel'],
              1, '#ffd700',
              2, '#ffa500',
              3, '#ff4500'
            ],
            'circle-opacity': 0.3,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff',
            'circle-stroke-opacity': 0.5
          }
        });
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [loading, error, resourceData]);

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-50/50 border border-red-200 text-red-700 p-4 rounded-xl shadow-md"
      >
        <p>{error}</p>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div 
        ref={mapContainer} 
        className="w-full h-[600px] rounded-2xl shadow-md overflow-hidden"
      />
      
      <AnimatePresence>
        {selectedResource && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-md border border-white/20"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{selectedResource.name}</h3>
                <p className="text-sm text-gray-600">Type: {selectedResource.type}</p>
                <p className="text-sm text-gray-600">Status: {selectedResource.status}</p>
                <p className="text-sm text-gray-600">Capacity: {selectedResource.capacity}</p>
              </div>
              <button
                onClick={() => setSelectedResource(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
