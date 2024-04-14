'use client';
import { Canvas } from '@react-three/fiber'
import Model from './Model';
import { Environment } from '@react-three/drei'

export default function Index() {
  return (
    <Canvas style={{background: '#000000'}}>
        <Model />
        {/* <directionalLight intensity={2} position={[0, 2, 3]}/> */}
        <spotLight
      intensity={1.2}
      position={[30, 30, 50]}
      angle={0.2}
      penumbra={1}
      castShadow
    />
        <Environment preset="city" />
    </Canvas>
  )
}
