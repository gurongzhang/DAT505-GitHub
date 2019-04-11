var renderer, scene, camera, composer, planetMesh, skeletonMesh, particleMesh;
var effectGlitch, effectRGB, motion1, motion2;
var kaleidoParams, kaleidoPass;
var rgbPass, rgbParams;
var t1 = 0;
var t2 = 0;
var t3 = 0;

var glitchPass;

window.onload = function() {
  init();
  animate();
}

function updateOptions() {
  //var wildGlitch = document.getElementById( 'wildGlitch' );
  //glitchPass.goWild = wildGlitch.checked;
}

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0.0);
  document.getElementById('canvas').appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 400;
  scene.add(camera);

  planetObject = new THREE.Object3D();
  skeletonObject = new THREE.Object3D();
  particlesObject = new THREE.Object3D();

  scene.add(planetObject);
  scene.add(skeletonObject);
  scene.add(particlesObject);

  var particlesGeometry = new THREE.TetrahedronGeometry(2, 0);
  var planetGeometry = new THREE.IcosahedronGeometry(7, 1);
  var skeletonGeometry = new THREE.IcosahedronGeometry(15, 1);

  var particlesMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading
  });

  for (var i = 0; i < 1500; i++) {
    var particlesMesh = new THREE.Mesh(particlesGeometry, particlesMaterial);
    particlesMesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    particlesMesh.position.multiplyScalar(1 + (Math.random() * 700));
    particlesMesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    var randScale = Math.random() * 5;
    particlesMesh.scale.set(randScale, randScale, randScale);
    particlesObject.add(particlesMesh);
  }

  var planetMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading
  });

  var planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
  planetMesh.scale.x = planetMesh.scale.y = planetMesh.scale.z = 16;
  planetObject.add(planetMesh);

  var skeletonMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    wireframe: true,
    side: THREE.DoubleSide
  });

  var skeletonMesh = new THREE.Mesh(skeletonGeometry, skeletonMaterial);
  skeletonMesh.scale.x = skeletonMesh.scale.y = skeletonMesh.scale.z = 10;
  skeletonObject.add(skeletonMesh);

  var ambientLight = new THREE.AmbientLight(0x999999 );
  scene.add(ambientLight);

  var lights = [];
  lights[0] = new THREE.DirectionalLight( 0xffffff, 0.2 );
  lights[0].position.set( 1, 2, -0.5);
  lights[1] = new THREE.DirectionalLight( 0x11E8BB, 0.3 );
  lights[1].position.set( 1, -1, 0.5 );
  lights[2] = new THREE.DirectionalLight( 0x8200C9, 0.7 );
  lights[2].position.set( -1., -1, -0.1 );
  lights[3] = new THREE.DirectionalLight( 0x8200C9, 0.8 );
  lights[3].position.set( -1., 2, -1 );
  scene.add( lights[0] );
  scene.add( lights[1] );
  scene.add( lights[2] );
  scene.add( lights[3] );

  // postprocessing
  composer = new THREE.EffectComposer( renderer );
  //composer.addPass( new THREE.RenderPass( scene, camera ) );
  var renderPass = new THREE.RenderPass(scene, camera);

  rgbPass = new THREE.ShaderPass( THREE.HueSaturationShader);
  //rgbPass.uniforms[ 'amount' ].value = 0.005;
  //rgbPass.renderToScreen = true;
  composer.addPass ( renderPass );
  composer.addPass ( rgbPass );

  kaleidoPass = new THREE.ShaderPass (THREE.ToneMapShader);
  composer.addPass ( kaleidoPass );

  var glitchPass = new THREE.GlitchPass();
  glitchPass.renderToScreen = true;
  composer.addPass( glitchPass );

  rgbParams = {
    amount: 0.5,
    angle: 0.0
  }

  kaleidoParams = {
    sides: 2,
    angle: 0.0
  }

  //var shaderPass = new THREE.ShaderPass(THREE.ColorifyShader);
  //shaderPass.uniforms[ 'amount' ].value = 0.02;
  //shaderPass.renderToScreen = true;
  //composer.addPass( shaderPass);

  //var effectComposer = new EffectComposer(renderer);
  //composer.addPass(new EffectComposer.RenderPass(scene, camera));

  //var shaderFXAA = new EffectComposer.ShaderPass(fxaa());
  //shaderFXAA.renderToScreen = true;
  //composer.addPass(shaderFXAA);

  //composer.addPass(shaderPass);
  //effectRGB = new THREE.ShaderPass( THREE.RGBShiftShader );
  //effectRGB.uniforms[ 'amount' ].value = 0.02;
  //effectRGB.renderToScreen = true;

  //effectGlitch = new THREE.ShaderPass( THREE.DigitalGlitch );
  //effectGlitch.uniforms[ 'amount' ].value = 0.;
  //effectGlitch.uniforms[ 'distortion_x' ].value = Math.random();
  //effectGlitch.uniforms[ 'distortion_y' ].value = Math.random();
  //effectGlitch.uniforms[ 'angle' ].value = Math.random()+1;
  //effectGlitch.uniforms[ 'seed' ].value = Math.random();
  //effectGlitch.uniforms[ 'col_s' ].value = Math.random();
  //effectGlitch.uniforms[ 'seed_x' ].value = Math.random();
  //effectGlitch.uniforms[ 'seed_y' ].value = Math.random();
  //composer.addPass( effectGlitch );

  window.addEventListener('resize', onWindowResize, false);
};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize( window.innerWidth, window.innerHeight );
}

var reset = 0;

function animate(ts) {
  requestAnimationFrame(animate);
  //var delta = clock.getDelta()

  particlesObject.rotation.x += 0.0000;
  particlesObject.rotation.y -= 0.0040;
  planetObject.rotation.x -= 0.0020;
  planetObject.rotation.y -= 0.0030;
  skeletonObject.rotation.x -= 0.0010;
  skeletonObject.rotation.y += 0.0020;
  //renderer.clear();

  //renderer.render( scene, camera )
  composer.render(0.1);
};
