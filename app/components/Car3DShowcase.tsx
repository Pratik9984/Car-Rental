"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Compass } from "lucide-react";

// --- APPLE PRODUCT FINISHES ---
const PAINT_COLORS = [
  { name: "Space Black", hex: "#1c1d21", display: "bg-[#1c1d21]" },
  { name: "Silver Titanium", hex: "#e3e4e6", display: "bg-[#e3e4e6] border border-gray-300" },
  { name: "Gold Titanium", hex: "#f4e0c8", display: "bg-[#f4e0c8]" },
  { name: "Pacific Blue", hex: "#2f4c5a", display: "bg-[#2f4c5a]" },
  { name: "Deep Violet", hex: "#3b2d4a", display: "bg-[#3b2d4a]" },
];

const CAR_MODELS = [
  { id: "porsche", name: "Porsche 911 GT3", defaultColor: "#cc1111", desc: "Classic rear-engine track icon with whale-tail aerodynamics." },
  { id: "ferrari", name: "Ferrari F8 Tributo", defaultColor: "#cc1111", desc: "Aggressive mid-engine supercar with deep splitters and side air ducts." },
  { id: "lambo", name: "Lamborghini Huracán", defaultColor: "#20bf6b", desc: "Ultra-low, sharp angular wedge profile with aggressive ground stance." },
  { id: "tesla", name: "Tesla Roadster", defaultColor: "#00a8ff", desc: "Modern, aerodynamic futuristic capsule with glass canopy and clean lines." },
  { id: "mercedes", name: "Mercedes-AMG GT", defaultColor: "#2f3640", desc: "Long front hood, set-back cabin, and classic muscular grand tourer profile." },
  { id: "bentley", name: "Bentley Continental", defaultColor: "#dcdde1", desc: "Stately, muscular luxury cruiser with bold grille and dual headlights." },
];

