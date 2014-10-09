To install the app locally on your PC, do the following steps:

1. If you haven't already installed bower, that do that first:

'''
   npm install -g bower
'''

2. Inside the folder, run '''npm install'''. This step will take a few minutes while it installs all the node modules.
3. Next, run bower install, which will install all of the requiired bower components.
4. After everything is installed, to run the server type gulp. This will open the app inside your browser at localhost:8000
5. To build the app type gulp build which will create a dist folder inside the main folder.
6. To serve the the app from the dist folder type gulp serve:dist. This will open the app inside your browser at localhost:8001