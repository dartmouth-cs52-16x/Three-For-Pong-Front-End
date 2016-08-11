# Three-For-Pong

3fp is a platform that allows students to find pong games anonymously. By connecting students, we will reduce pong wait times and foster potential friendships.

## Site Map

![](./images/site_map.png)

## Wireframes

![](./images/wireframes.png)

## Architecture


### Front End

Our front end design will be built using React Native. All of our pages will have a navbar component. This will display the name of the game as well as have drop-down options. On the home page, there will also be two components: a "looking for" components and a "need" component. The former will serve as a place where people can input specifications for who the people with whom they would like to play. This will take users to another page in which they can complete the requirements for the game so that it can be entered in the database. The "create" page will have an input component in which people enter the time, location, and number of players needed. This information will then be added to the list of ongoing games and updated as required. The "need" component on the homepage will be a realtime component that serves as a list of games that need people. If someone clicks any of items on the page, he or she will be directed to the specific page for that game. This page will list the information that the original user entered and will have a "join" button; if the user clicks join, then he or she will be added to the game. If the game is considered full, then it will disappear from the "need" list on the homepage. The fourth possible screen is the personal info screen.  This screen will (like the others) have a navbar component. It will also have a component that takes input from the user about default location and phone number (which will be used to send out the text messages). On hitting save, this user's information will be updated in the database.

### Back End

Our back end design will use MongoDB hosted on Heroku.
In addition, we will use Nexmo's SMS API (https://www.nexmo.com/products/sms/) to send an SMS to students once they have been matched. We will use Axios to interact with Nexmo's API in addition to our Heroku database.

TODO:  descriptions of code organization and tools and libraries used

## Setup

TODO: how to get the project dev environment up and running, npm install etc

## Deployment

To deploy the project, do....



## Authors

Devina Kumar, Virginia Cook, Jonathan Gonzalez, Henry Wilson, Matthew Goldstein

## Acknowledgments
