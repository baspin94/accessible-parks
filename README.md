# Accessible Parks
## Description
'Accessible Parks' is a full-stack application built using React and Flask. The app enables users to search for US national parks with particular accessibility-related amenities available.

Any user can:
- Create a profile.
- Search for parks by accessibility-related amenities.
- View additional details about each park and the overall accessibility features available.
- View reviews for a park.

Registered users can:
- Save parks to explore later.
- Leave a review about their experience at a park.

## Installation

Fork and clone this repository into your local environment and open within your IDE of choice.

### Frontend Initial Setup

Navigate to the `/client` directory in your terminal and run the following command:
```
$ npm install
```
Navigate back to the root directory and run the following command:
```
$ npm start --prefix client
```
If the app doesn't automatically launch in your browser, navigate to `localhost:4000`.

### Backend Initial Setup

Open a new terminal, as the frontend server will continue to run in the current terminal.

Create a `.env` file in the root directory of the repository:

```
$ touch .env
```
Within that `.env` file, you'll need to add three pieces of information:
- NPS_API_KEY: In order to populate your own local copy of the database, you will need to obtain an API key from the National Park Service by registering on their website. An API key will be emailed to you shortly after registering.
- APP_SECRET_KEY: For user sessions to work correctly, you will need to configure a secret key for your app. You can generate one in your terminal by entering the following command: `python -c 'import os; print(os.urandom(16))'`
- DATABASE_URI: This is where your local database can be accessed.

Now, the file should look something like this:
```
NPS_API_KEY = <YOUR API KEY HERE (no quotation marks needed)>
APP_SECRET_KEY = <YOUR SECRET KEY HERE (no quotation marks needed)>
DATABASE_URI = 'sqlite:///app.db'
```
Next, in your terminal, run the following command to install dependencies:
```
$ pipenv install -r requirements.txt
```
Run the following command to launch your virtual environment and load the `.env` environment variables:
```
$ pipenv shell
```
Within that subshell, navigate to the `/server` directory. From there, delete any existing `instance` and `migrations` directories and run the following command to initialize your database with Flask and SQLAlchemy:
```
$ flask db init
$ flask db revision --autogenerate -m "Create tables."
$ flask db upgrade
```
### Populating Your Database

First, populate the 'Amenities' table by running the following command from the `/server` directory:
```
$ python amenity-seed.py
```
Next, populate the 'Parks' table by running the following command from the `/server` directory:
```
$ python park-seed.py
```
Lastly, populate the 'Park Amenities' table by running the following command from the `/server` directory:
```
$ python park-amenity-seed.py
```
Now that you have data seeded, you can go ahead and run the following command to start the server:
```
$ python app.py
```
After starting/restarting the server, you'll need to refresh the app in your browser to fetch data from the backend.

## Usage
### Search
Users can search for parks by checking the box next to each amenity they would like included and clicking 'Search'. The search results will include parks having all the selected amenities.

