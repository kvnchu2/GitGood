## Introduction

This project was created as a means to visualize github information in a user-friendly and accessible way. Using Github's REST API v3, we were able to extract information from user profiles to display a timeline of repositories. Each repository box contains information such as: repository name, date created, languages used, and contributors. The project also has a filter feature that allows users to filter by repository name, last updated before, last updated after, and language. 

### Technologies Used
ReactJS, ExpressJS, MaterialUI, Bootstrap, SCSS, CanvasJS, Axios

Below are some screenshots of the main features:


Home page
![home page](https://github.com/kvnchu2/GitGood/blob/master/docs/home-page.jpeg?raw=true)

Register pop-up
![register](https://github.com/kvnchu2/GitGood/blob/master/docs/register.jpeg?raw=true)

User search
![user-search](https://github.com/kvnchu2/GitGood/blob/master/docs/user-search.jpeg?raw=true)

Languages Pie Chart
![languages](https://github.com/kvnchu2/GitGood/blob/master/docs/languages-pie-chart.jpeg?raw=true)

Favourites
![favourites](https://github.com/kvnchu2/GitGood/blob/master/docs/favourites.jpeg?raw=true)

Contributors
![contributors](https://github.com/kvnchu2/GitGood/blob/master/docs/contributors.jpeg?raw=true)


## Running the projects

You need **TWO** terminal windows/tabs for this (or some other plan for running two Node processes).

In one terminal, `cd` into `react-front-end`. Run `npm install` or `yarn` to install the dependencies. Then run `npm start` or `yarn start`, and go to `localhost:3000` in your browser.

In the other terminal, run `npm install` or `yarn` to install the dependencies, then `npm start` or `yarn start` to launch the server.

In the browser, you can click on the button and see the data get loaded.

If this doesn't work, please message me!
