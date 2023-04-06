from app import app
from dotenv import load_dotenv
import os, urllib.request, json
from models import db, Amenity  

with app.app_context():

    load_dotenv()

    api_key = os.environ.get('NPS_API_KEY')

    parks_endpoint = f"https://developer.nps.gov/api/v1/parks?limit=1&api_key={api_key}"

    print("Requesting data on parks...")
    parks_request = urllib.request.Request(parks_endpoint)

    parks_response = urllib.request.urlopen(parks_request).read()

    parks_data = json.loads(parks_response.decode('utf-8'))

    print("Printing data...")
    for park in parks_data['data']:

        accessibility_url = f"http://nps.gov/{park['parkCode']}/planyourvisit/accessibility.htm"

        print(f"{park['id']} | {park['fullName']} | {park['parkCode']} | {park['states']} | {park['description']}")
        print(f"Designation: {park['designation']}")
        print(f"Weather Info: {park['weatherInfo']}")
        print(f"Latitude: {park['latitude']} | Longitude: {park['longitude']}")
        print(f"Phone: {park['contacts']['phoneNumbers'][0]['phoneNumber']}")
        print(f"Email: {park['contacts']['emailAddresses'][0]['emailAddress']}")
        print(f"General Information: {park['url']}")
        print(f"Image: {park['images'][0]['url']} | Alt Text: {park['images'][0]['altText']} | Credit: {park['images'][0]['credit']}")
        print(f"Accessibility Information: {accessibility_url}")