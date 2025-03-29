import { RiskZone, FireEvent } from '../types/simulation';

interface MapViewProps {
  riskZones: RiskZone[];
  activeEvents: FireEvent[];
  onFireDetected: (event: FireEvent) => void;
}

export function MapView({ riskZones, activeEvents, onFireDetected }: MapViewProps) {
  const handleFireDetected = (event: FireEvent) => {
    onFireDetected(event);
  };
} 