
# Eds Version Checker 


Displays the Earth Design System versions for all micro frontend applications on Setmore - 
<a href="https://chromewebstore.google.com/detail/eds-version-checker/koggbkcbcigigcmjomnnhmjhgbaleool?hl=en&authuser=0" target="_blank">EDS Version Checker</a>


## Getting Started

1. Installation ```npm install ```
2. Running locally ```npm run start ```
3. In Chrome, Click on more options -> Extensions -> Manage Extensions -> Click on Load unpacked button on top left -> Select the dist folder
4. Installation ```npm run build ```


    
## Project Structure

- ```background.ts``` - Listens for url change on active tab and sends the data to contentScript.ts
- ```contentScript.ts``` - Runs on the web applicaion - fetches the eds version from the global object and injects the labels on mfe tabs
- ```inject.ts``` - Injects the contentScript.ts into the application using a script tag.
- ```popup.ts``` - Responsible for handling on/off toggle functionality for the plugin


