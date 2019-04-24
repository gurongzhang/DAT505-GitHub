# Rongzhang Gu Final Project-SelfieCollage
## Introduction:
#### The core knowledges of this project are:
  * ### Transfering one normal image into pixel image(Getting pixel color data of the image and assigning them to the cubes in order).
  * ### Defining the X,Y,Z scale of each cube according to its RBG color data.
  * ### Visual effect(position moving, rotations, lights)
#### Since I chose the **Mixed-media Collage** as my theme, I thought it might be quiet interesting to use my own selfie as the source to play with. I broke all proccesses into four files, and the content for each of them are roughly as follow:
## 00-SetCubesManually: *Initial Thought*
![00-SetCubesManually00](/Rongzhang%20Gu%20Final%20Project-SelfieCollage/(README)pictures/pic-0.png "00-SetCubesManually00")
#### Solotion
What I did when I thought to create a *Selfie Collage* at the begining were:
  * ### Pick one selfie that I like and pixelated it into a 40x40 pixel image in the Photoshop.
  ![00-SetCubesManually01](/Rongzhang%20Gu%20Final%20Project-SelfieCollage/(README)pictures/pic-1.png "00-SetCubesManually01")
  * ### Used the **Digital Color Meter** to catch all the RGB data from the processed image and put them in a table.
  * ### Transfered all RGB data into Hex color data [online](https://www.css-js.com/tools/rgba.html) and filled the table with those transfered data.
  ![00-SetCubesManually02](/Rongzhang%20Gu%20Final%20Project-SelfieCollage/(README)pictures/pic-2.png "00-SetCubesManually02")
  * ### Created a **for loop** which contains 1600 cubes(40x40(X and Y axis))and built an array to put all hex color data in. Finally, assigning all the hex color data to the cubes sequentially.
  * ### Made each cube ratate with different rotate speeds.
### Details
1. Since the **'Array'** and **'For loop'** lecture really left a deep impression in my mind, the first solution I thought to complete this project is to define the pixel color individually. And for reaching that goal I used **Digital Color Meter** to get all RGB color data I want and transfered them online to *Hex color*.
2. The logic for the code is easy: creating two arrays and put colors and cubes in seperately. Then assigning colors to these cubes. However, the process of collecting data was a huge work, especially when doing it manually. This solution was definitely not the efficient one.
3. The positive perspectives are: Firstly, it is easy to code as long as I have all the data I need. What is more, I could see how my *Selfie Collage* looks like in threejs and use it as the reference when I started adding other effect on my project.
   To the contrary, if I want to change the image or replace *my selfie* with other pictures. It would be impossible to do it without a lot of manual work.

********************

## 01-GetRGBDataAutomatically: *Get the RGB color data for the pixel color*
![01-GetRGBDataAutomatically00](/Rongzhang%20Gu%20Final%20Project-SelfieCollage/(README)pictures/pic-3.png "01-GetRGBDataAutomatically00")
#### For doing my project more efficiently and making it more creative. Stavros gave me 3 suggestions and the corresponding links that I may need as the reference:
  * ### Using the code to transfer the selfie image into pixel image automatically instead of setting each cube's property manually.
  * ### Trying to make the cubes more *interesting* with different images that we use, or in other words, when loading different images, the scales or other properties of the cubes would change according to its unique pixel RGB data.
  * ### Adding some mouse control to make the project more *creative*.
