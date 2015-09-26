# impression

A web application that matches images to music. Given an image, Impression will produce a short playlist of songs with moods that are relevant the image.  

Once the image is uploaded, it is sent through the [Clarifai API](http://www.clarifai.com/) to obtain a set of descriptors for the image. Then, these words are processed with an NLP engine that translates those descriptors into a set of emotions, positive/negative, etc. Finally, these words are sent to the EchoNext and iTunes APIs to produce a list of songs and information about those songs, which are then displayed to the user on the following page.  

Impression was created as part of HackMIT 2015.  

Collaborators: Monde Duinkharjav, Courtney Guo, Ajay Saini, Liang Zhou