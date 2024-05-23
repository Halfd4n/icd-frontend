## Deployed on Vercel

@ icd-frontend.vercel.app

In order to use the API oyu first need to create an account @ https://icd.who.int/icdapi to 
acquire your client_id and client_secret. These two are then used in the project deployed on
Vercel in order to communicate with the WHO API. The same goes if you are trying to run the
project localy.

## Database

This project uses a db.json in order to resemble possible lead matches. The matching
algorithm will compare icdCode, title and definition of a decease against the corresponding
condition of a lead. For matches, use the free text search and try out different types of
diabetes, pneumonia or intestinal infections.

## Locally - Getting Started

First, run the development server:

npm run dev

Then, run the backend development server found in the ICD service project. You can find it
here: https://github.com/Halfd4n/icd-service

You are now good to go to run the project on your local machine. 


