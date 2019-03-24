# DAT505-Session2
## Introduction:
#### Session2 is the deeper, further learning of Session1:
  * ### Creating multiple objects
  * ### Different materials
  * ### Multiple different geometries with different materials
  * ### How to copy the examples on the [Threejs Examples](https://threejs.org/examples/) website correctly  

## 00-GeometryExercise-SOLVED: *Multiple Cubes With Different Rotate Speeds*
#### In this example, 12 same-size cubes were placed in order with different rotate speeds and different rotate directions.
![12 Rotating Cubes](/Session2/(README)pictures/pic-0.png "12 Rotating Cubes")
### Knowledge Points
1. Since all cubes were using the *same geometry* and *same material*, we just needed to code the geometry and material **once**.
```javascript
var geometry = new THREE.BoxGeometry(100, 100, 100);
var material = new THREE.MeshLambertMaterial({
  color: '#D2BE82',
  lightMap: null,
  lightMapIntensity: 1,
  emissive: 0x000000,
  emissiveMap: null,
  emissiveIntensity: 1,
  specularMap: null
});
```
2. Due to the *different position* and *different rotate speed* each cube had, the mesh of those 12 cube should be defined **individually**. The constituents of all meshes are the *same(geometry and material)*. But the
```javascript
mesh.position.x
mesh.position.y
mesh.rotation.x
mesh.rotation.y
mesh.rotation.z
```
needed to be put with **different values**, especially the values of **ordered mesh positions** have to be calculated.
3. Add all 12 meshes to the scene.
4. Defining the rotate speeds under the **Render Loop**:
```javascript
var render = function () {
  requestAnimationFrame( render );
```

********************

