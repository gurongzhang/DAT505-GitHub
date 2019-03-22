# DAT505-Session1
## Introduction:
#### Session2 is the deeper, further learning of Session1:
  * ### Creating multiple objects
  * ### Different materials
  * ### Multiple different geometries with different materials
  * ### How to copy the examples on the [Threejs Examples](https://threejs.org/examples/) website correctly  

## 00-GeometryExercise-SOLVED: *Multiple Cubes With Different Rotate Speeds*
#### In this example, 12 same-size cubes were placed in order with different rotate speeds and different rotate directions.
![12 Rotating Cube](/Session2/pictures/pic-0.png "12 Rotating Cube")
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
![Rotating Cube](/Session2/pictures/pic-1.png "Rotating Cube")
### Knowledge Points
  * The characteristics of different materials are different, to see how to use basic materials properly, check: [Basic Materials](https://threejs.org/docs/index.html#api/en/materials/LineBasicMaterial).
