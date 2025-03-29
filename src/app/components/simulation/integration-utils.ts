import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface FireSatData {
  riskZones: Array<{
    coordinates: {
      x: number;
      y: number;
      z: number;
    };
    riskLevel: number;
    radius: number;
  }>;
  fireSpots: Array<{
    coordinates: {
      x: number;
      y: number;
      z: number;
    };
    intensity: number;
    spreadRate: number;
    direction: number;
  }>;
}

interface SimulationState {
  fireSpots: Array<{
    x: number;
    y: number;
    intensity: number;
    spreadRate: number;
    direction: number;
  }>;
  weather: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    windDirection: number;
  };
  sprinklers: Array<{
    x: number;
    y: number;
    z: number;
    isActive: boolean;
    waterPressure: number;
  }>;
  riskZones: Array<{
    x: number;
    y: number;
    radius: number;
    riskLevel: number;
  }>;
  fireSat: FireSatData;
}

export function useSimulationIntegration() {
  const [simulationState, setSimulationState] = useState<SimulationState>({
    fireSpots: [],
    weather: {
      temperature: 30,
      humidity: 20,
      windSpeed: 10,
      windDirection: 0
    },
    sprinklers: Array.from({ length: 9 }, (_, i) => ({
      x: (i % 3) * 100,
      y: Math.floor(i / 3) * 100,
      z: 0,
      isActive: false,
      waterPressure: 100
    })),
    riskZones: [],
    fireSat: {
      riskZones: [],
      fireSpots: []
    }
  });

  const { toast } = useToast();

  useEffect(() => {
    // Initialize simulation state
    const initializeSimulation = async () => {
      try {
        // Generate initial risk zones in a grid pattern
        const initialRiskZones = [];
        const gridSize = 5;
        const spacing = 100;
        
        for (let i = 0; i < gridSize; i++) {
          for (let j = 0; j < gridSize; j++) {
            const riskLevel = Math.random() * 0.5 + 0.2; // Random risk level between 0.2 and 0.7
            initialRiskZones.push({
              x: i * spacing + spacing / 2,
              y: j * spacing + spacing / 2,
              radius: 30,
              riskLevel
            });
          }
        }

        // Generate corresponding FireSat data
        const fireSatRiskZones = initialRiskZones.map(zone => ({
          coordinates: {
            x: zone.x,
            y: zone.y,
            z: 0
          },
          riskLevel: zone.riskLevel,
          radius: zone.radius
        }));

        setSimulationState({
          fireSpots: [],
          weather: {
            temperature: 30,
            humidity: 20,
            windSpeed: 10,
            windDirection: 0
          },
          sprinklers: Array.from({ length: 9 }, (_, i) => ({
            x: (i % 3) * 100,
            y: Math.floor(i / 3) * 100,
            z: 0,
            isActive: false,
            waterPressure: 100
          })),
          riskZones: initialRiskZones,
          fireSat: {
            riskZones: fireSatRiskZones,
            fireSpots: []
          }
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to initialize simulation state",
          variant: "destructive",
        });
      }
    };

    initializeSimulation();
  }, []);

  const updateSimulationState = (newState: Partial<SimulationState>) => {
    setSimulationState(prev => ({
      ...prev,
      ...newState
    }));
  };

  const addFireSpot = (x: number, y: number) => {
    const newFireSpot = {
      x,
      y,
      intensity: 0.8,
      spreadRate: 0.5,
      direction: Math.random() * Math.PI * 2
    };

    const newFireSatSpot = {
      coordinates: {
        x,
        y,
        z: 0
      },
      intensity: 0.8,
      spreadRate: 0.5,
      direction: Math.random() * Math.PI * 2
    };

    setSimulationState(prev => ({
      ...prev,
      fireSpots: [...prev.fireSpots, newFireSpot],
      fireSat: {
        ...prev.fireSat,
        fireSpots: [...prev.fireSat.fireSpots, newFireSatSpot]
      }
    }));
  };

  const updateWeather = (weather: SimulationState['weather']) => {
    setSimulationState(prev => ({
      ...prev,
      weather
    }));
  };

  const toggleSprinkler = (sprinklerIndex: number) => {
    setSimulationState(prev => ({
      ...prev,
      sprinklers: prev.sprinklers.map((sprinkler, index) => 
        index === sprinklerIndex 
          ? { ...sprinkler, isActive: !sprinkler.isActive }
          : sprinkler
      )
    }));
  };

  const updateSprinklerPressure = (sprinklerIndex: number, pressure: number) => {
    setSimulationState(prev => ({
      ...prev,
      sprinklers: prev.sprinklers.map((sprinkler, index) => 
        index === sprinklerIndex 
          ? { ...sprinkler, waterPressure: pressure }
          : sprinkler
      )
    }));
  };

  return {
    simulationState,
    updateSimulationState,
    addFireSpot,
    updateWeather,
    toggleSprinkler,
    updateSprinklerPressure
  };
} 