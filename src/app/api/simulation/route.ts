import { NextResponse } from 'next/server';

// Types for simulation parameters
type SimulationParams = {
  fireIntensity: number;
  precipitation: number;
  windSpeed: number;
  temperature: number;
  duration: number;
};

// Types for simulation results
type SimulationResults = {
  detectionTime: number;
  responseTime: number;
  containmentTime: number;
  affectedArea: number;
  waterUsed: number;
  retardantUsed: number;
  evacuationRequired: boolean;
  timeline: TimelineEvent[];
  success: boolean;
};

type TimelineEvent = {
  time: number;
  event: string;
  description: string;
};

// Simulation engine function
function runSimulation(params: SimulationParams): SimulationResults {
  const { fireIntensity, precipitation, windSpeed, temperature, duration } = params;
  
  // Calculate base detection time (in seconds)
  // Lower fire intensity takes longer to detect
  const baseDetectionTime = Math.max(30, 180 - (fireIntensity * 15));
  
  // Adjust detection time based on weather conditions
  let detectionTime = baseDetectionTime;
  detectionTime += precipitation * 10; // Rain makes smoke harder to detect
  detectionTime += Math.max(0, windSpeed - 10) * 5; // High winds can disperse smoke
  
  // Calculate system response time (in seconds)
  const responseTime = 60; // Fixed time for system to activate after detection
  
  // Calculate containment time based on fire intensity and weather
  let containmentTime = fireIntensity * 120; // Base time in seconds
  
  // Adjust containment time based on weather factors
  containmentTime += Math.max(0, temperature - 80) * 30; // Higher temps make containment harder
  containmentTime += Math.max(0, windSpeed - 5) * 60; // Wind makes containment harder
  containmentTime -= precipitation * 120; // Rain helps containment
  containmentTime = Math.max(containmentTime, 180); // Minimum containment time
  
  // Calculate affected area (in acres)
  // Base spread rate depends on fire intensity
  const baseSpreadRate = fireIntensity * 0.05; // acres per minute
  
  // Adjust spread rate based on weather
  let spreadRate = baseSpreadRate;
  spreadRate += (temperature - 70) * 0.002; // Higher temps increase spread
  spreadRate += windSpeed * 0.01; // Wind increases spread
  spreadRate -= precipitation * 0.1; // Rain reduces spread
  spreadRate = Math.max(spreadRate, 0.01); // Minimum spread rate
  
  // Calculate affected area before containment
  const timeToContainment = (detectionTime + responseTime + containmentTime) / 60; // convert to minutes
  const affectedArea = spreadRate * timeToContainment;
  
  // Calculate resources used
  const waterUsed = affectedArea * 5000; // gallons per acre
  const retardantUsed = fireIntensity > 5 ? affectedArea * 100 : 0; // gallons per acre, only for intense fires
  
  // Determine if evacuation is required
  const evacuationRequired = affectedArea > 1 || fireIntensity > 7;
  
  // Generate timeline events
  const timeline: TimelineEvent[] = [
    {
      time: 0,
      event: "Fire Ignition",
      description: "Fire detected by AI monitoring system"
    },
    {
      time: detectionTime,
      event: "Detection Confirmed",
      description: "AI system confirms fire detection and begins analysis"
    },
    {
      time: detectionTime + 30,
      event: "Drone Deployment",
      description: "Drones deployed to gather additional data"
    },
    {
      time: detectionTime + responseTime,
      event: "System Activation",
      description: "Sprinkler system activated with optimal settings"
    }
  ];
  
  // Add conditional events
  if (evacuationRequired) {
    timeline.push({
      time: detectionTime + responseTime + 15,
      event: "Community Notification",
      description: "Alerts sent to affected communities via NotifyLA"
    });
  }
  
  // Add containment event
  timeline.push({
    time: detectionTime + responseTime + containmentTime,
    event: "Fire Containment",
    description: "Fire contained through sprinkler system and fire department response"
  });
  
  // Determine success based on affected area
  const success = affectedArea < 2; // Less than 2 acres is considered successful containment
  
  return {
    detectionTime,
    responseTime,
    containmentTime,
    affectedArea,
    waterUsed,
    retardantUsed,
    evacuationRequired,
    timeline,
    success
  };
}

// API route handler
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fireIntensity, precipitation, windSpeed, temperature, duration } = body;
    
    // Validate inputs
    if (
      typeof fireIntensity !== 'number' || 
      typeof precipitation !== 'number' || 
      typeof windSpeed !== 'number' || 
      typeof temperature !== 'number' ||
      typeof duration !== 'number'
    ) {
      return NextResponse.json(
        { error: 'Invalid parameters. All parameters must be numbers.' },
        { status: 400 }
      );
    }
    
    // Run simulation
    const results = runSimulation({
      fireIntensity,
      precipitation,
      windSpeed,
      temperature,
      duration
    });
    
    // Return results
    return NextResponse.json(results);
  } catch (error) {
    console.error('Simulation error:', error);
    return NextResponse.json(
      { error: 'Failed to run simulation' },
      { status: 500 }
    );
  }
}

// GET handler for testing
export async function GET() {
  // Sample simulation with default parameters
  const sampleResults = runSimulation({
    fireIntensity: 5,
    precipitation: 0,
    windSpeed: 10,
    temperature: 85,
    duration: 60
  });
  
  return NextResponse.json(sampleResults);
}
