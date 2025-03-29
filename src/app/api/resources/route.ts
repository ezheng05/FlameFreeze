import { NextResponse } from 'next/server';

// Types for resource data
type FirefightingResource = {
  id: string;
  type: string;
  name: string;
  status: 'available' | 'deployed' | 'maintenance';
  location: {
    lat: number;
    lng: number;
  };
  capacity: number;
  personnel: number;
  lastUpdated: string;
};

type FireStation = {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  resources: string[]; // IDs of resources stationed here
  coverage: number; // Coverage radius in miles
};

type WaterSource = {
  id: string;
  type: 'reservoir' | 'tank' | 'hydrant' | 'natural';
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  capacity: number; // in gallons
  currentLevel: number; // percentage
};

type SprinklerSystem = {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  coverage: number; // Coverage radius in miles
  status: 'active' | 'standby' | 'maintenance';
  waterSource: string; // ID of connected water source
};

// Mock data for Los Angeles area
const firefightingResources: FirefightingResource[] = [
  {
    id: 'engine-01',
    type: 'engine',
    name: 'Engine 1',
    status: 'available',
    location: {
      lat: 34.052235,
      lng: -118.243683
    },
    capacity: 500,
    personnel: 4,
    lastUpdated: '2025-03-29T00:30:00Z'
  },
  {
    id: 'engine-02',
    type: 'engine',
    name: 'Engine 2',
    status: 'deployed',
    location: {
      lat: 34.073620,
      lng: -118.400352
    },
    capacity: 500,
    personnel: 4,
    lastUpdated: '2025-03-29T00:45:00Z'
  },
  {
    id: 'truck-01',
    type: 'truck',
    name: 'Truck 1',
    status: 'available',
    location: {
      lat: 34.090009,
      lng: -118.361744
    },
    capacity: 300,
    personnel: 6,
    lastUpdated: '2025-03-29T00:15:00Z'
  },
  {
    id: 'helicopter-01',
    type: 'helicopter',
    name: 'Air Ops 1',
    status: 'available',
    location: {
      lat: 34.018124,
      lng: -118.289490
    },
    capacity: 800,
    personnel: 3,
    lastUpdated: '2025-03-29T00:10:00Z'
  },
  {
    id: 'drone-01',
    type: 'drone',
    name: 'Scout Drone 1',
    status: 'deployed',
    location: {
      lat: 34.068661,
      lng: -118.445127
    },
    capacity: 0,
    personnel: 0,
    lastUpdated: '2025-03-29T01:00:00Z'
  },
  {
    id: 'drone-02',
    type: 'drone',
    name: 'Scout Drone 2',
    status: 'deployed',
    location: {
      lat: 34.105545,
      lng: -118.416669
    },
    capacity: 0,
    personnel: 0,
    lastUpdated: '2025-03-29T01:05:00Z'
  },
  {
    id: 'engine-03',
    type: 'engine',
    name: 'Engine 3',
    status: 'maintenance',
    location: {
      lat: 34.025922,
      lng: -118.396461
    },
    capacity: 500,
    personnel: 0,
    lastUpdated: '2025-03-28T22:30:00Z'
  },
  {
    id: 'thermite-01',
    type: 'robot',
    name: 'Thermite RS3',
    status: 'available',
    location: {
      lat: 34.052235,
      lng: -118.243683
    },
    capacity: 2500,
    personnel: 0,
    lastUpdated: '2025-03-29T00:30:00Z'
  }
];

