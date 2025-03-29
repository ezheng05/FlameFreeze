"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Info, Play, Pause, RotateCcw, Eye, EyeOff, Wind } from 'lucide-react';

interface ComponentInfo {
  name: string;
  description: string;
  color: string;
}

const AirPurificationSystem = () => {
  // UI state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExploded, setIsExploded] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [fanSpeed, setFanSpeed] = useState(50);
  const [pollutionLevel, setPollutionLevel] = useState(70);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [animationFrame, setAnimationFrame] = useState(0);
  
  // Component information
  const components: Record<string, ComponentInfo> = {
    housing: {
      name: "Main Housing",
      description: "Durable weather-resistant housing designed to protect all internal components and withstand outdoor conditions.",
      color: "#607D8B"
    },
    sensors: {
      name: "Air Quality Sensors",
      description: "Precision PM2.5, VOC, CO and CO2 sensors that continuously monitor air quality and trigger the system when pollution is detected.",
      color: "#E91E63"
    },
    filter: {
      name: "HEPA & Carbon Filter",
      description: "High-efficiency particulate air filter combined with activated carbon layer to capture particles and neutralize odors.",
      color: "#CDDC39"
    },
    nebulizer: {
      name: "Ultrasonic Nebulizer",
      description: "Converts purification solution into fine mist particles for maximum coverage and effectiveness.",
      color: "#00BCD4"
    },
    electrostatic: {
      name: "Electrostatic Charging System",
      description: "Charges aerosol particles to improve adhesion to pollutants and increase purification effectiveness.",
      color: "#673AB7"
    },
    fan: {
      name: "Ventilation Fan",
      description: "High-efficiency fan system that creates optimal airflow through the unit and disperses purified air.",
      color: "#4CAF50"
    },
    controller: {
      name: "Microcontroller",
      description: "Central processing unit that manages all system functions, sensor readings, and communication with mobile app.",
      color: "#FF9800"
    },
    dispenser: {
      name: "Aerosol Dispensing Unit",
      description: "Precision distribution system that releases the purifying aerosol in response to detected pollution levels.",
      color: "#2196F3"
    }
  };
  
  // Animation loop
  useEffect(() => {
    let frameId: number;
    
    const updateAnimation = () => {
      if (isPlaying) {
        setAnimationFrame(prev => (prev + 1) % 60);
      }
      frameId = requestAnimationFrame(updateAnimation);
    };
    
    frameId = requestAnimationFrame(updateAnimation);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying]);

  // Reset all settings
  const resetSimulation = () => {
    setIsExploded(false);
    setIsPlaying(false);
    setSelectedComponent(null);
    setFanSpeed(50);
    setPollutionLevel(70);
  };

  // Handle component selection
  const handleComponentClick = (componentName: string) => {
    setSelectedComponent(componentName === selectedComponent ? null : componentName);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="h-[500px] relative bg-blue-50 flex items-center justify-center">
        <svg width="600" height="400" viewBox="0 0 600 400">
          {/* Main Housing */}
          <g 
            onClick={() => handleComponentClick('housing')} 
            style={{ cursor: 'pointer' }}
            opacity={selectedComponent && selectedComponent !== 'housing' ? 0.3 : 1}
          >
            <rect 
              x="180" 
              y="50" 
              width="240" 
              height="300" 
              rx="15" 
              fill={components.housing.color} 
              stroke={selectedComponent === 'housing' ? "white" : "black"}
              strokeWidth={selectedComponent === 'housing' ? "3" : "1"}
            />
            <rect x="200" y="70" width="200" height="20" rx="5" fill="#455A64" />
            <rect x="200" y="310" width="200" height="20" rx="5" fill="#455A64" />
          </g>

          {/* Components in assembled or exploded view */}
          
          {/* Sensors */}
          <g
            onClick={() => handleComponentClick('sensors')}
            style={{ cursor: 'pointer' }}
            opacity={selectedComponent && selectedComponent !== 'sensors' ? 0.3 : 1}
            transform={isExploded ? "translate(-140, -70)" : ""}
          >
            <rect 
              x={isExploded ? "180" : "250"} 
              y={isExploded ? "80" : "100"} 
              width="100" 
              height="40" 
              rx="8"
              fill={components.sensors.color}
              stroke={selectedComponent === 'sensors' ? "white" : "black"}
              strokeWidth={selectedComponent === 'sensors' ? "3" : "1"}
            />
            <circle cx={isExploded ? "200" : "270"} cy={isExploded ? "100" : "120"} r="8" fill="#f8bbd0" />
            <circle cx={isExploded ? "220" : "290"} cy={isExploded ? "100" : "120"} r="8" fill="#f8bbd0" />
            <circle cx={isExploded ? "240" : "310"} cy={isExploded ? "100" : "120"} r="8" fill="#f8bbd0" />
            <circle cx={isExploded ? "260" : "330"} cy={isExploded ? "100" : "120"} r="8" fill="#f8bbd0" />
          </g>

          {/* HEPA Filter */}
          <g
            onClick={() => handleComponentClick('filter')}
            style={{ cursor: 'pointer' }}
            opacity={selectedComponent && selectedComponent !== 'filter' ? 0.3 : 1}
            transform={isExploded ? "translate(0, 120)" : ""}
          >
            <rect 
              x="210" 
              y={isExploded ? "180" : "240"} 
              width="180" 
              height="50" 
              rx="5"
              fill={components.filter.color}
              stroke={selectedComponent === 'filter' ? "white" : "black"}
              strokeWidth={selectedComponent === 'filter' ? "3" : "1"}
            />
            <line x1="220" y1={isExploded ? "190" : "250"} x2="380" y2={isExploded ? "190" : "250"} stroke="#9e9d24" />
            <line x1="220" y1={isExploded ? "200" : "260"} x2="380" y2={isExploded ? "200" : "260"} stroke="#9e9d24" />
            <line x1="220" y1={isExploded ? "210" : "270"} x2="380" y2={isExploded ? "210" : "270"} stroke="#9e9d24" />
            <line x1="220" y1={isExploded ? "220" : "280"} x2="380" y2={isExploded ? "220" : "280"} stroke="#9e9d24" />
          </g>

          {/* Nebulizer */}
          <g
            onClick={() => handleComponentClick('nebulizer')}
            style={{ cursor: 'pointer' }}
            opacity={selectedComponent && selectedComponent !== 'nebulizer' ? 0.3 : 1}
            transform={isExploded ? "translate(140, -70)" : ""}
          >
            <ellipse 
              cx={isExploded ? "420" : "300"} 
              cy={isExploded ? "115" : "120"} 
              rx="40" 
              ry="20"
              fill={components.nebulizer.color}
              stroke={selectedComponent === 'nebulizer' ? "white" : "black"}
              strokeWidth={selectedComponent === 'nebulizer' ? "3" : "1"}
            />
            <ellipse 
              cx={isExploded ? "420" : "300"} 
              cy={isExploded ? "95" : "100"} 
              rx="20" 
              ry="10"
              fill="#b2ebf2"
            />
            {isPlaying && (
              <g>
                <ellipse 
                  cx={isExploded ? "420" : "300"} 
                  cy={isExploded ? (85 - animationFrame % 20) : (90 - animationFrame % 20)} 
                  rx={15 - (animationFrame % 20) / 4} 
                  ry={7 - (animationFrame % 20) / 8}
                  fill="#b2ebf2"
                  opacity={(20 - animationFrame % 20) / 20}
                />
              </g>
            )}
          </g>

          {/* Electrostatic System */}
          <g
            onClick={() => handleComponentClick('electrostatic')}
            style={{ cursor: 'pointer' }}
            opacity={selectedComponent && selectedComponent !== 'electrostatic' ? 0.3 : 1}
            transform={isExploded ? "translate(120, 80)" : ""}
          >
            <rect 
              x={isExploded ? "350" : "260"} 
              y={isExploded ? "220" : "170"} 
              width="80" 
              height="40" 
              rx="8"
              fill={components.electrostatic.color}
              stroke={selectedComponent === 'electrostatic' ? "white" : "black"}
              strokeWidth={selectedComponent === 'electrostatic' ? "3" : "1"}
            />
            <line 
              x1={isExploded ? "360" : "270"} 
              y1={isExploded ? "225" : "175"} 
              x2={isExploded ? "360" : "270"} 
              y2={isExploded ? "255" : "205"} 
              stroke="#d1c4e9" 
              strokeWidth="3" 
            />
            <line 
              x1={isExploded ? "380" : "290"} 
              y1={isExploded ? "225" : "175"} 
              x2={isExploded ? "380" : "290"} 
              y2={isExploded ? "255" : "205"} 
              stroke="#d1c4e9" 
              strokeWidth="3" 
            />
            <line 
              x1={isExploded ? "400" : "310"} 
              y1={isExploded ? "225" : "175"} 
              x2={isExploded ? "400" : "310"} 
              y2={isExploded ? "255" : "205"} 
              stroke="#d1c4e9" 
              strokeWidth="3" 
            />
          </g>

          {/* Fan */}
          <g
            onClick={() => handleComponentClick('fan')}
            style={{ cursor: 'pointer' }}
            opacity={selectedComponent && selectedComponent !== 'fan' ? 0.3 : 1}
            transform={isExploded ? "translate(0, -120)" : ""}
          >
            <circle 
              cx="300" 
              cy={isExploded ? "80" : "150"} 
              r="40"
              fill={components.fan.color}
              stroke={selectedComponent === 'fan' ? "white" : "black"}
              strokeWidth={selectedComponent === 'fan' ? "3" : "1"}
            />
            <g transform={`rotate(${isPlaying ? animationFrame * fanSpeed / 20 : 0}, 300, ${isExploded ? 80 : 150})`}>
              <path 
                d={`M300 ${isExploded ? 80 : 150} L290 ${isExploded ? 50 : 120} A20 20 0 0 1 310 ${isExploded ? 50 : 120} Z`} 
                fill="#a5d6a7" 
              />
              <path 
                d={`M300 ${isExploded ? 80 : 150} L290 ${isExploded ? 50 : 120} A20 20 0 0 1 310 ${isExploded ? 50 : 120} Z`} 
                fill="#a5d6a7" 
                transform={`rotate(72, 300, ${isExploded ? 80 : 150})`}
              />
              <path 
                d={`M300 ${isExploded ? 80 : 150} L290 ${isExploded ? 50 : 120} A20 20 0 0 1 310 ${isExploded ? 50 : 120} Z`} 
                fill="#a5d6a7" 
                transform={`rotate(144, 300, ${isExploded ? 80 : 150})`}
              />
              <path 
                d={`M300 ${isExploded ? 80 : 150} L290 ${isExploded ? 50 : 120} A20 20 0 0 1 310 ${isExploded ? 50 : 120} Z`} 
                fill="#a5d6a7" 
                transform={`rotate(216, 300, ${isExploded ? 80 : 150})`}
              />
              <path 
                d={`M300 ${isExploded ? 80 : 150} L290 ${isExploded ? 50 : 120} A20 20 0 0 1 310 ${isExploded ? 50 : 120} Z`} 
                fill="#a5d6a7" 
                transform={`rotate(288, 300, ${isExploded ? 80 : 150})`}
              />
            </g>
            <circle cx="300" cy={isExploded ? "80" : "150"} r="10" fill="#388e3c" />
          </g>

          {/* Controller */}
          <g
            onClick={() => handleComponentClick('controller')}
            style={{ cursor: 'pointer' }}
            opacity={selectedComponent && selectedComponent !== 'controller' ? 0.3 : 1}
            transform={isExploded ? "translate(-120, 80)" : ""}
          >
            <rect 
              x={isExploded ? "140" : "250"} 
              y={isExploded ? "220" : "200"} 
              width="100" 
              height="40" 
              rx="5"
              fill={components.controller.color}
              stroke={selectedComponent === 'controller' ? "white" : "black"}
              strokeWidth={selectedComponent === 'controller' ? "3" : "1"}
            />
            <rect 
              x={isExploded ? "160" : "270"} 
              y={isExploded ? "230" : "210"} 
              width="20" 
              height="20" 
              fill="#212121" 
            />
            {Array.from({length: 5}).map((_, i) => (
              <rect 
                key={`chip-${i}`} 
                x={isExploded ? (150 + i * 15) : (260 + i * 15)} 
                y={isExploded ? "255" : "235"} 
                width="10" 
                height="5" 
                fill="#e0e0e0" 
              />
            ))}
          </g>

          {/* Dispenser */}
          <g
            onClick={() => handleComponentClick('dispenser')}
            style={{ cursor: 'pointer' }}
            opacity={selectedComponent && selectedComponent !== 'dispenser' ? 0.3 : 1}
            transform={isExploded ? "translate(80, 0)" : ""}
          >
            <rect 
              x={isExploded ? "360" : "275"} 
              y="150" 
              width="50" 
              height="100" 
              rx="8"
              fill={components.dispenser.color}
              stroke={selectedComponent === 'dispenser' ? "white" : "black"}
              strokeWidth={selectedComponent === 'dispenser' ? "3" : "1"}
            />
            <ellipse 
              cx={isExploded ? "385" : "300"} 
              cy="180" 
              rx="15" 
              ry="25"
              fill="#90caf9"
              opacity="0.8"
            />
            {isPlaying && (
              <g>
                <ellipse 
                  cx={isExploded ? "385" : "300"} 
                  cy={140 - animationFrame % 10} 
                  rx={10 - (animationFrame % 10) / 3} 
                  ry={5 - (animationFrame % 10) / 5}
                  fill="#90caf9"
                  opacity={(10 - animationFrame % 10) / 10}
                />
              </g>
            )}
          </g>

          {/* Connector lines for exploded view */}
          {isExploded && (
            <g stroke="#999" strokeWidth="1" strokeDasharray="5,5">
              <line x1="300" y1="200" x2="180" y2="80" />
              <line x1="300" y1="200" x2="300" y2="300" />
              <line x1="300" y1="200" x2="420" y2="80" />
              <line x1="300" y1="200" x2="430" y2="240" />
              <line x1="300" y1="200" x2="300" y2="80" />
              <line x1="300" y1="200" x2="140" y2="240" />
              <line x1="300" y1="200" x2="385" y2="200" />
            </g>
          )}

          {/* Component labels with pointers */}
          {showLabels && (
            <g>
              {/* Housing label */}
              <g opacity={selectedComponent && selectedComponent !== 'housing' ? 0.3 : 1}>
                <line x1="300" y1="50" x2="300" y2="25" stroke="#333" strokeWidth="1" strokeDasharray="3,3" />
                <rect x="240" y="5" width="120" height="25" rx="12" fill="white" stroke="#333" strokeWidth="1" />
                <text x="300" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#333">Main Housing</text>
              </g>

              {/* Sensors label */}
              <g opacity={selectedComponent && selectedComponent !== 'sensors' ? 0.3 : 1}>
                <line 
                  x1={isExploded ? "230" : "250"} 
                  y1={isExploded ? "100" : "100"} 
                  x2={isExploded ? "120" : "130"} 
                  y2={isExploded ? "60" : "60"} 
                  stroke="#333" 
                  strokeWidth="1" 
                  strokeDasharray="3,3" 
                />
                <rect 
                  x={isExploded ? "40" : "90"} 
                  y={isExploded ? "50" : "50"} 
                  width="160" 
                  height="25" 
                  rx="12" 
                  fill="white" 
                  stroke="#333" 
                  strokeWidth="1" 
                />
                <text 
                  x={isExploded ? "120" : "170"} 
                  y={isExploded ? "67" : "67"} 
                  textAnchor="middle" 
                  fontSize="12" 
                  fontWeight="bold" 
                  fill="#333"
                >
                  Air Quality Sensors
                </text>
              </g>

              {/* Filter label */}
              <g opacity={selectedComponent && selectedComponent !== 'filter' ? 0.3 : 1}>
                <line 
                  x1="300" 
                  y1={isExploded ? "230" : "265"} 
                  x2="300" 
                  y2={isExploded ? "280" : "315"} 
                  stroke="#333" 
                  strokeWidth="1" 
                  strokeDasharray="3,3" 
                />
                <rect 
                  x="220" 
                  y={isExploded ? "270" : "305"} 
                  width="160" 
                  height="25" 
                  rx="12" 
                  fill="white" 
                  stroke="#333" 
                  strokeWidth="1" 
                />
                <text 
                  x="300" 
                  y={isExploded ? "287" : "322"} 
                  textAnchor="middle" 
                  fontSize="12" 
                  fontWeight="bold" 
                  fill="#333"
                >
                  HEPA & Carbon Filter
                </text>
              </g>

              {/* Nebulizer label */}
              <g opacity={selectedComponent && selectedComponent !== 'nebulizer' ? 0.3 : 1}>
                <line 
                  x1={isExploded ? "460" : "330"} 
                  y1={isExploded ? "115" : "110"} 
                  x2={isExploded ? "580" : "450"} 
                  y2={isExploded ? "40" : "60"} 
                  stroke="#333" 
                  strokeWidth="1" 
                  strokeDasharray="3,3" 
                />
                <rect 
                  x={isExploded ? "510" : "380"} 
                  y={isExploded ? "30" : "50"} 
                  width="140" 
                  height="25" 
                  rx="12" 
                  fill="white" 
                  stroke="#333" 
                  strokeWidth="1" 
                />
                <text 
                  x={isExploded ? "580" : "450"} 
                  y={isExploded ? "47" : "67"} 
                  textAnchor="middle" 
                  fontSize="12" 
                  fontWeight="bold" 
                  fill="#333"
                >
                  Ultrasonic Nebulizer
                </text>
              </g>

              {/* Electrostatic label */}
              <g opacity={selectedComponent && selectedComponent !== 'electrostatic' ? 0.3 : 1}>
                <line 
                  x1={isExploded ? "390" : "340"} 
                  y1={isExploded ? "240" : "170"} 
                  x2={isExploded ? "520" : "470"} 
                  y2={isExploded ? "170" : "120"} 
                  stroke="#333" 
                  strokeWidth="1" 
                  strokeDasharray="3,3" 
                />
                <rect 
                  x={isExploded ? "450" : "400"} 
                  y={isExploded ? "160" : "110"} 
                  width="140" 
                  height="25" 
                  rx="12" 
                  fill="white" 
                  stroke="#333" 
                  strokeWidth="1" 
                />
                <text 
                  x={isExploded ? "520" : "470"} 
                  y={isExploded ? "177" : "127"} 
                  textAnchor="middle" 
                  fontSize="12" 
                  fontWeight="bold" 
                  fill="#333"
                >
                  Electrostatic System
                </text>
              </g>

              {/* Fan label */}
              <g opacity={selectedComponent && selectedComponent !== 'fan' ? 0.3 : 1}>
                <line 
                  x1="300" 
                  y1={isExploded ? "40" : "110"} 
                  x2="300" 
                  y2={isExploded ? "10" : "80"} 
                  stroke="#333" 
                  strokeWidth="1" 
                  strokeDasharray="3,3" 
                />
                <rect 
                  x="220" 
                  y={isExploded ? "0" : "70"} 
                  width="160" 
                  height="25" 
                  rx="12" 
                  fill="white" 
                  stroke="#333" 
                  strokeWidth="1" 
                />
                <text 
                  x="300" 
                  y={isExploded ? "17" : "87"} 
                  textAnchor="middle" 
                  fontSize="12" 
                  fontWeight="bold" 
                  fill="#333"
                >
                  Ventilation Fan
                </text>
              </g>

              {/* Controller label */}
              <g opacity={selectedComponent && selectedComponent !== 'controller' ? 0.3 : 1}>
                <line 
                  x1={isExploded ? "190" : "250"} 
                  y1={isExploded ? "240" : "220"} 
                  x2={isExploded ? "90" : "150"} 
                  y2={isExploded ? "210" : "190"} 
                  stroke="#333" 
                  strokeWidth="1" 
                  strokeDasharray="3,3" 
                />
                <rect 
                  x={isExploded ? "20" : "110"} 
                  y={isExploded ? "200" : "180"} 
                  width="140" 
                  height="25" 
                  rx="12" 
                  fill="white" 
                  stroke="#333" 
                  strokeWidth="1" 
                />
                <text 
                  x={isExploded ? "90" : "180"} 
                  y={isExploded ? "217" : "197"} 
                  textAnchor="middle" 
                  fontSize="12" 
                  fontWeight="bold" 
                  fill="#333"
                >
                  Microcontroller
                </text>
              </g>

              {/* Dispenser label */}
              <g opacity={selectedComponent && selectedComponent !== 'dispenser' ? 0.3 : 1}>
                <line 
                  x1={isExploded ? "385" : "325"} 
                  y1={isExploded ? "200" : "200"} 
                  x2={isExploded ? "495" : "435"} 
                  y2={isExploded ? "190" : "190"} 
                  stroke="#333" 
                  strokeWidth="1" 
                  strokeDasharray="3,3" 
                />
                <rect 
                  x={isExploded ? "425" : "365"} 
                  y={isExploded ? "180" : "180"} 
                  width="140" 
                  height="25" 
                  rx="12" 
                  fill="white" 
                  stroke="#333" 
                  strokeWidth="1" 
                />
                <text 
                  x={isExploded ? "495" : "435"} 
                  y={isExploded ? "197" : "197"} 
                  textAnchor="middle" 
                  fontSize="12" 
                  fontWeight="bold" 
                  fill="#333"
                >
                  Aerosol Dispenser
                </text>
              </g>
            </g>
          )}

          {/* Air particles */}
          {isPlaying && (
            <g>
              {/* Pollution particles */}
              {[...Array(30)].map((_, i) => {
                const angle = (i / 30) * Math.PI * 2 + (animationFrame / 60) * Math.PI;
                const distance = 150 + Math.sin(animationFrame / 10 + i) * 30;
                const x = 300 + Math.cos(angle) * distance;
                const y = 200 + Math.sin(angle) * distance / 2;
                
                // Movement toward the device
                const toDeviceX = 300 - x;
                const toDeviceY = 200 - y;
                const length = Math.sqrt(toDeviceX * toDeviceX + toDeviceY * toDeviceY);
                const dirX = toDeviceX / length;
                const dirY = toDeviceY / length;
                
                const speed = (fanSpeed / 100) * 2;
                const moveX = x + dirX * speed * (animationFrame % 20);
                const moveY = y + dirY * speed * (animationFrame % 20);
                
                return (
                  <circle 
                    key={`pollution-${i}`} 
                    cx={moveX}
                    cy={moveY}
                    r={1 + Math.random() * 2}
                    fill="rgba(100, 100, 100, 0.6)"
                    opacity={pollutionLevel / 100}
                  />
                );
              })}
              
              {/* Purified particles */}
              {[...Array(15)].map((_, i) => {
                const x = 300 + Math.cos(i) * 20 + Math.sin(animationFrame / 10 + i) * 5;
                const y = 70 - animationFrame % 40 - (i % 5) * 3;
                const opacity = Math.max(0, 1 - y / 100);
                
                return (
                  <circle 
                    key={`purified-${i}`} 
                    cx={x}
                    cy={y}
                    r={2}
                    fill="#4FC3F7"
                    opacity={opacity}
                  />
                );
              })}
            </g>
          )}
        </svg>

        <div className="absolute top-4 right-4 flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowLabels(!showLabels)}
            className="bg-white/80 backdrop-blur-sm"
          >
            {showLabels ? (
              <><EyeOff className="h-4 w-4 mr-1" /> Hide Labels</>
            ) : (
              <><Eye className="h-4 w-4 mr-1" /> Show Labels</>
            )}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsExploded(!isExploded)}
            className="bg-white/80 backdrop-blur-sm"
          >
            {isExploded ? "Show Assembly" : "Show Exploded View"}
          </Button>
        </div>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md">
          <div className="flex items-center justify-center gap-2">
            <Button 
              onClick={() => setIsPlaying(!isPlaying)}
              variant={isPlaying ? "default" : "outline"}
              size="sm"
              className={isPlaying ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              {isPlaying ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
              {isPlaying ? "Pause Simulation" : "Start Simulation"}
            </Button>
            <Button 
              onClick={resetSimulation}
              variant="outline"
              size="sm"
            >
              <RotateCcw className="h-4 w-4 mr-1" /> Reset
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-white border-t">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6 bg-gray-50 p-6 rounded-xl border shadow-sm">
            <div>
              <div className="flex justify-between mb-3">
                <span className="text-sm font-medium flex items-center">
                  <Wind className="h-4 w-4 mr-1 text-blue-500" /> Fan Speed
                </span>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 px-3 py-1">{fanSpeed}%</Badge>
              </div>
              <div className="bg-white p-4 rounded-xl border shadow-sm">
                <Slider
                  value={[fanSpeed]}
                  onValueChange={(values) => setFanSpeed(values[0])}
                  min={0}
                  max={100}
                  step={1}
                  className="[&_[role=slider]]:bg-blue-500 [&_[role=slider]]:border-blue-500 [&_[role=slider]]:hover:bg-blue-600 [&_[role=slider]]:hover:border-blue-600 [&_[role=slider]]:focus:ring-blue-500 [&_[role=slider]]:focus:ring-offset-blue-500 [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:shadow-md"
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-3">
                <span className="text-sm font-medium flex items-center">
                  <Info className="h-4 w-4 mr-1 text-red-500" /> Pollution Level
                </span>
                <Badge variant="outline" className="bg-red-100 text-red-800 px-3 py-1">{pollutionLevel}%</Badge>
              </div>
              <div className="bg-white p-4 rounded-xl border shadow-sm">
                <Slider
                  value={[pollutionLevel]}
                  onValueChange={(values) => setPollutionLevel(values[0])}
                  min={10}
                  max={100}
                  step={1}
                  className="[&_[role=slider]]:bg-red-500 [&_[role=slider]]:border-red-500 [&_[role=slider]]:hover:bg-red-600 [&_[role=slider]]:hover:border-red-600 [&_[role=slider]]:focus:ring-red-500 [&_[role=slider]]:focus:ring-offset-red-500 [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:shadow-md"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-xl border">
            <h3 className="text-sm font-medium mb-2">System Information</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Status:</span> {isPlaying ? "Active" : "Standby"}</p>
              <p>
                <span className="font-medium">Air Quality:</span> {' '}
                {pollutionLevel > 80 ? (
                  <span className="text-red-600">Poor</span>
                ) : pollutionLevel > 50 ? (
                  <span className="text-amber-600">Moderate</span>
                ) : (
                  <span className="text-green-600">Good</span>
                )}
              </p>
              <p>
                <span className="font-medium">System Efficiency:</span> {' '}
                {fanSpeed < 30 ? (
                  <span>Low (Energy-saving mode)</span>
                ) : fanSpeed < 70 ? (
                  <span>Medium (Balanced mode)</span>
                ) : (
                  <span>High (Maximum purification)</span>
                )}
              </p>
              <p><span className="font-medium">Aerosol Distribution:</span> {isPlaying ? `${Math.round(fanSpeed * 0.8)}%` : "0%"}</p>
            </div>
            
            {selectedComponent && (
              <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-blue-800">{components[selectedComponent].name}</h4>
                  <Badge className="bg-blue-100 text-blue-800 font-normal">Selected</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {components[selectedComponent].description}
                </p>
              </div>
            )}
            
            {isPlaying && (
              <div className="mt-4 p-2 bg-blue-50 rounded-xl border border-blue-100 text-xs">
                The system is actively removing pollutants from the air. Aerosol particles are being distributed to neutralize contaminants.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirPurificationSystem; 