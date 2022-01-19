# OVERLOOK HOTEL

## TABLE OF CONTENTS
- [Project Overview](#project-overview)
- [Future Features](#future-features)
- [Tech Stack](#technologies-used)
- [Install Instructions](#instructions)
- [Authors/Links](#authorslinks)

## PROJECT OVERVIEW

The Mod 2 Final [project](https://frontend.turing.edu/projects/overlook.html) gave me the chance to prove my understanding of network requests, unit testing, class-to-class interaction, accessibility, error handling, and learning to better organize my scripts and stylings. Over the course of the week I built out an application that allows a user to login to their account at the Overlook Hotel and see information pertaining to all bookings (past, current, and future), a break down of the total amount spent at the hotel, as well as booking any new rooms they'd like to based on date functionality and room type. The customer dashboard is a relatively simple design that breaks the sections down by button tabs, provides them a calendar for date filtering, and shows them images of the rooms they plan on booking or have previously booked.

The biggest test for me was successfully incorporating the GET and POST requests without the need for ```async functions``` or the ```await``` keyword. I am proud to say that my understanding of it has increased greatly over the course of the week-long project and I'm excited to continue incorporating PUT and DELETE requests moving forward. The second highlight for me was use of SCSS/Sass and creating a fully keyboard-accessible site. If you have the time, I strongly encourage you to try navigating the site using only your keyboard!


![Login Functionality](https://media.giphy.com/media/vIL2HxutIheSmQLY3x/giphy.gif)

Upon page load the user will be prompted with the option to login. Disclaimer: the application is set to run with the username of ```customer``` + ```01-50``` based on the API data we were given to work with. The password for ALL users will be ```overlook2022```. The Overlook Hotel takes your security very seriously so no one will ever see your password while looking over your shoulder! Upon successful login, the site will take you to your dashboard. 

![Customer Current Bookings](https://media.giphy.com/media/ciKr9ripnKwOYQpEGZ/giphy.gif)

Once the Customer has made it into their dashboard, they may navigate to three different tabs: Book New, Current Bookings, or Total Bill. If they check out their current bookings, they will see all past, present (today's date), and all upcoming bookings. If they want to see a little bit more information, each card when scrolled over will provide additional details about their booking. Upon card click, they will see a picture of that room associated with the booking and the confirmation number that was associated with the booking at that time!

![Customer Total Bill](https://media.giphy.com/media/OfAAcrIhLc3AG4X9sH/giphy.gif)

If the Customer would like the see a break down of their booking financials they will be greeted with a chart of all their bookings by date, room type, and cost spent per night on that room. Adjacent, they will see a polite message from The Overlook thanking them for their patronage and the total amount they have spent at the hotel (including all upcoming booking costs);

![Customer Booking New Rooms](https://media.giphy.com/media/D33Gf1nPVBuJYaruiI/giphy.gif)

In the Book New tab, the user can filter by date, room type, or both. However, the "Book Room" button will only be accessible if a date has been applied to the filtered search. Searching by room type alone will give you options of all the various rooms the hotel has to offer within that category, but only room details will be displayed. Once a date filter has been added and IF there are rooms available at that date, then they will have access to the button allowing them to book. Upon booking the room, the screen will default to repopulate with all the rooms that match the ```date``` filter, but not the room. I felt this was more intuitive because it's unlikely for someone to be booking multiple of the same size room. 

![Re-checking the Total Bill](https://media.giphy.com/media/suLv9cFmxjRdSyXfT2/giphy.gif)

After the Customer has booked some rooms, they may go back to their Total Bill tab and see all that new information is displayed and their total amount will have risen!

## FUTURE FEATURES
- Adding a Manager functionality at the login screen in order for a manager to access their own dashboard inside the Overlook Hotel interface and handle adding or removing bookings to any specific Customer
- By adding in the Manager class I will be able to use PUT and DELETE requests to edit Customer bookings

## TECHNOLOGIES USED 
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![SASS](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Mocha](https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=Mocha&logoColor=white)
![Chai](https://img.shields.io/badge/chai-A30701?style=for-the-badge&logo=chai&logoColor=white)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white)

![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

## INSTRUCTIONS
- fork the repository
- copy the SSH clone address
- run ```git clone [remote-address]``` in your repo
- run ```npm install``` in your terminal
- run ```npm start``` in the terminal

- now clone the [overlook-API](https://github.com/alexmfritz/overlook-api) to access the data on your local machine
- run ```npm install``` in your terminal
- run ```npm start``` in the terminal
- you can now head over to ```http://localhost:8080/``` to view the site

## AUTHORS/LINKS

#### - Project
- [Project Board](https://github.com/users/alexmfritz/projects/1)
- [Miro Wireframe](https://miro.com/app/board/uXjVOWBzoNM=/)

#### - AUTHORS:
- Alex Fritz = [LinkedIn](https://www.linkedin.com/in/alexmfritz/) || [GitHub](https://github.com/alexmfritz)

## [BACK TO THE TOP!](#overlook-hotel)



