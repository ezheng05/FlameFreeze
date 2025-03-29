"use client";

import React from 'react'
import { ArrowRight, Cloud, Database, Droplets, Radio, Satellite, Server, Cpu, BarChart, AlertTriangle, Zap } from 'lucide-react'

export default function SystemPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">System Architecture</h1>
        
        {/* FireSat Integration Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-8 rounded-xl shadow-lg mb-16">
          <div className="flex items-center gap-8">
            <div className="bg-white/20 p-4 rounded-lg">
              <Satellite className="h-14 w-14 flex-shrink-0" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Powered by Google FireSat™</h2>
              <p className="text-lg opacity-95 leading-relaxed">
                Our system integrates with Google's FireSat constellation, providing high-resolution thermal imaging 
                updated every 20 minutes. 
              </p>
            </div>
          </div>
        </div>

        {/* Flowchart */}
        <div className="bg-white p-10 rounded-xl shadow-lg mb-16 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-12 text-center">System Flow Diagram</h2>
            
            {/* Data Collection Layer */}
            <div className="flex justify-between mb-24 relative">
              <div className="text-center w-1/3 px-4">
                <div className="bg-orange-100 p-5 rounded-xl inline-flex items-center justify-center mb-4 h-20 w-20 shadow-sm">
                  <Satellite className="h-10 w-10 text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">FireSat Network</h3>
                <p className="text-gray-600">High-resolution thermal imaging</p>
              </div>
              <div className="text-center w-1/3 px-4">
                <div className="bg-orange-100 p-5 rounded-xl inline-flex items-center justify-center mb-4 h-20 w-20 shadow-sm">
                  <Radio className="h-10 w-10 text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">IoT Sensors</h3>
                <p className="text-gray-600">Ground-level environmental monitoring</p>
              </div>
              <div className="text-center w-1/3 px-4">
                <div className="bg-orange-100 p-5 rounded-xl inline-flex items-center justify-center mb-4 h-20 w-20 shadow-sm">
                  <Cloud className="h-10 w-10 text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Weather Data</h3>
                <p className="text-gray-600">Real-time atmospheric conditions</p>
              </div>
            </div>

            {/* Processing Layer */}
            <div className="flex justify-between mb-24 relative">
              <div className="text-center w-1/3 px-4">
                <div className="bg-amber-100 p-5 rounded-xl inline-flex items-center justify-center mb-4 h-20 w-20 shadow-sm">
                  <Cpu className="h-10 w-10 text-amber-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">FireBench AI</h3>
                <p className="text-gray-600">Advanced fire behavior modeling</p>
              </div>
              <div className="text-center w-1/3 px-4">
                <div className="bg-amber-100 p-5 rounded-xl inline-flex items-center justify-center mb-4 h-20 w-20 shadow-sm">
                  <Server className="h-10 w-10 text-amber-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Real-time Processing</h3>
                <p className="text-gray-600">Comprehensive threat analysis</p>
              </div>
              <div className="text-center w-1/3 px-4">
                <div className="bg-amber-100 p-5 rounded-xl inline-flex items-center justify-center mb-4 h-20 w-20 shadow-sm">
                  <BarChart className="h-10 w-10 text-amber-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Risk Assessment</h3>
                <p className="text-gray-600">ML-powered predictive analytics</p>
              </div>
            </div>

            {/* Storage Layer */}
            <div className="flex justify-center mb-24 relative">
              <div className="text-center w-1/3">
                <div className="bg-green-100 p-5 rounded-xl inline-flex items-center justify-center mb-4 h-20 w-20 shadow-sm">
                  <Database className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">FireBench Dataset</h3>
                <p className="text-gray-600">High-fidelity simulation data repository</p>
              </div>
            </div>

            {/* Response Layer */}
            <div className="flex justify-between relative">
              <div className="text-center w-1/3 px-4">
                <div className="bg-red-100 p-5 rounded-xl inline-flex items-center justify-center mb-4 h-20 w-20 shadow-sm">
                  <Droplets className="h-10 w-10 text-red-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Sprinkler Network</h3>
                <p className="text-gray-600">Automated fire suppression system</p>
              </div>
              <div className="text-center w-1/3 px-4">
                <div className="bg-red-100 p-5 rounded-xl inline-flex items-center justify-center mb-4 h-20 w-20 shadow-sm">
                  <AlertTriangle className="h-10 w-10 text-red-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Early Warning</h3>
                <p className="text-gray-600">NotifyLA integration for alerts</p>
              </div>
              <div className="text-center w-1/3 px-4">
                <div className="bg-red-100 p-5 rounded-xl inline-flex items-center justify-center mb-4 h-20 w-20 shadow-sm">
                  <Zap className="h-10 w-10 text-red-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Resource Dispatch</h3>
                <p className="text-gray-600">Optimized emergency response</p>
              </div>
            </div>
          </div>
        </div>

        {/* Component Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md transition-transform hover:translate-y-1 hover:shadow-lg">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <Satellite className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-700">Advanced Detection</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Leveraging Google's FireSat constellation, our system provides unprecedented early detection 
              capabilities. The satellites can detect fires as small as a classroom within minutes, providing 
              20-minute update intervals for comprehensive coverage of the Los Angeles area.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md transition-transform hover:translate-y-1 hover:shadow-lg">
            <div className="flex items-center mb-4">
              <div className="bg-amber-100 p-3 rounded-lg mr-4">
                <Cpu className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-amber-700">AI-Powered Analysis</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Using Google's FireBench dataset and AI models, our system accurately predicts fire behavior 
              and spread patterns. This simulation capability enables precise resource 
              allocation and optimized response strategies.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md transition-transform hover:translate-y-1 hover:shadow-lg">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <Database className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-700">Data-Driven Insights</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              The FireBench dataset provides extensive historical fire behavior data, enabling our system 
              to learn from past incidents and continuously improve its prediction accuracy. This includes 
              detailed environmental conditions, fire progression patterns, and response effectiveness.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md transition-transform hover:translate-y-1 hover:shadow-lg">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-lg mr-4">
                <Zap className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-red-700">Coordinated Response</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              When FireSat detects a threat, our system coordinates an immediate multi-layered response: 
              activating smart sprinkler systems, issuing community alerts through NotifyLA, and 
              dispatching emergency resources with AI-optimized routing.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}