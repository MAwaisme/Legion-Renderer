import "./App.css";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, Html, OrbitControls, Stage } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense, useEffect, useRef, useState } from "react";

const Model = () => {

  const modelRef = useRef();

  let val = window.location.href;
  val = new URL(val);
  var modelUrl = val.searchParams.get("id");


  const localModl = useLoader(GLTFLoader, "https://models.readyplayer.me/63bd22c325903a9ffc56f09f.glb");
  const localModl1 = useLoader(GLTFLoader, modelUrl);


  const [mdlURL, setMdlURL] = useState(null);

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  console.log("🚀 ~ file: App.js ~ line 16 ~ LegionModal ~ modelUrl", localModl)


  // Load the 3D model
  const loader = new GLTFLoader();

  loader.load(modelUrl, (gltf) => {
    console.log('checking...', modelUrl, modelUrl);
    const model = gltf.scene;
    // Add the loaded model to the ref
    modelRef.current = model;
    console.log('checking...111111', modelUrl, modelUrl);
  });

  useEffect(() => {
    if (!modelRef.current) {
      setMdlURL(localModl);
    }
    else if (modelUrl) {
      setMdlURL(modelUrl);
    }
    else {
      setMdlURL(localModl);
    }
  }, [modelUrl])


  return (
    <>
      {!modelUrl ?
        <primitive object={localModl1 ? localModl1?.scene : localModl.scene} scale={1} />
        :
        <>
          {modelUrl ?
            <primitive object={localModl1 ? localModl1?.scene : localModl.scene} scale={1} />
            :
            <Html style={{ width: '100%', height: '400px' }}>
              <b className='loading-text' style={{ width: '100px', display: 'flex' }}>Please wait it's takeing a time...</b>
            </Html>
          }
        </>
      }
    </>
  );
};

export default function App() {
  return (
    <div className="App">
      <Canvas className={'modalCanvas'}>
        <ambientLight intensity={0.80} />
        <Suspense fallback={<Html style={{ width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><b className='loading-text'>Loading...</b></Html>}>
          <Stage environment={'city'} intensity={'0.6'}>
            <Model scale={[0.1, 0.1, 0.1]} />
          </Stage>
          <OrbitControls />
          <Environment preset="city" background />
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={true} autoRotate />
      </Canvas>
    </div>
  );
}
