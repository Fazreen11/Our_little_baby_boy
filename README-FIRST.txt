WAITING FOR YOU, LITTLE ONE — SIMPLE EDITION
================================================

This version uses only:

  • HTML
  • CSS
  • JavaScript

There is no React, npm, installation, terminal or build step.


TO SEE THE WEBSITE
------------------

1. Double-click index.html.
2. It will open in Chrome, Edge, Firefox or Safari.


TO CHANGE WORDS, NAMES AND DATES
--------------------------------

1. Right-click EDIT-HERE.js.
2. Choose “Open with” → Notepad or Visual Studio Code.
3. Change only the words between quotation marks.
4. Save the file.
5. Refresh index.html in your browser.

Example:

  babyFullName: "[Baby's Full Name]",

Change it to:

  babyFullName: "Adam Fayaz",

Do not delete the quotation marks or comma.


TO ADD PREGNANCY PHOTOS
-----------------------

1. Copy the photograph into the images folder.
2. Give it a short filename without spaces, for example:

     month-5.jpg

3. Open EDIT-HERE.js and find the correct month.
4. Add one or more paths inside its photos list:

     photos: [
       "images/month-5-a.jpg",
       "images/month-5-b.jpg"
     ],

5. Save EDIT-HERE.js and refresh index.html.


TO ADD A VIDEO
--------------

1. Copy an MP4 file into the videos folder.
2. Add its path in EDIT-HERE.js:

     video: "videos/first-ultrasound.mp4",


TO ADD AN AUDIO MESSAGE
-----------------------

1. Copy an MP3 file into the audio folder.
2. Add its path in EDIT-HERE.js:

     audio: "audio/grandma-message.mp3",


TO EDIT YOUR ONE LETTER
-----------------------

Open EDIT-HERE.js and find:

  myLetter: {

Change its title, salutation, message, closing and name. To add a photograph
to the letter, place it in images and change:

  photo: "images/our-sister-photo.jpg"


AFTER THE BABY IS BORN
----------------------

Open EDIT-HERE.js and change:

  babyHasArrived: false,

to:

  babyHasArrived: true,

Then fill in the baby's full name and birth information.


TO SHARE WITH GITHUB PAGES
--------------------------

1. Create a free GitHub account and a Public repository called baby-story.
2. Upload everything inside this website folder. Keep index.html at the top.
3. Commit the files.
4. Open Settings → Pages.
5. Choose Deploy from a branch, main, /(root), then Save.
6. Wait a few minutes and use the link GitHub displays.

Important: a normal static website link is not private. Do not upload personal
family media until you are comfortable with the sharing method or have added
password protection.


FILES YOU SHOULD EDIT
---------------------

  EDIT-HERE.js   — names, messages, dates and media paths
  style.css      — colours and design, only if you want to change them

FILES YOU DO NOT NEED TO EDIT
-----------------------------

  index.html
  script.js


NEED HELP?
----------

You can upload this ZIP back to ChatGPT and say exactly what you want changed.
