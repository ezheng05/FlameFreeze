// integration-bridge.ts
// This file serves as a central connection point between different components

import type { SimulationState, WeatherConditions } from '@/lib/SimulationEngine';

// Types for component communication
export interface SystemStatus {
  isActive: boolean;
  sprinklersActive: number;
  waterReserveLevel: number;
  lastUpdated: Date;
}

// Error types
export class SystemIntegrationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SystemIntegrationError';
  }
}

// State management with validation
class SystemStateManager {
  private simulationState: SimulationState | null = null;
  private systemStatus: SystemStatus = {
    isActive: false,
    sprinklersActive: 0,
    waterReserveLevel: 85,
    lastUpdated: new Date()
  };

  private validateSimulationState(state: SimulationState): boolean {
    if (!state.fireSpots || !Array.isArray(state.fireSpots)) {
      throw new SystemIntegrationError('Invalid fire spots data');
    }
    if (!state.weather || typeof state.weather !== 'object') {
      throw new SystemIntegrationError('Invalid weather data');
    }
    return true;
  }

  private validateSystemStatus(status: Partial<SystemStatus>): boolean {
    if (status.waterReserveLevel !== undefined && 
        (status.waterReserveLevel < 0 || status.waterReserveLevel > 100)) {
      throw new SystemIntegrationError('Water reserve level must be between 0 and 100');
    }
    if (status.sprinklersActive !== undefined && status.sprinklersActive < 0) {
      throw new SystemIntegrationError('Active sprinklers cannot be negative');
    }
    return true;
  }

  updateSimulationState(state: SimulationState): void {
    try {
      this.validateSimulationState(state);
      this.simulationState = state;
      
      // Update system status based on simulation state
      if (state.fireSpots.length > 0) {
        this.systemStatus = {
          ...this.systemStatus,
          isActive: true,
          sprinklersActive: Math.min(state.fireSpots.length * 2, 12),
          lastUpdated: new Date()
        };
      } else {
        this.systemStatus = {
          ...this.systemStatus,
          isActive: false,
          sprinklersActive: 0,
          lastUpdated: new Date()
        };
      }
    } catch (error) {
      console.error('Error updating simulation state:', error);
      throw error;
    }
  }

  updateSystemStatus(status: Partial<SystemStatus>): void {
    try {
      this.validateSystemStatus(status);
      this.systemStatus = {
        ...this.systemStatus,
        ...status,
        lastUpdated: new Date()
      };
    } catch (error) {
      console.error('Error updating system status:', error);
      throw error;
    }
  }

  getSimulationState(): SimulationState | null {
    return this.simulationState;
  }

  getSystemStatus(): SystemStatus {
    return { ...this.systemStatus };
  }
}

// Create a singleton instance
const systemStateManager = new SystemStateManager();

// Export functions for external use
export const updateSimulationState = (state: SimulationState): void => 
  systemStateManager.updateSimulationState(state);

export const updateSystemStatus = (status: Partial<SystemStatus>): void =>
  systemStateManager.updateSystemStatus(status);

export const getSimulationState = (): SimulationState | null =>
  systemStateManager.getSimulationState();

export const getSystemStatus = (): SystemStatus =>
  systemStateManager.getSystemStatus();

export function calculateFireRiskLevel(weather: WeatherConditions): number {
  const temperatureFactor = (weather.temperature - 20) / 30; // Normalize temperature impact
  const humidityFactor = (100 - weather.humidity) / 100; // Lower humidity = higher risk
  const windFactor = weather.windSpeed / 30; // Normalize wind impact

  // Weighted combination of factors
  return Math.min(100, (
    temperatureFactor * 0.4 +
    humidityFactor * 0.4 +
    windFactor * 0.2
  ) * 100);
}
