This is an AngularJS web application, which uses Firebase as a backend.


To install the app locally on your PC, do the following steps:

1. If you haven't already installed bower, that do that first: ```npm install -g bower```

15. Inside the folder, run ```npm install```. This step will take a few minutes while it installs all the node modules.

3. Next, run ```bower install```, which will install all of the required bower components.

4. After everything is installed, to run the server just type ```gulp```. This will open up the app inside your browser at ```http://localhost:8000```

5. To build the app type ```gulp build``` which will create a dist folder inside the main folder.

6. To serve the app from the dist folder type ```gulp serve:dist```. This will open up the app inside your browser at ```http://localhost:8001```