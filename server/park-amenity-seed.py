from app import app
from dotenv import load_dotenv
import os, urllib.request, json
from models import db, Amenity 

with app.app_context():

    load_dotenv()

    api_key = os.environ.get('NPS_API_KEY')

    # amenities = [amenity.nps_api_id for amenity in Amenity.query.all()]
    # print(amenities)

    amenity_id = "4E4D076A-6866-46C8-A28B-A129E2B8F3DB"

    pa_endpoint = f"https://developer.nps.gov/api/v1/amenities/parksplaces?id={amenity_id}&api_key={api_key}"

    pa_request = urllib.request.Request(pa_endpoint)

    pa_response = urllib.request.urlopen(pa_request).read()

    pa_data = json.loads(pa_response.decode('utf-8'))

    for element in pa_data['data']:
        amenity = element[0]
        amenity_name = amenity['name']
        print(f"Amenity - {amenity_name}:")

        for park in amenity['parks']:
            print(f"-{park['parkCode']}")