## 01-BasicMaterials: *One Rotating Cubes With MeshBasicMaterial*
#### In this example, a rotating cube was created for us to change its material to see the differences between basic materials.
![Rotating Cube](/Session2/(README)pictures/pic-1.png "Rotating Cube")
### Knowledge Points
  * The characteristics of different materials are different, to see how to use basic materials properly, check: [Basic Materials](https://threejs.org/docs/index.html#api/en/materials/LineBasicMaterial).

********************

## 00-MyPractice-GeometriesAndMaterials: *Creating multiple objects With Different Materials*
#### In this exercise, we were asked to create kinds of objects with different geometries, materials and properties.
![GeometriesAndMaterials](/Session2/(README)pictures/pic-2.png "GeometriesAndMaterials")
### Knowledge Points
  * The capability of *reflecting light* is different between materials, so *the chosen of material* will decide how the object looks like as we can see in the picture. Meanwhile, we should also take this point under consideration when we adding lights in the scene.

********************

## 01-MyPractice-ThreeJS-Materials: *Copy the [Materials/transparency Example](https://threejs.org/examples/#webgl_materials_transparency) on [Threejs](https://threejs.org)*
#### For this exercise, we were asked to copy one example on [Threejs](https://threejs.org) and make it work on our computers.
![Transparency Example](/Session2/(README)pictures/pic-3.png "Transparency Example")
### Knowledge Points
I will put the copy process of this example here to give a clear demonstration of how to copy the example properly:
  1. *Download* the **data folder** on [Threejs](https://threejs.org), the name of the folder is **three-3.js-master-r102**
  ![Threejs Data Folder](/Session2/(README)pictures/pic-6.png "Threejs Data Folder")
  2. Go to that example and press *"View source"* in the lower right corner of the screen.
 ![Copy process1](/Session2/(README)pictures/pic-4.png "[Copy process1")
 and copy all the source code:
 ```javascript
 <!DOCTYPE html>
<html lang="en">
	<head>
		<title>threejs webgl - materials - transparency</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		<style>
			body {
				color: #fff;
				font-family:Monospace;
				font-size:13px;
				text-align:center;
				background-color: #000;
				margin: 0px;
				overflow: hidden;
			}
			a { color: #eee }
			#info {
				position: absolute;
				top: 0px; width: 100%;
				padding: 5px;
			}
		</style>
	</head>
	<body>

		<div id="container"></div>
		<div id="info"><a href="http://threejs.org" target="_blank" rel="noopener">threejs</a> - Transparency with Premultiplied Alpha (right) and without (left)<br /> using RGBA8 Buffers by <a href="http://clara.io/" target="_blank" rel="noopener">Ben Houston</a>.</div>

		<script src="../build/three.js"></script>
		<script src="js/controls/OrbitControls.js"></script>

		<script src="js/WebGL.js"></script>
		<script src="js/libs/stats.min.js"></script>

		<script src="js/libs/dat.gui.min.js"></script>

		<script>
			if ( WEBGL.isWebGLAvailable() === false ) {
				document.body.appendChild( WEBGL.getWebGLErrorMessage() );
			}
			var params = { opacity: 0.25 };
			var container, stats;
			var camera, scene, renderer, controls;
			init();
			animate();
			function init() {
				container = document.createElement( 'div' );
				document.body.appendChild( container );
				camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 2000 );
				camera.position.set( 0.0, 40, 40 * 3.5 );
				scene = new THREE.Scene();
				//
				var geometry = new THREE.SphereBufferGeometry( 18, 30, 30 );
				var material1 = new THREE.MeshStandardMaterial( {
					opacity: params.opacity,
					transparent: true
				} );
				var material2 = new THREE.MeshStandardMaterial( {
					opacity: params.opacity,
					premultipliedAlpha: true,
					transparent: true
				} );
				var textureLoader = new THREE.TextureLoader();
				textureLoader.load( "textures/hardwood2_diffuse.jpg", function ( map ) {
					map.anisotropy = 8;
					material1.map = map;
					material1.needsUpdate = true;
					material2.map = map;
					material2.needsUpdate = true;
				} );
				var textureLoader = new THREE.TextureLoader();
				textureLoader.load( "textures/hardwood2_roughness.jpg", function ( map ) {
					map.anisotropy = 8;
					material1.roughnessMap = map;
					material1.needsUpdate = true;
					material2.roughnessMap = map;
					material2.needsUpdate = true;
				} );
				var mesh = new THREE.Mesh( geometry, material1 );
				mesh.position.x = - 25.0;
				scene.add( mesh );
				var mesh = new THREE.Mesh( geometry, material2 );
				mesh.position.x = 25.0;
				scene.add( mesh );
				//
				var geometry = new THREE.PlaneBufferGeometry( 800, 800 );
				var material = new THREE.MeshStandardMaterial( { color: 0x333333 } );
				var mesh = new THREE.Mesh( geometry, material );
				mesh.position.y = - 50;
				mesh.rotation.x = - Math.PI * 0.5;
				scene.add( mesh );
				// Lights
				var spotLight = new THREE.SpotLight( 0xff8888 );
				spotLight.position.set( 100, 200, 100 );
				spotLight.angle = Math.PI / 6;
				spotLight.penumbra = 0.9;
				scene.add( spotLight );
				var spotLight = new THREE.SpotLight( 0x8888ff );
				spotLight.position.set( - 100, - 200, - 100 );
				spotLight.angle = Math.PI / 6;
				spotLight.penumbra = 0.9;
				scene.add( spotLight );
				//
				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.shadowMap.enabled = true;
				container.appendChild( renderer.domElement );
				renderer.gammaInput = true;
				renderer.gammaOutput = true;
				stats = new Stats();
				container.appendChild( stats.dom );
				controls = new THREE.OrbitControls( camera, renderer.domElement );
				window.addEventListener( 'resize', onWindowResize, false );
				var gui = new dat.GUI();
				gui.add( params, 'opacity', 0, 1 ).onChange( function () {
					material1.opacity = params.opacity;
					material2.opacity = params.opacity;
				} );
				gui.open();
			}
			function onWindowResize() {
				var width = window.innerWidth;
				var height = window.innerHeight;
				camera.aspect = width / height;
				camera.updateProjectionMatrix();
				renderer.setSize( width, height );
			}
			//
			function animate() {
				requestAnimationFrame( animate );
				stats.begin();
				render();
				stats.end();
			}
			function render() {
				for ( var i = 0, l = scene.children.length; i < l; i ++ ) {
					var object = scene.children[ i ];
					if ( object.geometry instanceof THREE.SphereBufferGeometry ) {
						object.rotation.x = performance.now() * 0.0002;
						object.rotation.y = - performance.now() * 0.0002;
					}
				}
				renderer.render( scene, camera );
			}
		</script>
	</body>
</html>
 ```

  3. *Create* a **new file**(for example: ThreejsExampleCopy)

    *Add* **'build' folder**, **'js' folder** and **'index.html' file** into this new **'ThreejsExampleCopy' file**.

    *Add* **index.js** file into **js** file.
    ![Copy process2](/Session2/(README)pictures/pic-5.png "[Copy process2")

  4. *Copy* all the **View source code** into **index.html** file. Cut all the code between
  ```javascript
  <script>

  </script>
  ```
  and *paste* them into **js/index.js** file. So what remain in the **index.html** file would be:
  ```javascript
  <!DOCTYPE html>
<html lang="en">
	<head>
		<title>threejs webgl - materials - transparency</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		<style>
			body {
				color: #fff;
				font-family:Monospace;
				font-size:13px;
				text-align:center;
				background-color: #000;
				margin: 0px;
				overflow: hidden;
			}
			a { color: #eee }
			#info {
				position: absolute;
				top: 0px; width: 100%;
				padding: 5px;
			}
		</style>
	</head>
	<body>

		<div id="container"></div>
		<div id="info"><a href="http://threejs.org" target="_blank" rel="noopener">threejs</a> - Transparency with Premultiplied Alpha (right) and without (left)<br /> using RGBA8 Buffers by <a href="http://clara.io/" target="_blank" rel="noopener">Ben Houston</a>.</div>

		<script src="../build/three.js"></script>
		<script src="js/controls/OrbitControls.js"></script>

		<script src="js/WebGL.js"></script>
		<script src="js/libs/stats.min.js"></script>

		<script src="js/libs/dat.gui.min.js"></script>

		<script>

        </script>
	</body>
</html>
  ```
  And the pasted code in **js/index.js** would be:
  ```javascript
  if ( WEBGL.isWebGLAvailable() === false ) {
				document.body.appendChild( WEBGL.getWebGLErrorMessage() );
			}
			var params = { opacity: 0.25 };
			var container, stats;
			var camera, scene, renderer, controls;
			init();
			animate();
			function init() {
				container = document.createElement( 'div' );
				document.body.appendChild( container );
				camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 2000 );
				camera.position.set( 0.0, 40, 40 * 3.5 );
				scene = new THREE.Scene();
				//
				var geometry = new THREE.SphereBufferGeometry( 18, 30, 30 );
				var material1 = new THREE.MeshStandardMaterial( {
					opacity: params.opacity,
					transparent: true
				} );
				var material2 = new THREE.MeshStandardMaterial( {
					opacity: params.opacity,
					premultipliedAlpha: true,
					transparent: true
				} );
				var textureLoader = new THREE.TextureLoader();
				textureLoader.load( "textures/hardwood2_diffuse.jpg", function ( map ) {
					map.anisotropy = 8;
					material1.map = map;
					material1.needsUpdate = true;
					material2.map = map;
					material2.needsUpdate = true;
				} );
				var textureLoader = new THREE.TextureLoader();
				textureLoader.load( "textures/hardwood2_roughness.jpg", function ( map ) {
					map.anisotropy = 8;
					material1.roughnessMap = map;
					material1.needsUpdate = true;
					material2.roughnessMap = map;
					material2.needsUpdate = true;
				} );
				var mesh = new THREE.Mesh( geometry, material1 );
				mesh.position.x = - 25.0;
				scene.add( mesh );
				var mesh = new THREE.Mesh( geometry, material2 );
				mesh.position.x = 25.0;
				scene.add( mesh );
				//
				var geometry = new THREE.PlaneBufferGeometry( 800, 800 );
				var material = new THREE.MeshStandardMaterial( { color: 0x333333 } );
				var mesh = new THREE.Mesh( geometry, material );
				mesh.position.y = - 50;
				mesh.rotation.x = - Math.PI * 0.5;
				scene.add( mesh );
				// Lights
				var spotLight = new THREE.SpotLight( 0xff8888 );
				spotLight.position.set( 100, 200, 100 );
				spotLight.angle = Math.PI / 6;
				spotLight.penumbra = 0.9;
				scene.add( spotLight );
				var spotLight = new THREE.SpotLight( 0x8888ff );
				spotLight.position.set( - 100, - 200, - 100 );
				spotLight.angle = Math.PI / 6;
				spotLight.penumbra = 0.9;
				scene.add( spotLight );
				//
				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.shadowMap.enabled = true;
				container.appendChild( renderer.domElement );
				renderer.gammaInput = true;
				renderer.gammaOutput = true;
				stats = new Stats();
				container.appendChild( stats.dom );
				controls = new THREE.OrbitControls( camera, renderer.domElement );
				window.addEventListener( 'resize', onWindowResize, false );
				var gui = new dat.GUI();
				gui.add( params, 'opacity', 0, 1 ).onChange( function () {
					material1.opacity = params.opacity;
					material2.opacity = params.opacity;
				} );
				gui.open();
			}
			function onWindowResize() {
				var width = window.innerWidth;
				var height = window.innerHeight;
				camera.aspect = width / height;
				camera.updateProjectionMatrix();
				renderer.setSize( width, height );
			}
			//
			function animate() {
				requestAnimationFrame( animate );
				stats.begin();
				render();
				stats.end();
			}
			function render() {
				for ( var i = 0, l = scene.children.length; i < l; i ++ ) {
					var object = scene.children[ i ];
					if ( object.geometry instanceof THREE.SphereBufferGeometry ) {
						object.rotation.x = performance.now() * 0.0002;
						object.rotation.y = - performance.now() * 0.0002;
					}
				}
				renderer.render( scene, camera );
			}
  ```

  5. Find all files in the code form
  ```javascript
  <script src="file directory"></script>
  ```
  ![Copy process3](/Session2/(README)pictures/pic-8.png "[Copy process3")
in **three-3.js-master-r102** folder and *copy* them into each **js** or **build** folder
![Copy process4](/Session2/(README)pictures/pic-7.png "[Copy process4")
