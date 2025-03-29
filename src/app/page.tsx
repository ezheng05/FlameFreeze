"use client";

import React from 'react';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Droplets, Wind, ThermometerSun, Users, Bell, Server, PlayCircle, Menu } from 'lucide-react';
import FireMap from './components/maps/FireMap';
import ResourceMap from './components/maps/ResourceMap';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  updateSimulationState, 
  getSimulationState, 
  getSystemStatus
} from '@/lib/system-integration';
import FireAlertBanner from './components/FireAlertBanner';

// Mock data for fire risk by area
const fireRiskData = [
  { name: 'Mandeville Canyon', risk: 85 },
  { name: 'Laurel Canyon', risk: 78 },
  { name: 'Santa Monica Mtn', risk: 92 },
  { name: 'Brentwood', risk: 65 },
  { name: 'Bel-Air', risk: 72 },
  { name: 'Hollywood Hills', risk: 68 },
  { name: 'Mount Washington', risk: 75 },
];

// Mock data for system status
const systemStatus = {
  waterLevels: 82, // percentage
  sensorNetwork: 98, // percentage operational
  sprinklerSystem: 'Ready',
  lastMaintenance: '2025-03-15',
  activeAlerts: 2,
};

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <FireAlertBanner />
      
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="/monitoring" 
                className="text-gray-900 hover:text-blue-600 font-medium flex items-center gap-2"
              >
                <AlertTriangle className="h-5 w-5" />
                Live Monitoring
              </Link>
              <Link 
                href="/system" 
                className="text-gray-900 hover:text-blue-600 font-medium flex items-center gap-2"
              >
                <Server className="h-5 w-5" />
                System Overview
              </Link>
              <Link 
                href="/simulation" 
                className="text-gray-900 hover:text-blue-600 font-medium flex items-center gap-2"
              >
                <PlayCircle className="h-5 w-5" />
                Simulation
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
          
          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4">
              <div className="flex flex-col space-y-4">
                <Link 
                  href="/monitoring" 
                  className="text-gray-900 hover:text-blue-600 font-medium flex items-center gap-2"
                >
                  <AlertTriangle className="h-5 w-5" />
                  Live Monitoring
                </Link>
                <Link 
                  href="/system" 
                  className="text-gray-900 hover:text-blue-600 font-medium flex items-center gap-2"
                >
                  <Server className="h-5 w-5" />
                  System Overview
                </Link>
                <Link 
                  href="/simulation" 
                  className="text-gray-900 hover:text-blue-600 font-medium flex items-center gap-2"
                >
                  <PlayCircle className="h-5 w-5" />
                  Simulation
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-4 sm:p-8 rounded-xl shadow-lg">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-4xl font-bold mb-4">Summit-Based Wildfire Suppression System</h1>
            <p className="text-base sm:text-xl mb-6">
              An innovative solution for wildfire prevention and management in Los Angeles using AI-driven monitoring, 
              stormwater collection, and automated fire suppression.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/system" className="bg-white text-amber-700 hover:bg-gray-100 font-bold py-2 px-6 rounded-lg transition-colors duration-300 text-center">
                Explore System
              </Link>
              <Link href="/simulation" className="bg-amber-800 text-white hover:bg-amber-900 font-bold py-2 px-6 rounded-lg transition-colors duration-300 text-center">
                Run Simulation
              </Link>
            </div>
          </div>
        </section>

        {/* Status Overview */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <Droplets className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{systemStatus.waterLevels}%</div>
            <div className="text-xs sm:text-sm text-gray-600">Water Storage Levels</div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <Server className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{systemStatus.sensorNetwork}%</div>
            <div className="text-xs sm:text-sm text-gray-600">Sensor Network</div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{systemStatus.activeAlerts}</div>
            <div className="text-xs sm:text-sm text-gray-600">Active Alerts</div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500 mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{systemStatus.sprinklerSystem}</div>
            <div className="text-xs sm:text-sm text-gray-600">System Status</div>
          </div>
        </section>

        {/* Fire Risk Chart */}
        <section className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Fire Risk by Area</h2>
          <div className="h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fireRiskData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  interval={0}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="risk" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Maps Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Fire Risk Map</h2>
            <div className="h-[300px] sm:h-[400px]">
              <FireMap />
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Resource Distribution</h2>
            <div className="h-[300px] sm:h-[400px]">
              <ResourceMap />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
