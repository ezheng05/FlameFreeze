export interface RiskZone {
  id: string;
  name: string;
  riskLevel: number;
  // Add other properties as needed
}

export interface FireEvent {
  id: string;
  location: string;
  severity: number;
  // Add other properties as needed
}

export interface WaterSource {
  id: string;
  capacity: number;
  location: {
    x: number;
    y: number;
    z: number;
  };
}

export interface Sprinkler {
  id: string;
  location: {
    x: number;
    y: number;
    z: number;
  };
  isActive: boolean;
  coverage: number;
}

export interface SprinklerSystem {
  sources: WaterSource[];
  sprinklers: Sprinkler[];
  getSystemCapacity(): number;
  activateSprinklers(fireLocation: { x: number; y: number; z: number }): void;
}

export interface WeatherConditions {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  precipitation: number;
}

export interface FireSpot {
  id: string;
  location: {
    x: number;
    y: number;
    z: number;
  };
  intensity: number;
  spreadRate: number;
  timestamp: number;
}

export interface Drone {
  id: string;
  location: {
    x: number;
    y: number;
    z: number;
  };
  status: 'idle' | 'patrolling' | 'responding' | 'maintenance';
  batteryLevel: number;
}

export interface DroneSystem {
  drones: Drone[];
  getActiveDrones(): Drone[];
  deployDrone(location: { x: number; y: number; z: number }): void;
}

export interface SystemHealth {
  status: 'operational' | 'degraded' | 'critical';
  lastCheck: number;
  issues: string[];
}

export interface SimulationState {
  timestamp: number;
  fireSpots: FireSpot[];
  weatherConditions: WeatherConditions;
  sprinklerSystem: SprinklerSystem;
  droneSystem: DroneSystem;
  systemHealth: SystemHealth;
}

export interface SimulationConfig {
  weatherConditions: WeatherConditions;
  sprinklerSystem: {
    sources: WaterSource[];
    sprinklers: Sprinkler[];
  };
  droneSystem?: {
    drones: Drone[];
  };
} 