const fireStations: FireStation[] = [
  {
    id: 'station-01',
    name: 'Fire Station 1 - Downtown',
    location: {
      lat: 34.052235,
      lng: -118.243683
    },
    resources: ['engine-01', 'thermite-01'],
    coverage: 3.5
  },
  {
    id: 'station-02',
    name: 'Fire Station 27 - Hollywood',
    location: {
      lat: 34.090009,
      lng: -118.361744
    },
    resources: ['truck-01'],
    coverage: 4.2
  },
  {
    id: 'station-03',
    name: 'Fire Station 37 - Westwood',
    location: {
      lat: 34.073620,
      lng: -118.400352
    },
    resources: ['engine-02'],
    coverage: 3.8
  },
  {
    id: 'station-04',
    name: 'Fire Station 58 - Palisades',
    location: {
      lat: 34.025922,
      lng: -118.396461
    },
    resources: ['engine-03'],
    coverage: 5.0
  },
  {
    id: 'station-05',
    name: 'Air Operations Facility',
    location: {
      lat: 34.018124,
      lng: -118.289490
    },
    resources: ['helicopter-01', 'drone-01', 'drone-02'],
    coverage: 25.0
  }
];

const waterSources: WaterSource[] = [
  {
    id: 'reservoir-01',
    type: 'reservoir',
    name: 'Summit Reservoir 1',
    location: {
      lat: 34.068661,
      lng: -118.445127
    },
    capacity: 50000,
    currentLevel: 82
  },
  {
    id: 'reservoir-02',
    type: 'reservoir',
    name: 'Summit Reservoir 2',
    location: {
      lat: 34.105545,
      lng: -118.416669
    },
    capacity: 50000,
    currentLevel: 78
  },
  {
    id: 'tank-01',
    type: 'tank',
    name: 'Storage Tank 1',
    location: {
      lat: 34.073620,
      lng: -118.400352
    },
    capacity: 25000,
    currentLevel: 95
  },
  {
    id: 'tank-02',
    type: 'tank',
    name: 'Storage Tank 2',
    location: {
      lat: 34.090009,
      lng: -118.361744
    },
    capacity: 25000,
    currentLevel: 88
  }
];

const sprinklerSystems: SprinklerSystem[] = [
  {
    id: 'sprinkler-01',
    name: 'Mandeville Canyon System',
    location: {
      lat: 34.068661,
      lng: -118.445127
    },
    coverage: 1.2,
    status: 'standby',
    waterSource: 'reservoir-01'
  },
  {
    id: 'sprinkler-02',
    name: 'Laurel Canyon System',
    location: {
      lat: 34.105545,
      lng: -118.416669
    },
    coverage: 1.5,
    status: 'standby',
    waterSource: 'reservoir-02'
  },
  {
    id: 'sprinkler-03',
    name: 'Bel Air System',
    location: {
      lat: 34.090009,
      lng: -118.361744
    },
    coverage: 1.0,
    status: 'maintenance',
    waterSource: 'tank-02'
  }
];

// High-risk areas
const highRiskAreas = [
  {
    id: 'risk-01',
    name: 'Mandeville Canyon',
    riskLevel: 85,
    location: {
      lat: 34.068661,
      lng: -118.445127
    },
    radius: 1.5
  },
  {
    id: 'risk-02',
    name: 'Laurel Canyon',
    riskLevel: 78,
    location: {
      lat: 34.105545,
      lng: -118.416669
    },
    radius: 1.2
  },
  {
    id: 'risk-03',
    name: 'Santa Monica Mountains',
    riskLevel: 92,
    location: {
      lat: 34.120000,
      lng: -118.500000
    },
    radius: 3.0
  },
  {
    id: 'risk-04',
    name: 'Brentwood',
    riskLevel: 65,
    location: {
      lat: 34.052235,
      lng: -118.473000
    },
    radius: 1.0
  },
  {
    id: 'risk-05',
    name: 'Bel-Air',
    riskLevel: 72,
    location: {
      lat: 34.090009,
      lng: -118.361744
    },
    radius: 1.3
  }
];

// API route handler
export async function GET() {
  try {
    // Combine all data into a single response
    const response = {
      firefightingResources,
      fireStations,
      waterSources,
      sprinklerSystems,
      highRiskAreas,
      lastUpdated: new Date().toISOString()
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching resource data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resource data' },
      { status: 500 }
    );
  }
}
