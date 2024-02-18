
# Eds Version Checker 


Displays the Earth Design System versions for all micro frontend applications on Setmore


## Getting Started

1. Installation ```npm install ```
2. Running locally ```npm start ```
3. Installation ```npm build ```


    
## Project Structure

- ```background.ts``` - Listens for url change on active tab and sends the data to contentScript.ts
- ```contentScript.ts``` - Runs on the web applicaion - fetches the eds version from the global object and injects the labels on mfe tabs
- ```inject.ts``` - Injects the contentScript.ts into the application using a script tag.
- ```popup.ts``` - Responsible for handling on/off toggle functionality for the plugin


