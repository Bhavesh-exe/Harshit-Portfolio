import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleTouchMove,
} from "./utils/mouseUtils";
import { setProgress } from "../Loading";
import { setCharTimeline, setAllTimeline } from "../utils/GsapScroll";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  useEffect(() => {
    if (canvasDiv.current) {
      let rect = canvasDiv.current.getBoundingClientRect();
      let container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
      camera.position.set(0, 0, 2.5);
      camera.updateProjectionMatrix();

      const clock = new THREE.Clock();
      const light = setLighting(scene);
      let progress = setProgress((value) => setLoading(value));

      const loader = new GLTFLoader();

      // Pivot for mouse-look rotation
      const pivot = new THREE.Object3D();
      scene.add(pivot);

      loader.load(
        "/models/char.glb",
        async (gltf) => {
          const character = gltf.scene;

          // Auto-fit: compute bounding box and scale/center the model
          const box = new THREE.Box3().setFromObject(character);
          const size = box.getSize(new THREE.Vector3());

          // Scale model to fill ~80% of the camera's view height
          // At FOV=45 and z=2.5, visible height = 2 * 2.5 * tan(22.5°) ≈ 2.07 units
          const visibleHeight = 2 * camera.position.z * Math.tan((camera.fov / 2) * (Math.PI / 180));
          const targetHeight = visibleHeight * 0.85;
          const scaleFactor = targetHeight / Math.max(size.y, size.z); // largest vertical dimension
          character.scale.setScalar(scaleFactor);

          // Re-center after scaling
          box.setFromObject(character);
          const newCenter = box.getCenter(new THREE.Vector3());
          character.position.sub(newCenter); // center model at origin

          pivot.add(character);

          await renderer.compileAsync(scene, camera);

          setCharTimeline(character, camera);
          setAllTimeline();

          progress.loaded().then(() => {
            setTimeout(() => {
              light.turnOnLights();
            }, 2500);
          });

          window.addEventListener("resize", () =>
            handleResize(renderer, camera, canvasDiv, character)
          );
        },
        undefined,
        (error) => {
          console.error("Error loading char.glb:", error);
        }
      );

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: number | undefined;
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = setTimeout(() => {
          element?.addEventListener("touchmove", (e: TouchEvent) =>
            handleTouchMove(e, (x, y) => (mouse = { x, y }))
          );
        }, 200);
      };
      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }

      const animate = () => {
        requestAnimationFrame(animate);

        // Mouse-look: rotate the whole model pivot instead of a head bone
        if (window.scrollY < 200) {
          const maxRot = Math.PI / 8;
          pivot.rotation.y = THREE.MathUtils.lerp(
            pivot.rotation.y,
            mouse.x * maxRot,
            interpolation.y
          );
          pivot.rotation.x = THREE.MathUtils.lerp(
            pivot.rotation.x,
            -mouse.y * 0.1,
            interpolation.x
          );
        }

        renderer.render(scene, camera);
      };
      animate();

      return () => {
        clearTimeout(debounce);
        scene.clear();
        renderer.dispose();
        document.removeEventListener("mousemove", onMouseMove);
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
        if (canvasDiv.current) {
          canvasDiv.current.removeChild(renderer.domElement);
        }
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
