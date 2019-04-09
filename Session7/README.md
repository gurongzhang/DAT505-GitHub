# DAT505-Session7
## Introduction:
#### This session introduced:
  * ### How to load different textures randomly in the scene
  * ### How to transfer threejs 3D world coordinates to screen mouse coordinates
#### This session has abundant contents, some of them might not be easy to absorb, especially the transformation between 3D coordinates and mouse coordinates, but I will try my best to explaine them.
## S7-ClassExamples-00-Texture-Cube: *Loading random texures for the objects*
#### This example demonstrates how to make the object do the 'drop loop' and change its initial position every time refresh the page. Another important part is to show how to load texture for the object.
![S7-ClassExamples-00-Texture-Cube00](/Session7/(README)pictures/pic-0.png "S7-ClassExamples-00-Texture-Cube00")
### Knowledge Points
1. First, to loading the texture, the following codes need to be added:
   ```javascript
   var texture;
   function init() {
   	texture = new THREE.TextureLoader().load( "texture.jpg" );
   ```
   What needs to be pointed out is the file catalog in the:
   ```javascript
   texture = new THREE.TextureLoader().load( "" );
   ```
   needs to be the catalog which can shows where this texture file is, in other words, if the texture picture is put under one file named 'textures', the content inside should be like "textures/texture.jpg"
2. Secondly, to make it looks like 'drop', the y position needs to consistly change, and the x position needs to be randomized. Of course, all these codes should appear under the *animate function* to make the object move:
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
   The comments describe everything clearly.
3. Finally, adding some rotate speed to the object under the *animate function*:
   ```javascript
 	mesh.rotation.x += 0.02;
 	mesh.rotation.y += 0.01;
   ```

********************

## S7-MyExamples-03-Texture-Cubepractice: *Multipul cubes with random texures and random positions keep 'falling'*
#### In this exercise, we were asked to load random texures for 10 cubes and made them do the same 'drop' just like *S7-ClassExamples-00-Texture-Cube* but with different 'drop speed', different initial positions and same rotate speeds.
![S7-MyExamples-03-Texture-Cubepractice00](/Session7/(README)pictures/pic-1.png "S7-MyExamples-03-Texture-Cubepractice00")
### Knowledge Points
1. To loading random texures, we need to divide the solution into two part.
   * Loading different textures.
   * Loading them randomly.
   The script is down below:
   ```javascript
   var texture = new THREE.TextureLoader().load( "textures/texture"+ Math.floor(Math.random()*4)+".jpg" );
   // Create a MeshBasicMaterial with a loaded texture
 	 material = new THREE.MeshBasicMaterial( { map: texture} );
   ```
   ![S7-MyExamples-03-Texture-Cubepractice01](/Session7/(README)pictures/pic-6.png "S7-MyExamples-03-Texture-Cubepractice01")
   ![S7-MyExamples-03-Texture-Cubepractice02](/Session7/(README)pictures/pic-4.png "S7-MyExamples-03-Texture-Cubepractice02")
2. Different 'initial positions':
   ```javascript
   mesh.position.x=(Math.random()*30)-15;
 	 mesh.position.y=(Math.random()*30)-15;
   ```
3. Different 'drop speed':
   ```javascript
   var randomValue = Math.random()*0.5;
   spd.push(randomValue);
   	c.position.y -= spd[i];
   ```
4. Same 'rotate speed':
   ```javascript
   c.rotation.x += 0.02;
   c.rotation.y += 0.01;
   ```
5. 'Drop loop':
   ```javascript
   //If the mesh passes the bottom of the screen,
   //make it appear on the top. Also x position is randomized
   if (c.position.y <- 30){
 		c.position.y = 35;
 		c.position.x = (Math.random() * -20) +10;
 		c.scale.x = (Math.random() * -2) +1;
 		c.scale.y = (Math.random() * -2) +1;
 		c.scale.z = (Math.random() * -2) +1;
 	 }
   ```

********************

## S7-ClassExamples-01-Texture-Eyes-Interaction:*An 'eye' that continuously ‘looks’ the mouse position*
#### In this example, a sphere with the eye texture will stare fixedly at the mouse, so with the mouse moving, the sphere will do the corresponding rotation.
![S7-ClassExamples-01-Texture-Eyes-Interaction00](/Session7/(README)pictures/pic-7.png "S7-ClassExamples-01-Texture-Eyes-Interaction00")
### Knowledge Points
1. 
2.
