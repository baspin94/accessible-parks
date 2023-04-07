from app import app
from dotenv import load_dotenv
import os, urllib.request, json
from models import db, Park  

with app.app_context():

    load_dotenv()

    api_key = os.environ.get('NPS_API_KEY')

    print("Deleting existing entries...")
    Park.query.delete()

    parks_endpoint = f"https://developer.nps.gov/api/v1/parks?limit=500&api_key={api_key}"

    print("Requesting data on parks...")
    parks_request = urllib.request.Request(parks_endpoint)

    parks_response = urllib.request.urlopen(parks_request).read()

    parks_data = json.loads(parks_response.decode('utf-8'))

    print("Generating new database objects based on response...")
    for park in parks_data['data']:

        accessibility_url = f"https://www.nps.gov/{park['parkCode']}/planyourvisit/accessibility.htm"

        try:
            phone_number = park['contacts']['phoneNumbers'][0]['phoneNumber']
        except IndexError:
            phone_number = "Unavailable"

        lat_data = park['latitude']

        if lat_data == '':
            latitude = 0
        else: 
            latitude = lat_data

        long_data = park['longitude']

        if long_data == '':
            longitude = 0
        else: 
            longitude = long_data
        
        new_park = Park(
            nps_api_id = park['id'],
            name = park['fullName'],
            code = park['parkCode'],
            states = park['states'],
            latitude = latitude,
            longitude = longitude,
            designation = park['designation'],
            description = park['description'],
            phone = phone_number,
            email = park['contacts']['emailAddresses'][0]['emailAddress'],
            image_url = park['images'][0]['url'],
            image_alt = park['images'][0]['altText'],
            image_credit = park['images'][0]['credit'],
            weather = park['weatherInfo'],
            nps_url = park['url'],
            access_url = accessibility_url
        )

        db.session.add(new_park)

    print("Committing parks to database...")
    db.session.commit()

    print("Parks seeded!")