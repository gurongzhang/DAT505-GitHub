### Name；Rongzhang G
### Student ID:B161006066
*******************************
# Rongzhang Gu Final Project-SelfieCollage
## The GitHub link for this project is:https://github.com/gurongzhang/DAT505-GitHub/tree/master/Rongzhang%20Gu%20Final%20Project-SelfieCollage
## Introduction:
#### The core knowledges of this project are:
  * ### Transfering one normal image into pixel image(Getting pixel color data of the image and assigning them to the cubes in order).
  * ### Defining the X,Y,Z scale of each cube according to its RBG color data.
  * ### Visual effect(position moving, rotations, lights)
#### Since I chose the **Mixed-media Collage** as my theme, I thought it might be quiet interesting to use my own selfie as the source to play with. I broke all proccesses into four files, and the content for each of them are roughly as follow:
## 00-SetCubesManually: *Initial Thought*
![00-SetCubesManually01](/Rongzhang%20Gu%20Final%20Project-SelfieCollage/(README)pictures/pic-0.png "00-SetCubesManually01")
#### Solotion
What I did when I thought to create a *Selfie Collage* at the begining were:
  * ### Pick one selfie that I like and pixelated it into a 40x40 pixel image in the Photoshop.
    ![00-SetCubesManually01](/Rongzhang%20Gu%20Final%20Project-SelfieCollage/(README)pictures/pic-9.png "00-SetCubesManually01")
  * ### Used the **Digital Color Meter** to catch all the RGB data from the processed image and put them in a table. Here is the screen cut of the 1600 pictures I took to for recording the RGB color data:
    ![00-SetCubesManually04](/Rongzhang%20Gu%20Final%20Project-SelfieCollage/(README)pictures/pic-10.jpeg "00-SetCubesManually04")
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
  * ### Trying to make the cubes more *interesting*, to be more specific, when loading different images, the scales or other properties of the cubes would change according to its unique pixel RGB data.
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
1. The link which Stavros gave me only showed the *"getPixel function"* and *"getImageData function"*. To make the system work, I added *"RGB2Hex function"* to transfer the RGB colors to Hex colors. The comments I wrote in *index.js* can explained everthing very well.
2. There is a confusing part that why the
   ```javascript
   var imagedata = getImageData( imgTexture );
 	   for (var x = 0; x < pixelnum; x += 1) {
 		   for (var y = 0; y < pixelnum; y += 1) {
 		   	color[x * pixelnum + y] = getPixel( imagedata,parseInt((imgwidth)/pixelnum * x),parseInt(imgheight-1-(imgheight)/pixelnum * y));
 		 }
 	 }
   ```
   can only be put under the drawFrame function, once putting it out of the drawFrame, it won't work. In my opnion, these codes do not need to be executed over and over, so put under the drawFrame is not the perfect solution. The reason why it only works when put under the drawFrame is maybe because it causes some conflicts with other function which is related to pixel-getting.

********************

## 02-SetScaleBasedOnTheRGBData: *Give each cube its own size*
![02-SetScaleBasedOnTheRGBData00](/Rongzhang%20Gu%20Final%20Project-SelfieCollage/(README)pictures/pic-4.png "02-SetScaleBasedOnTheRGBData00")
#### Solotion
This *02-SetScaleBasedOnTheRGBData* is for solving the second suggestion Stavros gave me. Because my solotion to pixelate the image was:
1. Get the RGB data of each pixel.
2. Transfer the RGB colors to Hex colors.
3. Define the color of all meshes.
So I just need to use all the data I have in step one to define the scale due to each pixel's RGB is unique(it is not absolutely unique, but basically these pixels won't have repeating colors)
### Details
1. Since I already had the RGB data from:
   ```javascript
   function getPixel( imagedata, x, y) {}
   ```
   All RGB colors data were stored as the elements in the array *color[]*, I just need to use those data from this array:
   ```javascript
   c.scale.x = color[i][0]*0.01;
   c.scale.y = color[i][1]*0.01;
   c.scale.z = color[i][2]*0.1;
   ```
   And due to the table I made for *00-SetCubesManually*, I knew the range of all the RBG data I have, so I adjusted the scale couple times and finally found out the suitable scaling factors.
2. So right now each cube has its own size, the **mouse control** part for this project is **OrbitControls**, because it was what we used a lot during the workshop. So I want to keep this *"old friend"*, what is more, I thought this project will be more interesting and more creative when users can view these mix-media visual effects in 360 degrees with the mouse.

********************

