# Bill Keeper.

![Bill Keeper Login](https://i.ibb.co/SNzG51d/Screen-Shot-2020-03-31-at-9-25-29-AM.png)
![Bill Keeper Screenshot](https://i.ibb.co/0B837Nm/Screen-Shot-2020-03-31-at-9-24-51-AM.png)

## A simple, elegant bill tracker.
### Bill Keeper offers a more simplistic approach to tracking finances. This app is designed for people who don't need complex functionality that others offer.

## Get Started
### To run Bill Keeper on your machine, follow these steps (PostgreSQL must be installed): 
 1. Clone the repo: `git clone git@github.com:rjshoemaker55/bill-tracker.git`
 2. Install the dependencies using the package manager of your choice.
 3. Copy the path for the `server > sql > schema.sql ` file, and run the query to insert the starting tables and dummy data.
 4. Navigate to `server > schema > pgSchema.js`
 5. Edit the PostgreSQL client information to match your own (username, password, database, etc.)
 ![Edit this](https://i.ibb.co/xhdv3Rg/Screen-Shot-2020-03-24-at-10-03-37-PM.png)
 6. Save the changes, then head back to the terminal and run `yarn start` or `npm run start` to start the server.
7. Navigate to [http://localhost:4000](http://localhost:3000) to open the React app.

## What's to come:

 - Fix suffixes for due dates
 - Real authentication
 - Add mobile responsiveness for table (collapsible columns?)
 - Login validation
 - Update feature for bills
 - Calendar selection for due dates
 - Text/email notifications
 - User settings
 