![User performing a basic search by checking criteria and clicking 'Search' to load results on a new page](https://github.com/baspin94/accessible-parks/blob/main/assets/01_Basic%20Search.gif)

If a user's search does not return any parks with all selected amentities, they will receive an error message instructing them to remove some of their criteria and try again. The search form will be reset for the user to modify and resubmit.

![User submitting a search and receiving a 'Search Unsuccessful' error message](https://github.com/baspin94/accessible-parks/blob/main/assets/02_Unsuccessful%20Search.gif)

### Filtering Results
Users have the option to filter their search results by state and park designation (such as park, monument, recreation area, etc.). The options available in each filter's dropdown menu will update based on which parks are currently displayed. Once a filter has been added, that input field will become inactive until clicking the 'Reset Filters' button.

![User filtering search results by state, followed by designation](https://github.com/baspin94/accessible-parks/blob/main/assets/03_Filter%20By%20State.gif)

![User filtering search results by designation, followed by state](https://github.com/baspin94/accessible-parks/blob/main/assets/04_Filter%20By%20Designation.gif)

### Viewing Park Details
Clicking on one of the park cards in the search results page brings the user to a page that provides additional details about the park, including: 
- Description of the park.
- General information, such as links to the official National Parks pages for park information and accessibility, contact information, and weather.
- Accessibility-related amenities available at the park.
- User reviews of park accessibility.

![User selecting search result to load 'Park Detail' page](https://github.com/baspin94/accessible-parks/blob/main/assets/17_Park%20Detail%20View%20(Not%20Signed%20In).gif)

Users must be logged in to access the review submission form.

### Saving and Unsaving Parks
Users who are signed in to the app have the option to add parks to their 'Saved Parks' page by clicking the 'Save' button that appears in the upper-righthand corner of the park's page.

![User clicking 'Save' button on a park and adding it to their 'Saved Parks' page](https://github.com/baspin94/accessible-parks/blob/main/assets/18_Save%20Park.gif)

If a user has already saved a particular park, an 'Unsave' button will appear in the same place. Clicking this button removes the park from the user's 'Saved Parks' page.

![User clicking 'Unsave' button on a park and removing it from their 'Saved Parks' page](https://github.com/baspin94/accessible-parks/blob/main/assets/19_Unsave%20Park.gif)

### Adding, Editing, and Removing Reviews
Users who are signed in to the app have the option to submit a review and rating (out of 5 stars) of a park's accessibility within the 'Reviews' panel on the park's page.

![User adding a review and rating in a park's 'Reviews' panel and clicking 'Submit' button to post it to the page](https://github.com/baspin94/accessible-parks/blob/main/assets/20_Add%20Review.gif)

Users can modify any review or rating they have previously submitted by clicking the 'Edit' button on the review.

![User clicking 'Edit' button on their review and modifying it, clicking 'Submit' again to post the changes](https://github.com/baspin94/accessible-parks/blob/main/assets/21_Edit%20Review.gif)

Users can also remove any review they have previously submitted by clicking the 'Delete' button on the review.

![User clicking 'Delete' button on their review, which immediately removes it from the page](https://github.com/baspin94/accessible-parks/blob/main/assets/22_Delete%20Review.gif)

### Signing Up for an Account

Users can sign up for a new account by entering their first name, last name, and email address, as well as a password (which they'll need to confirm in a separate field) for their account, and then clicking the 'Sign Up' button.

![User entering information into 'Sign Up' form and clicking 'Sign Up' to submit and redirect to landing page](https://github.com/baspin94/accessible-parks/blob/main/assets/11_Signup%20Successful.gif)

When entering/confirming their password, users can toggle the 'Show Password' button on and off, which will update both fields for easy comparison.

![User clicking the 'Show Password' button to toggle between showing and hiding password in both the 'Password' and 'Confirm Password' fields](https://github.com/baspin94/accessible-parks/blob/main/assets/12_Signup%20Password%20Reveal.gif)

An error will render at the top of the form upon submission if the user attempts to log in with a duplicate email address, indicating they already have an account.

![Error message at top of the form for email address already in system](https://github.com/baspin94/accessible-parks/blob/main/assets/14_Signup%20Duplicate%20User.png)

If the user attempts to sign up with an invalid email address, or the 'Password' and 'Confirm Password' fields do not match, the form field will be highlighted and an error message displayed below it.

![Error messages underneath 'Email Address' and 'Confirm Password' fields](https://github.com/baspin94/accessible-parks/blob/main/assets/15-16%20Signup%20Invalid%20Email%20or%20Password.png)

If the user attempts to submit the form with any required fields left blank, a prompt to 'Please Fill Out This Field' will appear below the field.

![Empty field with 'Please Fill Out This Field' message below](https://github.com/baspin94/accessible-parks/blob/main/assets/13_Signup%20Blank%20Field.png)

### Logging in to an Account

Users can log in to an existing account by entering the email address and password they submitted when signing up and clicking the 'Log In' button.

![User entering information into 'Log In' form and clicking 'Log In' to submit and redirect to landing page](https://github.com/baspin94/accessible-parks/blob/main/assets/05_Successful%20Login.gif)

When entering a password, users can toggle the 'Show Password' button on and off.

![User clicking the 'Show Password' button to toggle between showing and hiding password in the 'Password' field](https://github.com/baspin94/accessible-parks/blob/main/assets/06_Login%20Password%20Reveal.gif)

Errors will render at the top of the form upon submission if the user attempts to log in with an email address that does not exist in the system or an invalid password.

![Error messages at the top of the form for invalid email address and password](https://github.com/baspin94/accessible-parks/blob/main/assets/07-08%20Login%20Invalid%20Username%20Password.png)

If the user attempts to log in with an invalid email address, the form field will be highlighted and an error message displayed below it.

![Error message underneath 'Email Address' field](https://github.com/baspin94/accessible-parks/blob/main/assets/09_Login%20Invalid%20Email%20Address.png)

If the user attempts to submit the form with any required fields left blank, a prompt to 'Please Fill Out This Field' will appear below the field.

![Empty field with 'Please Fill Out This Field' message below](https://github.com/baspin94/accessible-parks/blob/main/assets/10_Login%20Blank%20Field.png)

## Roadmap
Future additions will include:
- Faster loading times for search results.
- Improved responsivity and 'look and feel' for mobile users.
- Ability for users to upload photos with reviews.
- Ability for users to view the location of each park on a map.
- Enhanced user profiles with the option to view others' profiles and favorite parks.
- Additional information on the 'park details' page related to accessible parking, visitor centers, and accessible places within each park.

## Author and Acknowledgements
 - This application was developed by [Bianca Aspin](https://github.com/baspin94) as my capstone project for [Flatiron School's Software Engineering Immersive Bootcamp](https://flatironschool.com/courses/coding-bootcamp/), which I graduated from in April 2023.
 - The national parks data was furnished by the National Parks Service via the [National Park Service API](https://www.nps.gov/subjects/developer/index.htm).
 - The user interface utilizes [Chakra UI](https://chakra-ui.com/), a UI library which emphasizes web accessibility – each of their components comes with WAI-ARIA roles and attributes already baked in.
