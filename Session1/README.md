# DAT505-Session1
## 00-Test *Rotating Cube*
#### This is one example which shows a *cube* keeps *rotating* in the middle of the screen.
![Rotating Cube](https://github.com/gurongzhang/DAT505-GitHub/blob/master/Session1/pictures/pic-0.png"Rotating Cube")
### Knowledge Points
1. [Three.js](https://threejs.org) is a website that has a whole bunch of interesting featured projects using threejs to code.
 ⋅⋅* **Documentation** and **Examples** have all the definitions and code which are very fundamental for reference.
  * The **js source files** that shows in the "*view source*" of each example need to be copied to the *local js file* from the __three-3.js-master-r102__ file which on the *Desktop*.
  ![view source](/Users/gurongzhang/Desktop/DAT505-GitHub/Session1/pictures/pic-1.png "view source")
    ![three-3.js-master-r102](/Users/gurongzhang/Desktop/DAT505-GitHub/Session1/pictures/pic-2.png "three-3.js-master-r102")
2. **Mesh** is one significant element when creating an object. Each mesh includes two elemtents — **geometry** and **material**.
  * **Geometry** has different categories(to view more:*Threejs.org - documentation -  [Geometries](https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry))*
 ![Geometries Categories](/Users/gurongzhang/Desktop/DAT505-GitHub/Session1/pictures/pic-3.png "Geometries Categories")
  There are different kinds of **Material** too(to view more: *Threejs.org - documentation -  [Materials](https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry))*
![Materials Categories](/Users/gurongzhang/Desktop/DAT505-GitHub/Session1/pictures/pic-4.png "Materials Categories")
3. Do not forget to *add the mesh to the scene*```
scene.add( mesh );
```
***
## 01-TestX *Creating New Rotating Object*
#### This project did some changes based on the *00-Test* and demonstrates one rotating *IcosahedronGeometry* with *pink background color*.
![rotating IcosahedronGeometry with pink background color](/Users/gurongzhang/Desktop/DAT505-GitHub/Session1/pictures/pic-5.png "rotating IcosahedronGeometry with pink background color")
### Knowledge Points
1. Different *geometry* and *material* has different **Constructor** and **Properties** which can be checked on the (*[Three.js](https://threejs.org) - documentation*)
 * For example : The **constructor** of *BoxGeometry*
 ![The constructor of BoxGeometry](/Users/gurongzhang/Desktop/DAT505-GitHub/Session1/pictures/pic-7.png "The constructor of BoxGeometry")
 compares to the **constructor** of *IcosahedronGeometry*
  ![The constructor of IcosahedronGeometry](/Users/gurongzhang/Desktop/DAT505-GitHub/Session1/pictures/pic-8.png "The constructor of IcosahedronGeometry")
  The **properties** of *MeshBasicMaterial*
    ![The properties of MeshBasicMaterial](/Users/gurongzhang/Desktop/DAT505-GitHub/Session1/pictures/pic-9.png "The properties of MeshBasicMaterial")
    compares to the **properties** of *MeshNormalMaterial*
        ![The properties of MeshNormalMaterial](/Users/gurongzhang/Desktop/DAT505-GitHub/Session1/pictures/pic-10.png "The properties of MeshNormalMaterial")
 CONCLUSION:what values should be put when defining one geometry or one material is **not** always the same. Some of them may share a few of constructors or properties, but **checking the documentation** is still necessary considering different particular cases.
 * The *documentation* will also shows what **specific kind of number**(interger,float,etc) that needs to be put for the *constructor* and *property*.
2. For setting different __colors__:
 * All color should be represented by using **Hex color code**. For example:
 ```
 material = new THREE.MeshBasicMaterial( { color: "#FFDAB9" } );
 ```
 * Do the quick check of [Hex color code](https://www.cnblogs.com/summary-2017/p/7504126.html).
