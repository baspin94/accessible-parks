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

If a user's search does not return any parks with all selected amentities, they will receive an error message instructing them to remove some of their criteria and try again. The search form will be reset for the user to modify and resubmit.

### Filtering Results
Users have the option to filter their search results by state and park designation (such as park, monument, recreation area, etc.). The options available in each filter's dropdown menu will update based on which parks are currently displayed. Once a filter has been added, that input field will become inactive until clicking the 'Reset Filters' button.

### Viewing Park Details
Clicking on one of the park cards in the search results page brings the user to a page that provides additional details about the park, including: 
- Description of the park.
- General information, such as links to the official National Parks pages for park information and accessibility, contact information, and weather.
- Accessibility-related amenities available at the park.
- User reviews of park accessibility.

Users must be logged in to access the review submission form.

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
