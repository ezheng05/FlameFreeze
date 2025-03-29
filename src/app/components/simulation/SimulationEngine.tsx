"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useSimulationIntegration, FireEvent } from '@/app/components/simulation/integration-bridge';

export default function SimulationEngine() {
  const integration = useSimulationIntegration();
  const [windSpeed, setWindSpeed] = useState(5);
  const [temperature, setTemperature] = useState(85);
  const [humidity, setHumidity] = useState(30);
  const [isRunning, setIsRunning] = useState(false);

  const startSimulation = () => {
    setIsRunning(true);
    // Create a FireEvent object
    const fireEvent: FireEvent = {
      location: { x: -5, y: 0, z: -5 },
      intensity: 7,
      status: 'active'
    };
    // Call onFireDetected with a single argument
    integration.fireSat.onFireDetected?.(fireEvent);
    console.log('Fire detected, system responding...');
  };

  const stopSimulation = () => {
    setIsRunning(false);
    // Reset system state
    integration.waterSystem.activateSprinklers({ x: 0, y: 0, z: 0 });
    integration.fireSat.updateFireStatus?.('fire-1', 'extinguished');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Simulation Parameters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Wind Speed (mph)</Label>
            <Slider
              value={[windSpeed]}
              onValueChange={(value: number[]) => setWindSpeed(value[0])}
              min={0}
              max={30}
              step={1}
            />
            <div className="text-sm text-muted-foreground">
              Current: {windSpeed} mph
            </div>
          </div>

          <div className="space-y-2">
            <Label>Temperature (°F)</Label>
            <Slider
              value={[temperature]}
              onValueChange={(value: number[]) => setTemperature(value[0])}
              min={60}
              max={120}
              step={1}
            />
            <div className="text-sm text-muted-foreground">
              Current: {temperature}°F
            </div>
          </div>

          <div className="space-y-2">
            <Label>Humidity (%)</Label>
            <Slider
              value={[humidity]}
              onValueChange={(value: number[]) => setHumidity(value[0])}
              min={0}
              max={100}
              step={1}
            />
            <div className="text-sm text-muted-foreground">
              Current: {humidity}%
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Water Capacity</Label>
              <div className="text-2xl font-bold">
                {Math.round(integration.waterSystem.getSystemCapacity())}%
              </div>
            </div>
            <div>
              <Label>Active Sprinklers</Label>
              <div className="text-2xl font-bold">
                {integration.waterSystem.sprinklers.filter(s => s.status === 'active').length}/
                {integration.waterSystem.sprinklers.length}
              </div>
            </div>
            <div>
              <Label>Active Fires</Label>
              <div className="text-2xl font-bold">
                {integration.fireSat.activeEvents.filter(e => e.status === 'active').length}
              </div>
            </div>
            <div>
              <Label>Deployed Drones</Label>
              <div className="text-2xl font-bold">
                {integration.droneSystem.drones.filter(d => d.status === 'deployed').length}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center space-x-4">
        <Button
          onClick={startSimulation}
          disabled={isRunning}
          className="bg-green-600 hover:bg-green-700"
        >
          Start Simulation
        </Button>
        <Button
          onClick={stopSimulation}
          disabled={!isRunning}
          variant="destructive"
        >
          Stop Simulation
        </Button>
      </div>
    </div>
  );
}