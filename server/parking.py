from app import app
from dotenv import load_dotenv
import os, urllib.request, json
from models import db, ParkingLot 

with app.app_context():

    load_dotenv()

    print("Deleting existing entries...")
    ParkingLot.query.delete()

    api_key = os.environ.get('NPS_API_KEY')

    acc_endpoint = f"https://developer.nps.gov/api/v1/parkinglots?limit=550&api_key={api_key}"

    print("Requesting data on parking...")

    acc_request = urllib.request.Request(acc_endpoint)

    acc_response = urllib.request.urlopen(acc_request).read()

    acc_parking_data = json.loads(acc_response.decode('utf-8'))

    print("Accessible Parking Lots Found:")

    for lot in acc_parking_data['data']:
        if lot['accessibility']['isLotAccessibleToDisabled'] == True:
            # print(f"{lot['relatedParks'][0]['parkCode']}: {lot['name']} has {lot['accessibility']['numberofAdaSpaces']} accessible spaces.")
        
            new_lot = ParkingLot(
                park_code = lot['relatedParks'][0]['parkCode'],
                name = lot['name'],
                gen_description = lot['description'],
                latitude = lot['latitude'],
                longitude = lot['longitude'],
                total_spaces = lot['accessibility']['totalSpaces'],
                total_ada_spaces = lot['accessibility']['numberofAdaSpaces'],
                van_accessible_spaces = lot['accessibility']['numberofAdaVanAccessbileSpaces'],
                step_free_spaces = lot['accessibility']['numberofAdaStepFreeSpaces'],
                oversize_vehicle_spaces = lot['accessibility']['numberOfOversizeVehicleSpaces'],
                ada_description = lot['accessibility']['adaFacilitiesDescription']
            )

            db.session.add(new_lot)

    print("Committing parking lots to database...")
    db.session.commit()

    print("Parking Lots Seeded!")