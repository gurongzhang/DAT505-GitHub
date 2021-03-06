# DAT505-Session1-Intro, Basic Scene, Geometry, Material, Mesh
## Introduction:
#### This session introduced some basic threejs knowledge about creating an object:
  * ### Basic Scene
  * ### Geometry
  * ### Material
  * ### Mesh
#### We studied how to demonstrate different visual effects and simple animations based on these concepts.
## S1-ClassExamples-00-Test: *Rotating Cube*
#### This is one example which shows a *cube* keeps *rotating* in the middle of the screen.
![Rotating Cube](/Session1-Intro,%20Basic%20Scene,%20Geometry,%20Material,%20Mesh/(README)pictures/pic-0.png "Rotating Cube")
### Knowledge Points
1. To setting a scene, there are some basic settings(scene, camera, renderer):
   ```javascript
   function init(){
     // Create an empty scene
     scene = new THREE.Scene();

     // Create a basic perspective camera --------------
     camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 300, 10000 );

     // Create a renderer with Antialiasing ------------
     renderer = new THREE.WebGLRenderer({antialias:true});

     // Configure renderer clear color
     renderer.setClearColor("#000000");

     // Configure renderer size
     renderer.setSize( window.innerWidth, window.innerHeight );

     // Append Renderer to DOM
     document.body.appendChild( renderer.domElement );
   }
   ```
   To know more precisely about how to create a scene, go to [Three.js-Creating a scene](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)
2. [Three.js](https://threejs.org) is a website that has a whole bunch of interesting featured projects using threejs to code.
 * **Documentation** and **Examples** have all the definitions and code which are very fundamental for reference.
  * The **js source files** that shows in the "*view source*" of each example need to be copied to the *local js file* from the __three-3.js-master-r102__ file which on the *Desktop*.
  ![view source](/Session1-Intro%2C%20Basic%20Scene%2C%20Geometry%2C%20Material%2C%20Mesh/(README)pictures/pic-1.png "view source")
    ![three-3.js-master-r102](/Session1-Intro%2C%20Basic%20Scene%2C%20Geometry%2C%20Material%2C%20Mesh/(README)pictures/pic-2.png "three-3.js-master-r102")
3. **Mesh** is one significant element when creating an object. Each mesh includes two elemtents — **geometry** and **material**.
  * **Geometry** has different categories(to view more:*Threejs.org - documentation -  [Geometries](https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry))*
 ![Geometries Categories](/Session1-Intro%2C%20Basic%20Scene%2C%20Geometry%2C%20Material%2C%20Mesh/(README)pictures/pic-3.png "Geometries Categories")

    There are different kinds of **Material** too(to view more: *Threejs.org - documentation -  [Materials](https://threejs.org/docs/index.html#api/en/materials/LineBasicMaterial))*
![Materials Categories](/Session1-Intro%2C%20Basic%20Scene%2C%20Geometry%2C%20Material%2C%20Mesh/(README)pictures/pic-4.png "Materials Categories")

4. Do not forget to *add the mesh to the scene*
```javascript
scene.add( mesh );
```

********************


## S1-MyExamples-00-TestX: *Creating New Rotating Object*
#### This project did some changes based on the *00-Test* and demonstrates one rotating *IcosahedronGeometry* with *pink background color*.
![rotating IcosahedronGeometry with pink background color](/Session1-Intro%2C%20Basic%20Scene%2C%20Geometry%2C%20Material%2C%20Mesh/(README)pictures/pic-5-.png "rotating IcosahedronGeometry with pink background color")
### Knowledge Points
1. Different *geometry* and *material* has different **Constructor** and **Properties** which can be checked on the (*[Threejs documentation](https://threejs.org/docs)*)
 * For example : The **constructor** of *BoxGeometry*
 ![The constructor of BoxGeometry](/Session1-Intro%2C%20Basic%20Scene%2C%20Geometry%2C%20Material%2C%20Mesh/(README)pictures/pic-7.png "The constructor of BoxGeometry")
 compares to the **constructor** of *IcosahedronGeometry*
  ![The constructor of IcosahedronGeometry](/Session1-Intro%2C%20Basic%20Scene%2C%20Geometry%2C%20Material%2C%20Mesh/(README)pictures/pic-8.png "The constructor of IcosahedronGeometry")
  The **properties** of *MeshBasicMaterial*
    ![The properties of MeshBasicMaterial](/Session1-Intro%2C%20Basic%20Scene%2C%20Geometry%2C%20Material%2C%20Mesh/(README)pictures/pic-9.png "The properties of MeshBasicMaterial")
    compares to the **properties** of *MeshNormalMaterial*
        ![The properties of MeshNormalMaterial](/Session1-Intro%2C%20Basic%20Scene%2C%20Geometry%2C%20Material%2C%20Mesh/(README)pictures/pic-10.png "The properties of MeshNormalMaterial")
 CONCLUSION:what values should be put when defining one geometry or one material is **not** always the same. Some of them may share a few of constructors or properties, but **checking the documentation** is still necessary considering different particular cases.
 * The *documentation* will also shows what **specific kind of number**(interger,float,etc) that needs to be put for the *constructor* and *property*.
2. For setting different __colors__:
 * All color should be represented by using **Hex color code**. For example:
 ```javascript
 material = new THREE.MeshBasicMaterial( { color: "#FFDAB9" } );
 ```
 * Do the quick check of [Hex color code](https://www.cnblogs.com/summary-2017/p/7504126.html).

********************

 ## S1-MyExamples-01-ObjectsCombination: *Combination of different objects*
 #### The content of the exercise:
 ![Exercise Content](/Session1-Intro%2C%20Basic%20Scene%2C%20Geometry%2C%20Material%2C%20Mesh/(README)pictures/pic-12.png "Exercise Content")
 ### The final look of my exercise:
 ![00-MyPractice](/Session1-Intro%2C%20Basic%20Scene%2C%20Geometry%2C%20Material%2C%20Mesh/(README)pictures/pic-11.png "00-MyPractice")
 ### Analysis:
 1. Setting two icosahedrons which have the *same position* in the scene but with *different sizes* and *materials*.
 ```javascript
 geometry = new THREE.IcosahedronGeometry( radius, 1 );
material = new THREE.MeshPhysicalMaterial( { color: "#FF1493" } );
geometry1 = new THREE.IcosahedronGeometry( radius*2, 1 );
 material1 = new THREE.MeshBasicMaterial( { wireframe: true } );
 ```
 2. Using **wireframe** property in the *material* to show the wireframe of the icosahedrons.
 ```javascript
 wireframe: true
 ```
 3. Giving different rotate speed of x, y, z to both icosahedrons.
  ```javascript
   mesh.rotation.y += 0.04;
   mesh.rotation.z += 0.01;
   mesh.rotation.x += 0.03;
   mesh1.rotation.y -= 0.03;
   mesh1.rotation.z -= 0.01;
   mesh1.rotation.x -= 0.04;
 ```
    * The larger the number is, the faster that  the mesh will rotate.
