// инициализация сцены, камеры и рендера
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ antialias: true });

//рендер к элементу #three-canvas
let canvasContainer = document.getElementById("three-canvas");
renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
canvasContainer.appendChild(renderer.domElement);

let pointsMesh;
let originalPositions = [];
let targetPositions = [];
let currentPositions = [];
let mouseX = 0;
let mouseY = 0;
let animationProgress = 0; 
let initialAnimationDone = false; 
let mouseInteractionEnabled = false; 

let pointsGroup = new THREE.Object3D();

// загрузка джейсон
fetch('vertex_data.json')
  .then(response => response.json())
  .then(vertices => {
    let geometry = new THREE.BufferGeometry();
    let positions = new Float32Array(vertices.length * 3);
    let scale = 30; 
    vertices.forEach((v, i) => {
      positions[i * 3] = v.x * scale;
      positions[i * 3 + 1] = v.y * scale;
      positions[i * 3 + 2] = v.z * scale;
      originalPositions.push(new THREE.Vector3(v.x * scale, v.y * scale, v.z * scale));

      // разлет точек
      targetPositions.push(new THREE.Vector3(
        v.x * scale + (Math.random() - 0.5) * 500,
        v.y * scale + (Math.random() - 0.5) * 500,
        v.z * scale + (Math.random() - 0.5) * 500
      ));
    });

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    let material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.2 });
    pointsMesh = new THREE.Points(geometry, material);

    pointsGroup.add(pointsMesh);
    scene.add(pointsGroup);

    camera.position.z = 100;

    currentPositions = [...targetPositions]; 
    animate();
  })
  .catch(error => console.error("Ошибка загрузки JSON:", error));

let angleX = 0; 
let angleY = 0; 
let angleZ = 0; 
let rotationSpeed = 0.007; 

function animate() {
  requestAnimationFrame(animate);

  if (pointsMesh) {
    let positions = pointsMesh.geometry.attributes.position.array;

    if (!initialAnimationDone) {
      if (animationProgress < 1) {
        animationProgress += 0.01; 

        for (let i = 0; i < originalPositions.length; i++) {
          positions[i * 3] = THREE.MathUtils.lerp(currentPositions[i].x, originalPositions[i].x, animationProgress);
          positions[i * 3 + 1] = THREE.MathUtils.lerp(currentPositions[i].y, originalPositions[i].y, animationProgress);
          positions[i * 3 + 2] = THREE.MathUtils.lerp(currentPositions[i].z, originalPositions[i].z, animationProgress);
        }
      } else {
        initialAnimationDone = true; 

        //пауза перед включением мыши
        setTimeout(() => {
          mouseInteractionEnabled = true; //взаимодействие с мышью
        }, 8000);
      }
    } else if (mouseInteractionEnabled) {
      let centerX = window.innerWidth / 2;
      let centerY = window.innerHeight / 2;
      let distanceFromCenter = Math.sqrt(
        Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
      );

      if (distanceFromCenter < 350) {
        for (let i = 0; i < originalPositions.length; i++) {
          positions[i * 3] = THREE.MathUtils.lerp(positions[i * 3], originalPositions[i].x, 0.03);
          positions[i * 3 + 1] = THREE.MathUtils.lerp(positions[i * 3 + 1], originalPositions[i].y, 0.03);
          positions[i * 3 + 2] = THREE.MathUtils.lerp(positions[i * 3 + 2], originalPositions[i].z, 0.03);
        }
      } else {
        for (let i = 0; i < originalPositions.length; i++) {
          positions[i * 3] = THREE.MathUtils.lerp(positions[i * 3], targetPositions[i].x, 0.005);
          positions[i * 3 + 1] = THREE.MathUtils.lerp(positions[i * 3 + 1], targetPositions[i].y, 0.005);
          positions[i * 3 + 2] = THREE.MathUtils.lerp(positions[i * 3 + 2], targetPositions[i].z, 0.005);
        }
      }
    }

    pointsMesh.geometry.attributes.position.needsUpdate = true; 
  }

  angleX += rotationSpeed; 
  angleY += rotationSpeed; 
  angleZ += rotationSpeed; 

  const maxRotation = 10 * Math.PI / 180; 
  pointsGroup.rotation.x = Math.sin(angleX) * maxRotation;
  pointsGroup.rotation.y = Math.sin(angleY) * maxRotation;
  pointsGroup.rotation.z = Math.sin(angleZ) * maxRotation;

  renderer.render(scene, camera); 
}

//движения мыши
window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// адаптация рендера при изменении окна
window.addEventListener("resize", () => {
  camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
});
