"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import WildfireSimulation3D from './WildfireSimulation3D';
import SimulationEngine from './SimulationEngine';
import { useSimulationIntegration } from './integration-bridge';

interface FireEvent {
  location: {
    x: number;
    y: number;
    z: number;
  };
  intensity: number;
  status: 'active' | 'inactive' | 'extinguished';
}

export default function SummitSuppressionSystem() {
  const [activeTab, setActiveTab] = useState('simulation');
  const [systemHealth, setSystemHealth] = useState<'healthy' | 'warning' | 'critical'>('healthy');
  const { toast } = useToast();
  const integration = useSimulationIntegration();

  // Monitor system health
  useEffect(() => {
    const healthCheck = setInterval(() => {
      const waterCapacity = integration.waterSystem.getSystemCapacity();
      const activeFires = integration.fireSat.activeEvents.filter((e: FireEvent) => e.status === 'active').length;

      if (activeFires > 0 && waterCapacity < 20) {
        setSystemHealth('critical');
      } else if (waterCapacity < 40 || activeFires > 0) {
        setSystemHealth('warning');
      } else {
        setSystemHealth('healthy');
      }
    }, 2000);

    return () => clearInterval(healthCheck);
  }, [integration]);

  // Handle system health alerts
  useEffect(() => {
    if (systemHealth === 'critical') {
      toast({
        title: "Critical System Alert",
        description: "Water capacity critically low with active fires. Immediate action required.",
        variant: "destructive",
      });
    } else if (systemHealth === 'warning') {
      toast({
        title: "System Warning",
        description: "System resources running low. Consider replenishing water supply.",
        variant: "default",
      });
    }
  }, [systemHealth, toast]);

  const toggleAutoResponse = () => {
    integration.updateConfig({
      autoResponse: !integration.config.autoResponse
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">FlameFreeze</CardTitle>
            </div>
            <Badge
              className={`${
                systemHealth === 'healthy'
                  ? 'bg-green-100 text-green-800 border-green-200'
                  : systemHealth === 'warning'
                  ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                  : 'bg-red-100 text-red-800 border-red-200'
              } px-3 py-1`}
            >
              {systemHealth === 'healthy' ? (
                <CheckCircle className="w-4 h-4 mr-1" />
              ) : (
                <AlertCircle className="w-4 h-4 mr-1" />
              )}
              {systemHealth.charAt(0).toUpperCase() + systemHealth.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="simulation">3D Simulation</TabsTrigger>
              <TabsTrigger value="dashboard">Simulation Engine</TabsTrigger>
            </TabsList>

            <TabsContent value="simulation" className="mt-4">
              <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
                <WildfireSimulation3D />
              </div>
            </TabsContent>

            <TabsContent value="dashboard" className="mt-4">
              <SimulationEngine />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Auto-Response Mode</h3>
              <p className="text-sm text-muted-foreground">
                Automatically deploy resources when fires are detected
              </p>
            </div>
            <button
              onClick={toggleAutoResponse}
              className={`px-4 py-2 rounded-md ${
                integration.config.autoResponse
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              {integration.config.autoResponse ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 