export default function Car3DShowcase() {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // --- CONFIG STATE ---
  const [selectedModel, setSelectedModel] = useState(CAR_MODELS[0]);
  const [paintColor, setPaintColor] = useState(PAINT_COLORS[0]);
  const [driveSpeed, setDriveSpeed] = useState(30); 
  const [autoRotate, setAutoRotate] = useState(true);
  const [engineOn, setEngineOn] = useState(true);
  
  // --- REFS FOR THREE.JS ---
  const sceneRef = useRef<any>(null);
  const carGroupRef = useRef<any>(null);
  const bodyPaintMaterialRef = useRef<any>(null);
  const wheelsRef = useRef<any[]>([]);
  const headlightsRef = useRef<any[]>([]);
  const headlightMeshesRef = useRef<any[]>([]);
  const roadLinesRef = useRef<any>(null);
  
  // --- CAMERA INTERACTION ---
  const rotationState = useRef({
    isDragging: false,
    x: 0.22, 
    y: -0.6, 
    zoom: 6.6,
    prevX: 0,
    prevY: 0,
  });

  // --- ACTIONS -> THREE.JS UPDATE ---
  // Color Sync
  useEffect(() => {
    if (bodyPaintMaterialRef.current) {
      bodyPaintMaterialRef.current.color.set(paintColor.hex);
    }
  }, [paintColor]);

  // Engine Headlight Sync
  useEffect(() => {
    headlightsRef.current.forEach((light) => {
      light.visible = engineOn;
    });
    headlightMeshesRef.current.forEach((mesh) => {
      const mat = mesh.material as any;
      mat.color.set(engineOn ? 0xffffff : 0xcccccc);
    });
  }, [engineOn]);

  // Model Morphing / Rebuilding
  useEffect(() => {
    if (sceneRef.current && carGroupRef.current) {
      rebuildCarModel(selectedModel.id);
    }
  }, [selectedModel]);

  // --- REBUILD CAR GEOMETRIES DYNAMICALLY ---
  const rebuildCarModel = (modelId: string) => {
    const carGroup = carGroupRef.current;
    if (!carGroup) return;

    // 1. Clear old child meshes safely
    while (carGroup.children.length > 0) {
      const obj = carGroup.children[0];
      carGroup.remove(obj);
      
      // Dispose geometry & materials
      if (obj instanceof THREE.Mesh) {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m: any) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      } else if (obj instanceof THREE.Group) {
        obj.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.geometry) child.geometry.dispose();
            if (child.material) child.material.dispose();
          }
        });
      }
    }

    // Reset references
    wheelsRef.current = [];
    headlightsRef.current = [];
    headlightMeshesRef.current = [];

    // 2. Standard Shared Materials
    const bodyPaintMat = new THREE.MeshStandardMaterial({
      color: paintColor.hex,
      metalness: 0.9,
      roughness: 0.12,
    });
    bodyPaintMaterialRef.current = bodyPaintMat;

    const trimMat = new THREE.MeshStandardMaterial({
      color: 0x1d1d1f, // Apple Charcoal
      metalness: 0.7,
      roughness: 0.3,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x1d1d1f,
      transparent: true,
      opacity: 0.3,
      roughness: 0.02,
      transmission: 0.95,
      thickness: 0.8,
    });

    const tireMat = new THREE.MeshStandardMaterial({ color: 0x2c2c2e, roughness: 0.85 });
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xe5e5ea, metalness: 0.95, roughness: 0.1 });

    // 3. MORPH GEOMETRIES BASED ON VEHICLE MODEL
    let baseGeo: any;
    let cabinGeo: any;
    let hoodGeo: any;
    
    let basePos = new THREE.Vector3(0, 0.28, 0);
    let cabinPos = new THREE.Vector3(-0.35, 0.65, 0);
    let hoodPos = new THREE.Vector3(1.5, 0.3, 0);
    let spoilerPos = new THREE.Vector3(-2.0, 0.43, 0);
    let spoilerRotation = 0.08;
    
    let hasHighWing = false;
    let hasSideAirDucts = false;
    let hasClassicRoundLights = false;
    let hasBigGrille = false;

    // Define wheel offset vectors
    let frontWheelX = 1.25;
    let rearWheelX = -1.2;
    let wheelZ = 0.92;
    let wheelScale = 0.35; // default wheel size

    switch (modelId) {
      case "porsche": // Curved whale tail, engine back, round lights
        baseGeo = new THREE.BoxGeometry(4.1, 0.3, 1.85);
        cabinGeo = new THREE.SphereGeometry(0.8, 32, 16); // Rounder cabin
        cabinPos.set(-0.5, 0.55, 0);
        hoodGeo = new THREE.BoxGeometry(1.2, 0.2, 1.8);
        hoodPos.set(1.4, 0.28, 0);
        hasHighWing = true; // Whale tail spoiler
        spoilerPos.set(-1.8, 0.45, 0);
        hasClassicRoundLights = true;
        break;

      case "ferrari": // Low-slung supercar, sharp, S-ducts, side intakes
        baseGeo = new THREE.BoxGeometry(4.3, 0.24, 1.95); // Low profile
        cabinGeo = new THREE.BoxGeometry(1.9, 0.42, 1.4);
        cabinPos.set(-0.3, 0.58, 0);
        hoodGeo = new THREE.BoxGeometry(1.4, 0.16, 1.85);
        hoodPos.set(1.45, 0.22, 0);
        hasSideAirDucts = true;
        hasHighWing = true; // Supercar race wing
        spoilerPos.set(-2.0, 0.62, 0);
        break;

      case "lambo": // Angular wedge profile, forward cabin
        baseGeo = new THREE.BoxGeometry(4.4, 0.22, 2.0); // Sharp, extra-wide base
        cabinGeo = new THREE.BoxGeometry(1.95, 0.45, 1.45);
        cabinPos.set(-0.15, 0.55, 0); // Cab forward
        hoodGeo = new THREE.BoxGeometry(1.5, 0.18, 1.9);
        hoodPos.set(1.45, 0.21, 0);
        hasHighWing = true; 
        spoilerPos.set(-2.05, 0.66, 0);
        break;

      case "tesla": // Hyper-aerodynamic minimal fastback
        baseGeo = new THREE.BoxGeometry(4.1, 0.28, 1.85);
        cabinGeo = new THREE.BoxGeometry(1.9, 0.46, 1.35);
        cabinPos.set(-0.25, 0.65, 0);
        hoodGeo = new THREE.BoxGeometry(1.25, 0.18, 1.8);
        hoodPos.set(1.4, 0.27, 0);
        // Clean aero rear, zero spoiler wing
        break;

      case "mercedes": // Classic Grand Tourer: long hood, cabin set back
        baseGeo = new THREE.BoxGeometry(4.3, 0.32, 1.88);
        cabinGeo = new THREE.BoxGeometry(1.7, 0.46, 1.35);
        cabinPos.set(-0.7, 0.68, 0); // Cab pushed back
        hoodGeo = new THREE.BoxGeometry(1.9, 0.24, 1.82); // Massive long hood
        hoodPos.set(1.1, 0.35, 0);
        spoilerPos.set(-2.0, 0.45, 0);
        break;

      case "bentley": // Stately luxury cruiser, muscular frame, big wheels
        baseGeo = new THREE.BoxGeometry(4.4, 0.44, 2.0); // Bulky muscular base
        basePos.set(0, 0.32, 0);
        cabinGeo = new THREE.BoxGeometry(2.0, 0.52, 1.5);
        cabinPos.set(-0.4, 0.78, 0);
        hoodGeo = new THREE.BoxGeometry(1.6, 0.32, 1.95);
        hoodPos.set(1.3, 0.46, 0);
        hasBigGrille = true;
        hasClassicRoundLights = true;
        wheelScale = 0.4; // Massive Bentley rims
        break;

      default:
        baseGeo = new THREE.BoxGeometry(4.2, 0.3, 1.85);
        cabinGeo = new THREE.BoxGeometry(1.85, 0.48, 1.35);
        hoodGeo = new THREE.BoxGeometry(1.5, 0.2, 1.8);
    }

    // --- RENDER MESHES ---
    // A. Main Chassis Base
    const baseMesh = new THREE.Mesh(baseGeo, bodyPaintMat);
    baseMesh.position.copy(basePos);
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    carGroup.add(baseMesh);

    // B. Windshield / Cabin Glass
    const cabinMesh = new THREE.Mesh(cabinGeo, glassMat);
    cabinMesh.position.copy(cabinPos);
    cabinMesh.castShadow = true;
    carGroup.add(cabinMesh);

    // C. Hood / Nose
    const hoodMesh = new THREE.Mesh(hoodGeo, bodyPaintMat);
    hoodMesh.position.copy(hoodPos);
    if (modelId === "lambo" || modelId === "ferrari") {
      hoodMesh.rotation.z = -0.09; // Shaper supercar angle
    } else {
      hoodMesh.rotation.z = -0.05;
    }
    hoodMesh.castShadow = true;
    carGroup.add(hoodMesh);

    // D. Grille & Intakes
    if (hasBigGrille) {
      const grilleGeo = new THREE.BoxGeometry(0.08, 0.4, 1.2);
      const grilleMat = new THREE.MeshStandardMaterial({ color: 0xe5e5ea, metalness: 0.95, roughness: 0.1 });
      const grille = new THREE.Mesh(grilleGeo, grilleMat);
      grille.position.set(2.1, 0.46, 0);
      carGroup.add(grille);
    }

    if (hasSideAirDucts) {
      const ductGeo = new THREE.BoxGeometry(0.1, 0.2, 0.4);
      const ductMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
      
      const ductL = new THREE.Mesh(ductGeo, ductMat);
      ductL.position.set(1.4, 0.25, 0.96);
      carGroup.add(ductL);

      const ductR = ductL.clone();
      ductR.position.z = -0.96;
      carGroup.add(ductR);
    }

    // E. Headlights / Optics
    const lightBulbGeo = hasClassicRoundLights 
      ? new THREE.CylinderGeometry(0.08, 0.08, 0.03, 16) // Porsche/Bentley classic round
      : new THREE.BoxGeometry(0.04, 0.04, 0.22); // Tesla/Lambo sharp laser-leds

    const lightBulbMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    
    const headlightL = new THREE.Mesh(lightBulbGeo, lightBulbMat);
    if (hasClassicRoundLights) {
      headlightL.rotation.z = Math.PI / 2;
      headlightL.position.set(2.0, 0.4, 0.6);
    } else {
      headlightL.position.set(2.01, 0.3, 0.58);
    }
    carGroup.add(headlightL);
    headlightMeshesRef.current.push(headlightL);

    const headlightR = headlightL.clone();
    headlightR.position.z = -headlightL.position.z;
    carGroup.add(headlightR);
    headlightMeshesRef.current.push(headlightR);

    // Dynamic light cones
    const spotL = new THREE.SpotLight(0xffffff, 4, 12, Math.PI / 8, 0.45, 1.0);
    spotL.position.set(2.05, headlightL.position.y, headlightL.position.z);
    spotL.target.position.set(6, 0.1, headlightL.position.z);
    carGroup.add(spotL);
    carGroup.add(spotL.target);
    headlightsRef.current.push(spotL);

    const spotR = new THREE.SpotLight(0xffffff, 4, 12, Math.PI / 8, 0.45, 1.0);
    spotR.position.set(2.05, headlightL.position.y, -headlightL.position.z);
    spotR.target.position.set(6, 0.1, -headlightL.position.z);
    carGroup.add(spotR);
    carGroup.add(spotR.target);
    headlightsRef.current.push(spotR);

    // F. Spoiler Wing configurations
    if (modelId === "tesla") {
      // Tesla has zero spoiler - perfectly smooth
    } else if (hasHighWing) {
      // High racing spoiler wing (Ferrari/Lambo/Porsche whale tail)
      const wSupportGeo = new THREE.BoxGeometry(0.1, 0.45, 1.4);
      const wSupport = new THREE.Mesh(wSupportGeo, trimMat);
      wSupport.position.set(spoilerPos.x + 0.1, spoilerPos.y - 0.2, 0);
      carGroup.add(wSupport);

      const wBladeGeo = new THREE.BoxGeometry(0.38, 0.05, 1.95);
      const wBlade = new THREE.Mesh(wBladeGeo, bodyPaintMat);
      wBlade.position.copy(spoilerPos);
      wBlade.rotation.z = -0.06;
      wBlade.castShadow = true;
      carGroup.add(wBlade);
    } else {
      // Elegant minimal Lip Spoiler (Mercedes/Bentley)
      const spoilerGeo = new THREE.BoxGeometry(0.18, 0.05, 1.8);
      const spoiler = new THREE.Mesh(spoilerGeo, trimMat);
      spoiler.position.copy(spoilerPos);
      spoiler.rotation.z = spoilerRotation;
      spoiler.castShadow = true;
      carGroup.add(spoiler);
    }

    // G. Wheels (Alloys + Tires)
    const wheelPositions = [
      { x: frontWheelX, z: wheelZ },
      { x: frontWheelX, z: -wheelZ },
      { x: rearWheelX, z: wheelZ },
      { x: rearWheelX, z: -wheelZ },
    ];

    wheelPositions.forEach((pos) => {
      const wGroup = new THREE.Group();
      wGroup.position.set(pos.x, wheelScale - 0.07, pos.z);

      const tireGeo = new THREE.CylinderGeometry(wheelScale, wheelScale, 0.23, 32);
      const tire = new THREE.Mesh(tireGeo, tireMat);
      tire.rotation.x = Math.PI / 2;
      tire.castShadow = true;
      wGroup.add(tire);

      const rimGeo = new THREE.CylinderGeometry(wheelScale - 0.1, wheelScale - 0.1, 0.25, 16);
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.rotation.x = Math.PI / 2;
      wGroup.add(rim);

      // Clean spokes structure
      const spokeCount = modelId === "bentley" ? 6 : 4;
      for (let s = 0; s < spokeCount; s++) {
        const spokeGeo = new THREE.BoxGeometry(0.04, wheelScale * 2 - 0.14, 0.04);
        const spoke = new THREE.Mesh(spokeGeo, rimMat);
        spoke.rotation.z = (s * Math.PI * 2) / spokeCount;
        wGroup.add(spoke);
      }

      carGroup.add(wGroup);
      wheelsRef.current.push(wGroup);
    });

    // Make sure states sync
    if (bodyPaintMaterialRef.current) {
      bodyPaintMaterialRef.current.color.set(paintColor.hex);
    }
    headlightsRef.current.forEach((light) => {
      light.visible = engineOn;
    });
    headlightMeshesRef.current.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.color.set(engineOn ? 0xffffff : 0xcccccc);
    });
  };

  // --- INITIALIZE THREE.JS ---
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // 1. SCENE - Set to Apple's clean `#f5f5f7`
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color("#f5f5f7");
    scene.fog = new THREE.FogExp2("#f5f5f7", 0.1);

    // 2. CAMERA
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(4, 2, 6);

    // 3. RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // 4. LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.95);
    dirLight1.position.set(5, 12, 5);
    dirLight1.castShadow = true;
    dirLight1.shadow.mapSize.width = 1024;
    dirLight1.shadow.mapSize.height = 1024;
    dirLight1.shadow.bias = -0.0006;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.45); 
    dirLight2.position.set(-6, 3, -6);
    scene.add(dirLight2);

    // 5. EMPTY INITIAL CAR GROUP (WILL BE REBUILT ON SELECTED MODEL)
    const carGroup = new THREE.Group();
    scene.add(carGroup);
    carGroupRef.current = carGroup;

    // Trigger initial build
    rebuildCarModel(selectedModel.id);

    // 6. MINIMAL GROUND DESIGN
    const roadLines = new THREE.Group();
    scene.add(roadLines);
    roadLinesRef.current = roadLines;

    for (let k = -12; k <= 12; k += 4) {
      const lineGeo = new THREE.BoxGeometry(0.4, 0.004, 0.03);
      const lineMat = new THREE.MeshBasicMaterial({ color: 0xd1d1d6 });
      const lineMesh = new THREE.Mesh(lineGeo, lineMat);
      lineMesh.position.set(k, 0.001, 0);
      roadLines.add(lineMesh);
    }

    const gridHelper = new THREE.GridHelper(30, 24, 0xe5e5ea, 0xe5e5ea);
    gridHelper.position.y = 0.001;
    scene.add(gridHelper);

    const floorGeo = new THREE.PlaneGeometry(50, 50);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.05 });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // --- INTERACTIVE MOUSE/TOUCH ---
    const handlePointerDown = (e: PointerEvent) => {
      rotationState.current.isDragging = true;
      rotationState.current.prevX = e.clientX;
      rotationState.current.prevY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!rotationState.current.isDragging) return;
      const deltaX = e.clientX - rotationState.current.prevX;
      const deltaY = e.clientY - rotationState.current.prevY;
      
      rotationState.current.y -= deltaX * 0.004;
      rotationState.current.x = Math.max(0.08, Math.min(0.75, rotationState.current.x + deltaY * 0.0035));
      
      rotationState.current.prevX = e.clientX;
      rotationState.current.prevY = e.clientY;
    };

    const handlePointerUp = () => {
      rotationState.current.isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      rotationState.current.zoom = Math.max(4.5, Math.min(8.5, rotationState.current.zoom + e.deltaY * 0.0035));
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("pointerdown", handlePointerDown);
    domElement.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    domElement.addEventListener("wheel", handleWheel, { passive: false });

    // --- ANIMATION FRAME TICK ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Camera Orbit Spin
      if (!rotationState.current.isDragging && autoRotate) {
        rotationState.current.y += 0.06 * delta;
      }

      const zoom = rotationState.current.zoom;
      const pitch = rotationState.current.x;
      const yaw = rotationState.current.y;

      camera.position.x = carGroup.position.x + zoom * Math.sin(yaw) * Math.cos(pitch);
      camera.position.z = carGroup.position.z + zoom * Math.cos(yaw) * Math.cos(pitch);
      camera.position.y = carGroup.position.y + zoom * Math.sin(pitch);
      camera.lookAt(new THREE.Vector3(carGroup.position.x, carGroup.position.y + 0.15, carGroup.position.z));

      const speedFactor = engineOn ? driveSpeed / 100 : 0;

      // Spin tires
      wheelsRef.current.forEach((wheel) => {
        wheel.rotation.z += speedFactor * 8 * delta;
      });

      // Road moving
      if (roadLinesRef.current) {
        roadLinesRef.current.children.forEach((marker) => {
          marker.position.x -= speedFactor * 7 * delta;
          if (marker.position.x < -12) {
            marker.position.x = 12;
          }
        });
      }

      // Small hover vibration
      if (engineOn) {
        carGroup.position.y = Math.sin(elapsed * 30) * 0.002 * (0.4 + speedFactor);
      } else {
        carGroup.position.y = 0;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      
      domElement.removeEventListener("pointerdown", handlePointerDown);
      domElement.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      domElement.removeEventListener("wheel", handleWheel);
      
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      renderer.dispose();
      if (mountRef.current && domElement) {
        mountRef.current.removeChild(domElement);
      }
    };
  }, []);

  return (
    <div className="w-full bg-[#f5f5f7] text-[#1d1d1f] py-14 relative overflow-hidden flex flex-col items-center select-none font-sans antialiased">
      
      {/* 1. Header (Apple Style) */}
      <div className="text-center max-w-xl mx-auto mb-6 px-4 tracking-tight">
        <h2 className="text-3xl md:text-4xl font-semibold text-black tracking-tight leading-tight">
          Select your model and finish.
        </h2>
        <p className="text-gray-500 text-sm mt-2 font-normal leading-relaxed">
          WebGL Multi-Vehicle Configurator. Click a vehicle below to morph its 3D mesh.
        </p>
      </div>

      {/* 2. Apple-Style Model Selector Tab Bar */}
      <div className="z-20 w-[92%] max-w-2xl bg-white border border-[#d2d2d7]/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] rounded-2xl p-1 mb-8 flex flex-wrap justify-between items-center text-xs font-semibold">
        {CAR_MODELS.map((model) => (
          <button
            key={model.id}
            onClick={() => setSelectedModel(model)}
            className={`flex-grow md:flex-grow-0 px-4 py-2.5 rounded-xl transition duration-300 cursor-pointer ${
              selectedModel.id === model.id
                ? "bg-[#1d1d1f] text-white shadow-sm"
                : "text-gray-500 hover:text-black hover:bg-gray-50"
            }`}
          >
            {model.name.split(" ")[0]} <span className="hidden md:inline">{model.name.split(" ").slice(1).join(" ")}</span>
          </button>
        ))}
      </div>

      {/* 3. Viewport & Configurator Area */}
      <div className="w-full max-w-4xl mx-auto relative flex flex-col items-center">
        
        {/* Render Canvas */}
        <div className="w-full h-[320px] md:h-[420px] relative overflow-hidden flex justify-center items-center">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing z-10" />
          
          {/* Active Model Desc HUD Overlay */}
          <div className="absolute top-4 left-4 z-20 bg-white/70 backdrop-blur-md border border-[#d2d2d7]/40 rounded-2xl p-3.5 max-w-[240px] shadow-sm pointer-events-none text-left">
            <h4 className="font-bold text-xs uppercase tracking-wider text-black">{selectedModel.name}</h4>
            <p className="text-[10px] text-gray-500 mt-1 leading-normal font-medium">{selectedModel.desc}</p>
          </div>

          {/* Apple-style floating clean spin toggle */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`absolute bottom-4 right-4 z-20 p-2 rounded-full border transition text-xs font-semibold ${
              autoRotate 
                ? "bg-[#1d1d1f] border-[#1d1d1f] text-white" 
                : "bg-white/80 border-[#d2d2d7] text-[#1d1d1f] hover:bg-white"
            }`}
            title="Toggle cinematic rotation"
          >
            <Compass size={14} className={autoRotate ? "animate-spin" : ""} />
          </button>
        </div>

        {/* 4. Sleek Apple Store-style Configuration Bar */}
        <div className="z-20 w-[92%] max-w-xl bg-white border border-[#d2d2d7]/60 shadow-[0_8px_30px_rgba(0,0,0,0.03)] rounded-3xl px-8 py-5 mt-2 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Colors with Concentric Rings */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Exterior Finish</span>
            <div className="flex gap-3">
              {PAINT_COLORS.map((c, i) => (
                <button
                  key={i}
                  title={c.name}
                  onClick={() => setPaintColor(c)}
                  className={`w-6 h-6 rounded-full transition transform hover:scale-105 relative ${c.display} ${
                    paintColor.name === c.name 
                      ? "ring-2 ring-[#0071e3] ring-offset-2 ring-offset-white" 
                      : "ring-1 ring-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-medium text-[#1d1d1f] h-3">{paintColor.name}</span>
          </div>

          {/* Drive & Speed system */}
          <div className="flex flex-col items-center md:items-start gap-2 w-full md:w-auto">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Engine / Speed</span>
            
            <div className="flex items-center gap-3 w-full">
              <button
                onClick={() => setEngineOn(!engineOn)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider transition ${
                  engineOn 
                    ? "bg-[#0071e3] text-white" 
                    : "bg-gray-150 text-[#1d1d1f] border border-[#d2d2d7]"
                }`}
              >
                {engineOn ? "RUNNING" : "START"}
              </button>

              <div className="flex items-center gap-2 flex-grow md:w-28">
                <input
                  type="range"
                  min="0"
                  max="100"
                  disabled={!engineOn}
                  value={engineOn ? driveSpeed : 0}
                  onChange={(e) => setDriveSpeed(Number(e.target.value))}
                  className="w-full accent-[#0071e3] h-[3px] bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                />
                <span className="text-[10px] font-mono text-gray-500 w-8 text-right shrink-0">
                  {engineOn ? `${driveSpeed}%` : "0%"}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
