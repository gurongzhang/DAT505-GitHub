# DAT505-Session6
## Introduction:
#### This session introduced:
  * ### FirstPersonControls
  * ### setupWorld Function
  * ### THREE.GeometryUtils.merge(cityGeometry, building);
#### This session introduced some other controls and method to help us *'experience'* our project and organize massive objects effiently.
## S6-ClassExample-CityScape-full: *How to create random size objects effiently*
#### This is one example simulating a city space, and the 'buildings' are consist of randomly distributed cubes of random size. Furthermore, the **FirstPersonControls** is also added to let us *'experience'* this city space better.
![S6-ClassExample-CityScape-full00](/Session6/(README)pictures/pic-0.png "S6-ClassExample-CityScape-full00")
### Knowledge Points
1. [FirstPersonControls-00](https://www.2cto.com/kf/201803/734241.html) and [FirstPersonControls-01](https://blog.csdn.net/ithanmang/article/details/82351844) can offer some help to understand more about **FirstPersonControls**.

2. Since we need to create massive random-size cubes, in this example we use **cityGeometry** to organize those random-size buildings on account of the for loop:
   ```javascript
   //Geometry to store all buildings of the city
   var cityGeometry = new THREE.Geometry();
   for (var i = 0; i < 300; i++) {
     //Create geometry as a clone
     var building = new THREE.Mesh(geometry.clone());

     //Randomize position and scale of the buildings
     building.position.x = Math.floor( Math.random() * 200 - 100 ) * 4;
     building.position.z = Math.floor( Math.random() * 200 - 100 ) * 4;
     building.scale.x  = Math.pow(Math.random(), 2) * 50 + 10;
     building.scale.y  = Math.pow(Math.random(), 3) * building.scale.x * 8 + 8;
     building.scale.z  = building.scale.x;

     //Merge all buildings to one model - cityGeometry
     THREE.GeometryUtils.merge(cityGeometry, building);
   }

   //Mesh of the city
   var city = new THREE.Mesh(cityGeometry, material);
   scene.add(city);
   ```
   The comments explained everything very well as for reference.

********************

## S6-MyExamples-00-tryout: *Random-position cubes*
#### In this exercise, I tried to create massive cubes that appear randomly in the scene.
![S6-MyExamples-00-tryout00](/Session6/(README)pictures/pic-1.png "S6-MyExamples-00-tryout00")
### Knowledge Points
1. The notes about box BoxHelper:
   ![S6-MyExamples-00-tryout01](/Session6/(README)pictures/pic-2.png "S6-MyExamples-00-tryout01")
   Reference [Threejs-LineSegments](https://threejs.org/docs/index.html#api/en/objects/LineSegments)
2. Setting random position in the for loop:
   ```javascript
   mesh.position.x = Math.floor( Math.random() * 200 - 100 ) * 4;
   mesh.position.z = Math.floor( Math.random() * 200 - 100 ) * 4;
   mesh.position.y = Math.floor( Math.random() * 200 - 100 ) * 4;
   scene.add(mesh);
   ```