### Solution
1. For this *01-GetRGBDataAutomatically*, I started doing the first solution that Stavros gave to me. The [reference link](https://github.com/mrdoob/three.js/issues/758)
   The reference code were:
   ```javascript
   function getImageData( image ) {
    var canvas = document.createElement( 'canvas' );
    canvas.width = image.width;
    canvas.height = image.height;

    var context = canvas.getContext( '2d' );
    context.drawImage( image, 0, 0 );

    return context.getImageData( 0, 0, image.width, image.height );
    }

   function getPixel( imagedata, x, y ) {
    var position = ( x + imagedata.width * y ) * 4, data = imagedata.data;
    return { r: data[ position ], g: data[ position + 1 ], b: data[ position + 2 ], a: data[ position + 3 ] };
    }

    var imagedata = getImageData( imgTexture.image );
    var color = getPixel( imagedata, 10, 10 );
   ```
2. My thought was since I knew from the online answer that there was some function such as *"getPixel"*, which perfectly meets my project requirements and can help me get the pixels automatically, there must be a way I can transfer the whole image into pixels. So I palnned to figure out how to use the *"getPixel function"* and *"getImageData function"* to reach this goal.
### Details
1. 
********************

## S4-MyExamples-01-homework(easy): *Cubes who stay with different rotation directions*
#### For this exercise, we created 225 cubes(15(X axis)x15(Z axis)). And try to make them have different rotate directions in one still scene.
![S4-MyExamples-01-homework(easy)00](/Session4-Array%2C%20For%20Loop%2C%20OrbitControls/(README)pictures/pic-4.png "S4-MyExamples-01-homework(easy)00")
### Knowledge Points:
1. It was very easy to find out the solution based on the for loop that we talked about during *S4-MyExamples-00-ArrayMeshPractice/3*, the solution for this one is to show the result of how each cube looks like after the rotation. So what we need to do is assigning the random rotate directions to the mesh inside the for loop that is all:
   ```javascript
   for (var x = -35; x < 40; x += 5) {
   for (var y = -35; y < 40; y += 5) {
   var boxGeometry = new THREE.BoxGeometry(3, 3, 3);

   var boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
   var mesh = new THREE.Mesh(boxGeometry, boxMaterial);

   mesh.position.x = x;
   mesh.position.z = y;
   mesh.rotation.x = Math.random() * 2 * Math.PI;
   mesh.rotation.y = Math.random() * 2 * Math.PI;
   mesh.rotation.z = Math.random() * 2 * Math.PI;
   scene.add(mesh);
   cubes.push(mesh);
     }
   }
   ```

********************

## S4-MyExamples-02-homework(hard): *Cubes who keep rotating with different rotate speeds*
#### For this exercise, we created 225 cubes(15(X axis)x15(Z axis)). And try to make them rotating with different rotate speeds in the scene.
![S4-MyExamples-02-homework(hard)00](/Session4-Array%2C%20For%20Loop%2C%20OrbitControls/(README)pictures/pic-5.png "S4-MyExamples-02-homework(hard)00")
### Knowledge Points:
1. To finding out the solution for this exercise, the **S4-MyExamples-00-ArrayMeshPractice readme note** is good for reference, as we know that if we want to make all cubes created in the for loop to animate, we must push those cubes in an array.

   However, what is this exercise that differ from the *S4-MyExamples-00-ArrayMeshPractice* is that, in this exercise, each cube has their own rotation speed, which means, they will do the rotation individually, in the *S4-MyExamples-00-ArrayMeshPractice*, all cubes rotate the same. So for this *S4-MyExamples-02-homework(hard)* exercise, how to give each cube their unique rotate speed is what should be working on.

2. To solve this quesiton:
   * First, we need to create an array to push all meshes in:
     ```javascript
     var cubes = [];
     cubes.push(mesh);
     ```
   * So **right now** *we can bring all cubes out from the for loop*, the **next step** is to *define the unique rotate speed for each cube*. So basicly, *every cube should has different rotate speed for its X,Y,Z*. _The **array** which has different random values in it_ would be a perfect choice to define the rotate speed. So we need to **define 3 arrays** to *put the rotate speed values for X,Y,Z*:
     ```javascript
     var rot_spd = [];
     var rot_spd1 = [];
     var rot_spd2 = [];
     ```
   * Then we *push random numbers which from different ranges into these 3 arrays* to *make the rotate speed for X,Y,Z different*, **if we assign those random numbers directly to the rotate speed**, the cubes **will still have the same X,Y,Z rotate speeds ,just with 3 random speed values**:
     ```javascript
     rot_spd.push(Math.random() * 0.1 - 0.05);
     rot_spd1.push(Math.random() * 0.1 - 0.02);
     rot_spd2.push(Math.random() * 0.1 - 0.08);
     ```
   * The last step was to assign those values to the X,Y,Z rotate speeds:
     ```javascript
     cubes.forEach(function(c, i) {
     c.rotation.x += rot_spd[i];
     c.rotation.y += rot_spd1[i];
     c.rotation.z += rot_spd2[i];
     });
     ```
