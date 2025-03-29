import { ReactThreeFiber } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
      planeGeometry: ReactThreeFiber.Object3DNode<THREE.PlaneGeometry, typeof THREE.PlaneGeometry>;
      meshStandardMaterial: ReactThreeFiber.Object3DNode<THREE.MeshStandardMaterial, typeof THREE.MeshStandardMaterial>;
      meshBasicMaterial: ReactThreeFiber.Object3DNode<THREE.MeshBasicMaterial, typeof THREE.MeshBasicMaterial>;
      cylinderGeometry: ReactThreeFiber.Object3DNode<THREE.CylinderGeometry, typeof THREE.CylinderGeometry>;
      ambientLight: ReactThreeFiber.Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>;
      directionalLight: ReactThreeFiber.Object3DNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>;
    }
  }
} 