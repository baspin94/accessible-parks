from app import app
from dotenv import load_dotenv
import os, urllib.request, json

with app.app_context():

    load_dotenv()

    api_key = os.environ.get('NPS_API_KEY')

    acc_endpoint = f"https://developer.nps.gov/api/v1/parkinglots?api_key={api_key}"

    print("Requesting data on parking...")

    acc_request = urllib.request.Request(acc_endpoint)

    acc_response = urllib.request.urlopen(acc_request).read()

    acc_parking_data = json.loads(acc_response.decode('utf-8'))

    print("Accessible Parking Lots Found:")

    for lot in acc_parking_data['data']:
        if lot['accessibility']['isLotAccessibleToDisabled'] == True:
            print(f"{lot['relatedParks'][0]['parkCode']}: {lot['name']} has {lot['accessibility']['numberofAdaSpaces']} accessible spaces.")

    print("Done!")