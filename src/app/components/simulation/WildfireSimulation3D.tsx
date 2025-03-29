"use client";

import dynamic from 'next/dynamic';
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useSimulationIntegration } from './integration-bridge';
// @ts-ignore
import * as THREE from 'three';

interface RiskZone {
  coordinates: [number, number];
  riskLevel: number;
}

interface FireEvent {
  coordinates: [number, number];
  intensity: number;
  status: 'active' | 'inactive' | 'extinguished';
}

interface Sprinkler {
  coordinates: [number, number];
  status: 'active' | 'inactive';
  waterFlow: number;
}

interface SimulationState {
  riskZones: RiskZone[];
  fireEvents: FireEvent[];
  sprinklers: Sprinkler[];
}

// Helper function to get color based on risk level
function getRiskColor(riskLevel: number): string {
  if (riskLevel >= 0.8) return '#ff0000'; // High risk
  if (riskLevel >= 0.5) return '#ffa500'; // Medium risk
  return '#00ff00'; // Low risk
}

// Loading component to display while textures are loading
function LoadingScreen() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
      <div className="text-white text-lg">Loading simulation data...</div>
    </div>
  );
}

// Simulation scene separated into its own component
function SimulationScene() {
  const integration = useSimulationIntegration();
  const simulationState = integration as unknown as SimulationState;
  const { scene } = useThree();
  
  // Using a safer approach to textures with error handling
  const [fireTexture, setFireTexture] = useState<THREE.Texture | null>(null);
  const [waterTexture, setWaterTexture] = useState<THREE.Texture | null>(null);
  const [groundTexture, setGroundTexture] = useState<THREE.Texture | null>(null);
  const [loaded, setLoaded] = useState(false);
  
  // Load textures manually instead of using useTexture hook
  useEffect(() => {
    if (typeof window === 'undefined') return; // Skip texture loading during SSR
    
    const textureLoader = new THREE.TextureLoader();
    
    const loadTexture = (path: string): Promise<THREE.Texture> => {
      return new Promise((resolve, reject) => {
        textureLoader.load(
          path, 
          (texture: THREE.Texture) => resolve(texture),
          undefined,
          (error: unknown) => reject(error)
        );
      });
    };
    
    Promise.all([
      loadTexture('/textures/fire.png').catch(() => {
        console.warn("Fire texture failed to load, using placeholder");
        return createFallbackTexture('#ff4500');
      }),
      loadTexture('/textures/water.png').catch(() => {
        console.warn("Water texture failed to load, using placeholder");
        return createFallbackTexture('#0066ff');
      }),
      loadTexture('/textures/ground.png').catch(() => {
        console.warn("Ground texture failed to load, using placeholder");
        return createFallbackTexture('#2c5530');
      })
    ]).then(([fire, water, ground]) => {
      setFireTexture(fire);
      setWaterTexture(water);
      setGroundTexture(ground);
      setLoaded(true);
    });
  }, []);
  
  // Create a fallback colored texture
  const createFallbackTexture = (color: string): THREE.Texture => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    return new THREE.CanvasTexture(canvas);
  };
  
  // Add lights
  useEffect(() => {
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);
    
      return () => {
      scene.remove(ambientLight);
      scene.remove(directionalLight);
    };
  }, [scene]);
  
  if (!loaded) {
    return null; // Will be handled by the Suspense fallback
  }

    return (
    <>
      {/* Ground plane with texture */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial 
          map={groundTexture}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Risk Zones */}
      {simulationState.riskZones.map((zone: RiskZone, index: number) => (
        <mesh key={`zone-${index}`} position={[zone.coordinates[0], 0, zone.coordinates[1]]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial 
            color={getRiskColor(zone.riskLevel)}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}

      {/* Fire Events */}
      {simulationState.fireEvents.map((fire: FireEvent, index: number) => (
        <mesh key={`fire-${index}`} position={[fire.coordinates[0], 0, fire.coordinates[1]]}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial 
            color={fire.status === 'active' ? '#ff4400' : '#666666'}
            emissive={fire.status === 'active' ? '#ff4400' : '#000000'}
            emissiveIntensity={fire.status === 'active' ? 1 : 0}
          />
        </mesh>
      ))}

      {/* Sprinklers */}
      {simulationState.sprinklers.map((sprinkler: Sprinkler, index: number) => (
        <group key={`sprinkler-${index}`} position={[sprinkler.coordinates[0], 0, sprinkler.coordinates[1]]}>
          <mesh>
            <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
            <meshStandardMaterial color={sprinkler.status === 'active' ? '#00ff00' : '#666666'} />
          </mesh>
          {sprinkler.status === 'active' && (
            <mesh position={[0, 2, 0]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1} />
            </mesh>
          )}
        </group>
      ))}
    </>
  );
}

// Separate client component for the Canvas
const SimulationCanvas = dynamic(() => Promise.resolve(() => (
  <Canvas camera={{ position: [0, 50, 100], fov: 60 }}>
    <Suspense fallback={<LoadingScreen />}>
      <SimulationScene />
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={50}
        maxDistance={200}
      />
      <Environment preset="sunset" />
    </Suspense>
  </Canvas>
)), {
  ssr: false,
});

// Main component
const WildfireSimulation3D = () => {
  return (
    <div className="w-full h-[600px] bg-gray-900 rounded-lg overflow-hidden">
      <Suspense fallback={<LoadingScreen />}>
        <SimulationCanvas />
      </Suspense>
      <div className="absolute top-0 left-0 p-4 text-white text-xs">
        Wildfire Simulation v1.0
                    </div>
                  </div>
  );
};

export default WildfireSimulation3D;