const scene = new THREE.Scene();
   scene.background = new THREE.Color(0x000000);
   
   const camera = new THREE.PerspectiveCamera(
     60,
     window.innerWidth / window.innerHeight,
     0.1,
     1000
   );
   camera.position.set(0, 0, 0);
   // デバッグ用に
   const axesHelper = new THREE.AxesHelper(5);
   scene.add(axesHelper);
   
   const debugBox = new THREE.Mesh(
     new THREE.BoxGeometry(1,1,1),
     new THREE.MeshBasicMaterial({ color: 0xff0000 })
   );
   debugBox.position.set(0, 0.5, 0);
   scene.add(debugBox);
   
   const renderer = new THREE.WebGLRenderer({ antialias: true });
   renderer.setSize(window.innerWidth, window.innerHeight);
   document.body.appendChild(renderer.domElement);
   
   /* ==============================
      3. ポストプロセス(EffectComposer)設定
      ============================== */
   const composer = new EffectComposer(renderer);
   composer.addPass(new RenderPass(scene, camera));
   
   // Bloom エフェクトを追加
   const bloomPass = new UnrealBloomPass(
     new THREE.Vector2(window.innerWidth, window.innerHeight),
     2,  // strength
     1,  // radius
     0.9  // threshold
   );
   composer.addPass(bloomPass);
   
   /* ==============================
      4. 丘 (Plane + ディスプレイスメント) を用意
      ============================== */
   // Planeを細かく分割したGeometry
   const planeGeo = new THREE.PlaneGeometry(20, 20, 200, 200);
   
   // ディスプレイスメント用のシェーダマテリアル(カスタムシェーダ)
   const hillVertexShader = `
     uniform float time;
   
     // SimplexNoise / PerlinNoise を書いても良いが、ここでは簡易的なノイズ関数を置く
     // 参考：glsl の Perlin noise 実装など
     float pseudoNoise(vec2 p) {
       return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453);
     }
   
     varying vec3 vNormal;
     varying vec2 vUv;
   
     void main() {
       vUv = uv;
   
       // uvsに基づいて擬似ノイズを作り、頂点を上下に変位させる
       float n = pseudoNoise(uv * 10.0 + time * 0.1);
       float displacement = n * 2.0;
   
       vec3 newPosition = position + normal * displacement;
       gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
   
       // 法線をvaryingでフラグメントシェーダに渡す
       vNormal = normal;
     }
   `;
   
   const hillFragmentShader = `
     varying vec3 vNormal;
     varying vec2 vUv;
   
     void main() {
       // 簡単なグラデーション
       float intensity = dot(normalize(vNormal), vec3(0.0, 1.0, 0.0)) * 0.5 + 0.5;
       // 中心にいくほど少し色相を変える等、自由にカスタム
       gl_FragColor = vec4(0.1, 0.3 + intensity*0.3, 0.6, 1.0);
     }
   `;
   
   const hillUniforms = {
     time: { value: 0 }
   };
   
   const hillMaterial = new THREE.ShaderMaterial({
     vertexShader: hillVertexShader,
     fragmentShader: hillFragmentShader,
     uniforms: hillUniforms,
     side: THREE.DoubleSide,
     // ライン等とのブレンドを際立たせるため
     transparent: false
   });
   
   const planeMesh = new THREE.Mesh(planeGeo, hillMaterial);
   // PlaneはデフォルトでXY平面。回転させてXZ平面に
   planeMesh.rotation.x = -Math.PI / 2;
   scene.add(planeMesh);
   
   /* ==============================
      5. 流れる線(パーティクル)を実装
      ============================== */
   
   // ▼まず頂点シェーダ＆フラグメントシェーダを用意
   const particleVertexShader = `
     uniform float time;
     // パーティクルの初期位置
     attribute vec3 initialPosition;
   
     // 擬似的に定義したノイズ
     float pseudoNoise3D(vec3 p) {
       return fract(sin(dot(p, vec3(12.9898,78.233, 37.425))) * 43758.5453);
     }
   
     void main() {
       // 基本ポジション
       vec3 pos = initialPosition;
   
       // time と初期位置でノイズを作り、流れを演出
       // 例えば y 方向に下がりつつ、x,z をノイズで揺らす
       float t = time * 0.2;
       
       // 下方向へ流す
       pos.y -= t * 2.0;
   
       // 周期的にリセット（下に行きすぎたら上に戻す）
       float modY = mod(pos.y, 20.0); // 20.0単位で折り返す
       pos.y = modY;
   
       // x,z もノイズで少し揺らす
       float nx = pseudoNoise3D(vec3(initialPosition.x, t, initialPosition.z));
       float nz = pseudoNoise3D(vec3(initialPosition.z, initialPosition.x, t));
       pos.x += (nx - 0.5) * 0.5; 
       pos.z += (nz - 0.5) * 0.5;
   
       gl_PointSize = 2.0;
       gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
     }
   `;
   
   const particleFragmentShader = `
     void main() {
       // 中心が強めに発光する点スプライト。簡単に丸っぽくフェード
       vec2 coord = gl_PointCoord - 0.5;
       float dist = length(coord);
       float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
       // 青白く光らせる
       gl_FragColor = vec4(0.2, 0.6, 1.0, alpha);
     }
   `;
   
   // ▼パーティクル用のジオメトリを作成
   const particleCount = 30000;
   const positions = new Float32Array(particleCount * 3);
   
   // 初期配置を広い範囲にランダム生成
   for (let i = 0; i < particleCount; i++) {
     const x = (Math.random() - 0.5) * 20;
     const y = Math.random() * 20; // 0～20の間でランダム
     const z = (Math.random() - 0.5) * 20;
     positions[i * 3 + 0] = x;
     positions[i * 3 + 1] = y;
     positions[i * 3 + 2] = z;
   }
   
   // パーティクルジオメトリ
   const particleGeometry = new THREE.BufferGeometry();
   particleGeometry.setAttribute(
     'position',
     new THREE.BufferAttribute(positions, 3)
   );
   // シェーダ内で参照する attribute "initialPosition" を追加
   particleGeometry.setAttribute(
     'initialPosition',
     new THREE.BufferAttribute(positions, 3)
   );
   
   const particleUniforms = {
     time: { value: 0 }
   };
   
   const particleMaterial = new THREE.ShaderMaterial({
     vertexShader: particleVertexShader,
     fragmentShader: particleFragmentShader,
     uniforms: particleUniforms,
     blending: THREE.AdditiveBlending,
     depthTest: true,       // 必要に応じて false に
     depthWrite: false,     // 重なりを光っぽく見せるため
     transparent: true
   });
   
   const particlePoints = new THREE.Points(particleGeometry, particleMaterial);
   scene.add(particlePoints);
   
   /* ==============================
      6. アニメーションループ
      ============================== */
   function animate(t) {
     requestAnimationFrame(animate);
     
     // 時間を更新 (秒に変換)
     const elapsed = t * 0.001;
     hillUniforms.time.value = elapsed;
     particleUniforms.time.value = elapsed;
     
     // カメラやその他オブジェクトのアニメ等あればここで
   
     // 通常の描画ではなくcomposerでレンダリング
     composer.render();
   }
   animate();
   
   /* ==============================
      7. リサイズ対応
      ============================== */
   window.addEventListener('resize', onWindowResize);
   function onWindowResize() {
     const w = window.innerWidth;
     const h = window.innerHeight;
     camera.aspect = w / h;
     camera.updateProjectionMatrix();
     renderer.setSize(w, h);
     composer.setSize(w, h);
   }