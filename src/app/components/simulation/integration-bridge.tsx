import { useSimulationIntegration as useBaseIntegration } from './integration-utils';
import { useState, useCallback } from 'react';

interface WaterSource {
  location: {
    x: number;
    y: number;
    z: number;
  };
}

interface Sprinkler {
  location: {
    x: number;
    y: number;
    z: number;
  };
  status: 'active' | 'inactive';
}

interface RiskZone {
  coordinates: {
    x: number;
    y: number;
    z: number;
  };
  riskLevel: number;
}

export interface FireEvent {
  location: {
    x: number;
    y: number;
    z: number;
  };
  intensity: number;
  status: 'active' | 'inactive' | 'extinguished';
}

interface SystemConfig {
  autoResponse: boolean;
}

interface IntegrationData {
  waterSystem: {
    sources: Array<{ location: { x: number; y: number; z: number } }>;
    sprinklers: Array<{ location: { x: number; y: number; z: number }; status: 'active' | 'inactive' }>;
    getSystemCapacity: () => number;
    activateSprinklers: (location: { x: number; y: number; z: number }) => void;
  };
  fireSat: {
    riskZones: Array<RiskZone>;
    activeEvents: Array<{ location: { x: number; y: number; z: number }; intensity: number; status: 'active' | 'inactive' | 'extinguished' }>;
    updateFireStatus?: (fireId: string, status: 'active' | 'inactive' | 'extinguished') => void;
    onFireDetected?: (event: FireEvent) => void;
  };
  droneSystem: {
    drones: any[];
  };
  config: SystemConfig;
  updateConfig: (config: Partial<SystemConfig>) => void;
}

export function useSimulationIntegration(): IntegrationData {
  // Use the base integration hook to get simulation state and update functions
  const { simulationState, updateSimulationState } = useBaseIntegration();
  const [config, setConfig] = useState<SystemConfig>({ autoResponse: false });

  // Calculate system capacity based on active sprinklers
  const getSystemCapacity = useCallback(() => {
    if (!simulationState.sprinklers || simulationState.sprinklers.length === 0) {
      return 0;
    }
    const activeSprinklers = simulationState.sprinklers.filter(s => s.isActive).length;
    return (activeSprinklers / simulationState.sprinklers.length) * 100;
  }, [simulationState.sprinklers]);

  // Activate sprinklers near a specific location
  const activateSprinklers = useCallback((location: { x: number; y: number; z: number }) => {
    if (!simulationState.sprinklers) {
      return;
    }
    
    const updatedSprinklers = simulationState.sprinklers.map(sprinkler => {
      // Calculate 3D distance between sprinkler and fire location
      const distance = Math.hypot(
        sprinkler.x - location.x,
        sprinkler.y - location.y,
        sprinkler.z - location.z
      );
      // Activate sprinklers within 50 units of the fire
      return distance < 50 ? { ...sprinkler, isActive: true } : sprinkler;
    });
    
    updateSimulationState({ sprinklers: updatedSprinklers });
  }, [simulationState.sprinklers, updateSimulationState]);

  // Update the configuration
  const updateConfig = useCallback((newConfig: Partial<SystemConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  // Update the status of a fire
  const updateFireStatus = useCallback((fireId: string, status: 'active' | 'inactive' | 'extinguished') => {
    if (!simulationState.fireSat || !simulationState.fireSat.fireSpots) {
      return;
    }
    
    updateSimulationState({
      fireSat: {
        ...simulationState.fireSat,
        fireSpots: simulationState.fireSat.fireSpots.map(spot => {
          // Use coordinates as unique identifier since we don't have IDs
          const spotId = `${spot.coordinates.x},${spot.coordinates.y},${spot.coordinates.z}`;
          return spotId === fireId ? { ...spot, status } : spot;
        })
      }
    });
  }, [simulationState.fireSat, updateSimulationState]);

  // Handle fire detection and automatic response
  const onFireDetected = useCallback((event: FireEvent) => {
    if (config.autoResponse && simulationState.sprinklers) {
      // Automatically activate nearby sprinklers
      const nearbySprinklers = simulationState.sprinklers.map(sprinkler => {
        // Calculate 3D distance between sprinkler and fire location
        const distance = Math.hypot(
          sprinkler.x - event.location.x,
          sprinkler.y - event.location.y,
          sprinkler.z - event.location.z
        );
        return {
          ...sprinkler,
          isActive: distance < 50 // Activate sprinklers within 50 units
        };
      });

      updateSimulationState({
        sprinklers: nearbySprinklers
      });
    }
  }, [config.autoResponse, simulationState.sprinklers, updateSimulationState]);

  // Mock data for demonstration
  const mockRiskZones: RiskZone[] = [
    {
      coordinates: { x: -118.5010, y: 34.0901, z: 0 },
      riskLevel: 0.85
    },
    {
      coordinates: { x: -118.3733, y: 34.1259, z: 0 },
      riskLevel: 0.78
    },
    {
      coordinates: { x: -118.5504, y: 34.0952, z: 0 },
      riskLevel: 0.92
    }
  ];

  // Get high-risk zones
  const highRiskZones = mockRiskZones.filter(z => z.riskLevel > 0.6);

  // Return the integration data with proper null checks
  return {
    waterSystem: {
      sources: simulationState.sprinklers?.map((s) => ({
        location: { x: s.x, y: 0, z: s.y || 0 }
      })) || [],
      sprinklers: simulationState.sprinklers?.map((s) => ({
        location: { x: s.x, y: 0, z: s.y || 0 },
        status: s.isActive ? 'active' : 'inactive'
      })) || [],
      getSystemCapacity: () => 100,
      activateSprinklers
    },
    fireSat: {
      riskZones: mockRiskZones,
      activeEvents: simulationState.fireSat?.fireSpots?.map((f) => ({
        location: f.coordinates,
        intensity: f.intensity,
        status: 'active' as const
      })) || [],
      updateFireStatus,
      onFireDetected
    },
    droneSystem: {
      drones: []
    },
    config,
    updateConfig
  };
}