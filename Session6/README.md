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


********************

## S5-MyExamples-01-CreativeObjects: *Creative objects by using if function*
#### In this example, I created 25 icosahedrons who showed their wireframe and defined them with random color, same position, same extending speed and different initial sizes. And when their size reaches to a certain value, they will turn back to an appropriate size.
![S5-MyExamples-01-CreativeObjects00](/Session5/(README)pictures/pic-2.png "S5-MyExamples-01-CreativeObjects00")
### Knowledge Points
1. How to set up the **wireframe**, **initial position**, **color**, and **rotate speed** are well explained in the previous sessions.

2. The *if function* in this exercise is basicly used for definine the range of  **changing speed** and **size** of those icosahedrons:
   * We can extract the codes which contain the **if function**:
   ```javascript
   var size = [];

   var thingssize = Math.random()* 10 * Math.PI/2;
   size.push(-thingssize);

   cubes.forEach(function(c, i) {
     c.scale.x = size[i];
     c.scale.y = size[i];
     c.scale.z = size[i];
     size[i] += 0.1;
   if (size[i] > 10) size[i] = -10;
   ```
   * __Math.random()* 10 * Math.PI/2__ is a range from [0,5PI), 5PI is about 15.70.
   * There is a __"-"__ before the "thingssize" in
     ```javascript
     size.push(-thingssize);
     ```
     which means the range of the array **size** is (-5PI,0], we can also take it as some range around (-15.70,0]
   * The code:
     ```javascript
     size[i] += 0.1;
     ```
     shows that the initial scale of those icosahedrons is random and those icosahedrons will keep growing, and we use the if function to limit the growing speed in cause their sizes become too big:
     ```javascript
     if (size[i] > 10) size[i] = -10;
     ```
     so that if the initial scale or the growing speed is too big or too fast, they will return to value *-10*, so we can always see those icosahedrons in the scene.
