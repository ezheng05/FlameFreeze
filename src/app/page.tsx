"use client";

import React from 'react';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Droplets, Wind, ThermometerSun, Users, Bell, Server, PlayCircle } from 'lucide-react';
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
  return (
    <div className="min-h-screen bg-gray-50">
      <FireAlertBanner />
      
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8 h-16">
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
      </nav>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-8 rounded-xl shadow-lg">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Summit-Based Wildfire Suppression System</h1>
            <p className="text-xl mb-6">
              An innovative solution for wildfire prevention and management in Los Angeles using AI-driven monitoring, 
              stormwater collection, and automated fire suppression.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/system" className="bg-white text-amber-700 hover:bg-gray-100 font-bold py-2 px-6 rounded-lg transition-colors duration-300">
                Explore System
              </Link>
              <Link href="/simulation" className="bg-amber-800 text-white hover:bg-amber-900 font-bold py-2 px-6 rounded-lg transition-colors duration-300">
                Run Simulation
              </Link>
            </div>
          </div>
        </section>

        {/* Status Overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Droplets className="h-8 w-8 text-blue-500 mb-2" />
            <div className="text-2xl font-bold text-gray-900">{systemStatus.waterLevels}%</div>
            <div className="text-sm text-gray-600">Water Storage Levels</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <AlertTriangle className="h-8 w-8 text-amber-500 mb-2" />
            <div className="text-2xl font-bold text-gray-900">{systemStatus.activeAlerts}</div>
            <div className="text-sm text-gray-600">Active Alerts</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Wind className="h-8 w-8 text-gray-500 mb-2" />
            <div className="text-2xl font-bold text-gray-900">18 mph</div>
            <div className="text-sm text-gray-600">Current Wind Speed</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <ThermometerSun className="h-8 w-8 text-red-500 mb-2" />
            <div className="text-2xl font-bold text-gray-900">84°F</div>
            <div className="text-sm text-gray-600">Temperature</div>
          </div>
        </section>

        {/* Fire Map Section */}
        <section>
          <FireMap />
        </section>

        {/* Fire Risk Visualization */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Fire Risk by Area</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={fireRiskData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="risk" name="Risk Level (%)" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* System Overview Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-amber-700 mb-2">AI Fire Mapping</h3>
            <p className="mb-4 text-gray-600">
              Utilizes Google's FireStat technology to identify fire locations as small as a swimming pool, 
              providing early detection and rapid response capabilities.
            </p>
            <Link href="/system#ai-mapping" className="text-amber-700 hover:text-amber-800 font-semibold inline-flex items-center">
              Learn more →
            </Link>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-amber-700 mb-2">Water Collection System</h3>
            <p className="mb-4 text-gray-600">
              Collects and stores stormwater in underground tanks (50,000 gallons each), 
              using gravity-fed distribution to reduce pumping costs.
            </p>
            <Link href="/system#water-collection" className="text-amber-700 hover:text-amber-800 font-semibold inline-flex items-center">
              Learn more →
            </Link>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-amber-700 mb-2">Smart Sprinkler Network</h3>
            <p className="mb-4 text-gray-600">
              High-pressure adjustable nozzles with anti-wind drift technology dispense water or 
              environmentally friendly fire retardants as needed.
            </p>
            <Link href="/system#sprinkler-network" className="text-amber-700 hover:text-amber-800 font-semibold inline-flex items-center">
              Learn more →
            </Link>
          </div>
        </section>

        {/* Community Engagement */}
        <section className="bg-blue-50 p-6 rounded-xl shadow-md">
          <div className="flex items-start space-x-4">
            <Users className="h-12 w-12 text-blue-500 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-blue-700 mb-2">Join Our Community Network</h3>
              <p className="mb-4 text-gray-600">
                Become a community fire warden, receive personalized alerts, and help protect your neighborhood. 
                Our system integrates with NotifyLA to provide real-time updates and evacuation information.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/community" className="bg-blue-600 text-white hover:bg-blue-700 font-bold py-2 px-6 rounded-lg transition-colors duration-300">
                  Join Now
                </Link>
                <Link href="/community#resources" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center">
                  <Bell className="h-4 w-4 mr-1" />
                  Set Up Alerts
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent System Activity</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-03-28</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Heat Anomaly Detected</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Laurel Canyon</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Resolved
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-03-27</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">System Maintenance</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">All Locations</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-03-25</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Water Collection</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Santa Monica Mountains</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        15,000 Gallons
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
