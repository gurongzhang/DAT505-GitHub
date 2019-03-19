# DAT505-Session1
## 00-Test *Rotating Cube*
This is one example which shows a cube keeps rotating in the middle of the screen.
![Rotating Cube](/Users/gurongzhang/Desktop/DAT505-GitHub/Session1/pictures/pic-0.png "Rotating Cube")
### Knowledge Points
1. [Three.js](https://threejs.org) is a website that has a whole bunch of interesting featured projects using threejs to code.
 * **Documentation** and **Examples** have all the definitions and code which are very fundamental for reference.
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
