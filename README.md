# Offline-Budget-Tracker
# Fitness Tracker 
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

The user will be able to add expenses and deposits to their budget with or without a connection. When entering transactions offline, they should populate the total when brought back online. Offline entries should be added to tracker.
AS AN avid traveller I WANT to be able to track my withdrawals and deposits with or without a data/internet connection SO THAT my account balance is accurate when I am traveling

## Business Context
Giving users a fast and easy way to track their money is important, but allowing them to access that information anytime is even more important. Having offline functionality is paramount to our applications success.

## Table of Contents

  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Features](#features)
  - [License](#license)
  - [Contributing](#contributing)
  - [Screenshots](#screenshots)
  - [Questions](#questions)

## Installation
1. Clone this GitHub repository

   ```
   git@github.com:mvint2647/Offline-Budget-Tracker.git
   ```

2. Install all dependent npm packages

   ```
   npm install --save
   ```
3. Create a MongoDB database
4. If running locally update the MONGODB_URI with your connection string in a .env file
5. If running on a server or hosting platform add the MONGODB_URI with connection string to the environment variables
6. If needed seed the MongoDB database by running `npm run seed`


## Usage
1. Run `npm start` to start the application
2. Enter the details of your **Input Purchase** (Adding while online)
3. 2. Enter the details of your **Input Purchase** (Subtracting while online)
4. Switch to offline & repeat steps 2. and 3.


A demo of the application is available at: "https://calm-journey-38613.herokuapp.com/"
## Features
* Add a Purchase
* Subtract a Purchase
* See a snapshot of the Online functionality
* See a snapshot of the Offline functionality


## License
This project uses the MIT license
## Contributing
Pull requests are welcome
## Screenshots
**MainPage**

![Online]()

**Main Page**

![Offline]()

## Questions
Checkout my GitHub [profile](https://github.com/mvint2647)

Please feel free to email at: <Melissavinny1133@gmail.com>