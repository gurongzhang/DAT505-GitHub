# DAT505-Session7
## Introduction:
#### This session introduced:
  * ### How to load different textures randomly in the scene
  * ### How to transfer threejs 3D world coordinates to screen mouse coordinates
#### This session has abundant contents, some of them might not be easy to absorb, especially the transformation between 3D coordinates and mouse coordinates, but I will try my best to explaine them.
## S7-ClassExamples-00-Texture-Cube: *Loading random texures for the objects*
#### This example demonstrates how to make the object do the drop loop and change its initial position every time refresh the page. Another important part is to show how to load texture for the object.
![S7-ClassExamples-00-Texture-Cube00](/Session7/(README)pictures/pic-0.png "S7-ClassExamples-00-Texture-Cube00")
### Knowledge Points
1. First, to loading the texture, the following codes need to be added:
   ```javascript
   var texture;
   function init() {
   	texture = new THREE.TextureLoader().load( "texture.jpg" );
   ```
2. Secondly, to make it looks like 'drop', the y position needs to consistly change, and the x position needs to be randomized. Of course, all these codes should appear under the *animate function*:
   ```javascript
   function animate() {
   	requestAnimationFrame( animate );
   	//Move the mesh towards the bottom of the screen
   	mesh.position.y -= 0.2;
   	//If the mesh passes the bottom of the screen,make it appear on the top.
    //Also x position is randomized
   	if (mesh.position.y <- 30){
   		mesh.position.y = 35;
   		mesh.position.x = (Math.random() * -20) +10;
   	}
   }
   ```
   The reason why those two cubes were cubes[6] and cubes[8] is due to the *circular order of the for loop*:
   ![S5-MyExamples-00-ParticularRotatingCubes01](/Session5/(README)pictures/pic-1.png "S5-MyExamples-00-ParticularRotatingCubes01")
2. For the color part:
   * If we define the color directly random, such as:
     ```javascript
     cubes[6].material.color.set(Math.random() * 0xFFFFFF);
     cubes[18].material.color.set(Math.random() * 0xFFFFFF);
     ```
     the result would be like the color of those two cubes *keep changing very fast* instead of staying with one random color. So right now we can use **if else** function to specify the cube color:
     ```javascript
     if (x==-5 && y==-5){
        var boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
     }else{
            boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
     if (x==5 && y==5){
            boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
     }else {
            boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
          }
     }
     ```
   Those codes mean that:
   * If the X and Y position of the cube is (X:-5, Y:-5) or (X:5, Y:5), the color of it would be a random color, otherwise, the color would be white.
   * Those codes were in the for loop, this explained why the specified cubes appear with random color but will not keep changing their color.

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
