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
*Coming soon* 

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

If a user has already saved a particular park, an 'Unsave' button will appear in the same place. Clicking this button removes the park from the user's 'Saved Parks' page.

### Adding, Editing, and Removing Reviews
Users who are signed in to the app have the option to submit a review and rating (out of 5 stars) of a park's accessibility within the 'Reviews' panel on the park's page.

Users can modify any review or rating they have previously submitted by clicking the 'Edit' button on the review.

Users can also remove any review they have previously submitted by clicking the 'Delete' button on the review.

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
