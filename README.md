﻿# Hiragana-App-Backend

This app helps users learn the pronunciation of Japanese characters through quizzes. It offers a game-like experience, making it fun and engaging to memorize how to pronounce hiragana characters.

This repository is for the backend api to store the high score and user informations


## Major functions

- Level Selection: Users can choose from different difficulty levels.
-	Scoring: Each quiz shows how many points the user has earned.
-	Multiple Choice Questions: Users select the correct answer from 5 to 6 buttons for each question.
-	User Authentication: Logged-in users can store their high scores for each quiz level and track progress.


## dependencies

Make sure the following dependencies are installed and up-to-date:

```json
{
"@types/bcrypt": "^5.0.2",
"@types/cookie-session": "^2.0.49",
"@types/cors": "^2.8.17",
"@types/express": "^4.17.21",
"@types/mongodb": "^4.0.7",
"@types/node": "^22.4.1",
"bcrypt": "^5.1.1",
"cookie-session": "^2.1.0",
"cors": "^2.8.5",
"dotenv": "^16.4.5",
"express": "^4.19.2",
"mongoose": "^8.5.3",
"nodemon": "^3.1.4",
"ts-node-dev": "^2.0.0",
"typescript": "^5.5.4",
"vercel": "^37.1.1"
}
```


## build and deploy instructions

Follow these steps to build and deploy the app locally or to a server:

- Local Development
	1.	Install Dependencies:

        Run the following command to install all necessary packages:

            npm install
  
	2.	Start the Development Server:

        Run this command to launch the app locally:
   	
            npm run dev
   	
    The app will be available at http://localhost:3000 (or another port specified in the console).

- Production Build
	1.	Create a Production Build:

        Run the following command to build the app for production:

   	        npm run build
  
        This will generate a dist/ directory with optimized files.
  
	2.	Deploy to a Server:

        -	Serve the files in the dist/ directory using a static file server (like Nginx, Apache, or Vercel).
      	-	If deploying to Vercel, Netlify, or Render, specify:
      	-	Build Command: `npm run build`
      	-	Output Directory: dist/

- Environment Variables
    ```
      MONGO_URI=YOUR_MONGO_DB_URI
      HOST=localhos
      PORT=4000
    ```