##03-OptimalDesign: *Lights, Moving*
![03-OptimalDesign00](/Rongzhang%20Gu%20Final%20Project-SelfieCollage/(README)pictures/pic-5.png "03-OptimalDesign00")
#### Solotion
In this *03-OptimalDesign*, I tried to add more lights and make the cubes rotate and move to made my project cooler and more creative:
1. Add the AmbientLight to light the whole scene.
2. Reduce the intensity of the three spot lights I added before since too many lights would make the image unclear.
3. Randomize the color of top spotLight and the right spotLight so evertime refreshing the page, the visual color of the image will change a little bit.
4. Randomize the moving speed of z axis of the cubes and use *if function* to limit the movement of the cubes.
### Details
1. There are four lights in the scene, I only randomized two of them to make the visual effect nice and clear.
   ```javascript
   // Add 3 spot lights in the scene
 	//light from the top
 	var ambient = new THREE.AmbientLight(0xffffff);
 	var spotLight = new THREE.SpotLight(Math.random()*0xFFFFFF);
 	spotLight.position.set(0, 10, 0);
 	//light from the right
 	var spotLight1 = new THREE.SpotLight(Math.random()*0xFFFFFF);
 	spotLight1.position.set(10, 0, 0);
 	//light from the front
 	var spotLight2 = new THREE.SpotLight(0xFFFFFF);
 	spotLight2.position.set(0, 0, 10);
 	scene.add(spotLight);
 	scene.add(spotLight1);
 	scene.add(spotLight2);
 	scene.add(ambient);
   ```
2. To limit the cubes movement, I took my homework *S5-MyExamples-01-CreativeObjects* as the reference, but there were still some diffrences between S5-MyExamples-01-CreativeObjects and this project:
   1. The reason why in S5-MyExamples-01-CreativeObjects, all objects seemed have different moving speed is actually because the initial scale of each object is different. Under this circumstance, although they all have the same growing speed, they will not appear with the same movement.
      So for S5-MyExamples-01-CreativeObjects, I just need to use *if function* to limit the size of those objects.
   2. But for this project, the x,y,z scale of each cube were set according to its RGB, so randomize the scale would not be the propriate solution. For this case, the first thing I did is randomize the move speed.  
      So I defined a random range:[-5,5) and assigned it to the move speed of z axis. However, during the code test I found that, if I only limit the speed, those cubes would not go back to their origin positions, the reason was even if the speed will not beyond the number I set, the speed will keep change from negative number to positive number. So I wrote:
      ```javascript
      var spd = [];
      spd.push(Math.random()* 10 -5);
      c.position.z += spd[i];
      if (c.position.z > 20) spd[i] = -spd[i];
      if (c.position.z < -20) spd[i] = -spd[i];
      ```
      to make sure my cubes keep the nice movement.

********************

##04-VisualAdjustment: *Rotation, More cubes, A clearer display*
![04-VisualAdjustment00](/Rongzhang%20Gu%20Final%20Project-SelfieCollage/(README)pictures/pic-6.png "04-VisualAdjustment00")
#### Solotion
In this *04-VisualAdjustment*, what I did are:
1. Randomize the rotate speed of z axis of each cube.
2. Use the code:
   ```javascript
   renderer.setPixelRatio( window.devicePixelRatio );
   ```
   to make a better display of the whole project.
3. Change the total number of the cubes 1600(40x40) to 2500(50x50) to make the visual effect more delicate.
### Details
1. In this project I added some small details which I thought might make the project more interesting.

********************

##05-FinalProject: *Background and text*
![05-FinalProject00](/Rongzhang%20Gu%20Final%20Project-SelfieCollage/(README)pictures/pic-7.png "05-FinalProject00")
#### Solotion
In this *final version*, what I did are:
1. Add text on the top.
2. Add background.
### Details
1. I took *S7-MyExamples-03-Texture-Cubepractice* as the reference to randomize the background texture.
2. I search on the internet to know better about the text part:
   * [Reference link1](https://blog.csdn.net/soyanzhong/article/details/78708478) showed me what kind of details I can change with the text.
   * [Reference link2](https://blog.csdn.net/yuanxw44/article/details/80019501) showed me the details about font-family.
   * The smile face I added in the text is so cute lol

********************

## This is the comparison between the original image and the my final project version:
![comparison00](/Rongzhang%20Gu%20Final%20Project-SelfieCollage/(README)pictures/pic-8.png "comparison00")

By the way, the images use for this project are better be square, since the pixel scale I set is 1:1.
********************
## Thank NUA for giving me the chance to study this DAT505.
## Thank Stavros for all the supports he provided to me.
## Thank myself for all the efforts I put on this project.
## Thank god for not losing all my hair.
