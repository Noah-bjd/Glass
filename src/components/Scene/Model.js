import React, { useRef, useState } from 'react';
import { MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber';
import { useDrag } from 'react-use-gesture'; 

export default function Model() {
    const { nodes: nodes1 } = useGLTF("/medias/Donut.glb");
    const { nodes: nodes2 } = useGLTF("/medias/model.glb");
    const torus1 = useRef(null);
    const donut = useRef();
    const [position, setPosition] = useState([1.6, 1.4, -1]);
    const { size, viewport } = useThree();
    const aspect = size.width / viewport.width;

    useFrame(() => {
        torus1.current.rotation.x += 0.02;
        donut.current.rotation.y += 0.02;
    });

    const bind = useDrag(({ offset: [x, y]}) => {
        const [, , z] = position;
        setPosition([x / aspect, -y / aspect, z]);
        console.log('x:', x, 'y:', y, 'z:', z);
    }, 
    { pointerEvents: true }
    );
    const materialProps = {
        thickness:  0.2,
        roughness:  0, 
        transmission:  1,
        ior:  1.2, 
        chromaticAberration:  0.02,
        backside:  false ,
    };

    const materialProps1 = {
        thickness:  0.7,
        roughness:  0, 
        transmission:  1,
        ior:  1.2, 
        backside:  false ,
    };
    
    return (
        <group scale={viewport.width / 5.75}>
            <Text position={[0, 0, -1]} font='sans-serif' fontSize={0.5} color="white" anchorX="center" anchorY="middle">
                Little dark age!
            </Text>
            <mesh ref={torus1} {...nodes1.Torus002} scale={[0.8, 0.8, 0.8]} >
                <MeshTransmissionMaterial {...materialProps} />
            </mesh>
            <mesh ref={donut} {...nodes2.Sphere} {...bind()} position={position} scale={[0.1 ,0.1 ,0.1]}>
                <MeshTransmissionMaterial {...materialProps1} />
            </mesh>
        </group>
    );
}
