// Types for simulation engine
export interface FireSpot {
  x: number;
  y: number;
  intensity: number;
  spreadRate: number;
  direction: number;
}

export interface WeatherConditions {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
}

export interface Sprinkler {
  x: number;
  y: number;
  isActive: boolean;
  waterPressure: number;
}

export interface SimulationState {
  fireSpots: FireSpot[];
  weather: WeatherConditions;
  sprinklers: Sprinkler[];
} 