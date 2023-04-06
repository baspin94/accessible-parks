from dotenv import load_dotenv
import os, urllib.request, json  

load_dotenv()

api_key = os.environ.get('NPS_API_KEY')

# Accessibility-Specific Amenities Query

accessibility_amenities = [
    "4E4D076A-6866-46C8-A28B-A129E2B8F3DB",
    "04D29064-B9A1-4031-AD0E-98E31EF69604",
    "CBD31D2A-DD1A-4C5D-88C1-67B6B7147CE9",
    "BD2D6111-3E55-4838-A943-66203D9D95D6",
    "7DC6C690-2BC3-4344-9691-EF9FCFB6E506",
    "8BFB0FF0-0B32-402B-8B73-C8028E56501E",
    "F4A842CB-C966-402E-BBD3-AB86EDCF8403",
    "27A7E3AB-CA53-41D3-AEDE-FBF74D20F023",
    "3B84C2C8-E890-4EE5-B0E7-FA157EFD8DAC",
    "AB14DDED-4C61-4842-9D1F-1C9578A10802",
    "0A8D7236-5316-4128-978D-31FE059031F8",
    "6297C73A-5B8D-4D0E-BAD1-5E47F244D20A",
    "163C13BC-0AD5-4190-8D1F-0B7E2C1B0BA3",
    "75F2DA2A-1741-445A-9FA7-B63A81E4BD7F",
    "347D79CD-4FEC-4218-86C4-079F0FE94945",
    "1FF653F6-1F20-425C-A16A-B8D6210CD759",
    "BF109EEC-1E9C-4015-B5D1-829FE122C64B",
    "3A8EC9F0-6CC6-48CE-9AA2-1B257B074383",
    "EAB59B1F-2FA1-4545-A322-2C19149AF7FC",
    "1CF3D18E-C6A7-4462-9990-86B59383A9C3"
]

acc_query_string = ','.join(accessibility_amenities)

acc_endpoint = f"https://developer.nps.gov/api/v1/amenities?id={acc_query_string}&api_key={api_key}"

acc_request = urllib.request.Request(acc_endpoint)

acc_response = urllib.request.urlopen(acc_request).read()

acc_amenity_data = json.loads(acc_response.decode('utf-8'))

for amenity in acc_amenity_data['data']:
    print(f"{amenity['id']} | {amenity['name']}")

# Accessibility-Adjacent Amenities Query

additional_amenities = [
    "03A732CF-E5FD-473D-A78B-BDC4D20721BF",
    "20291812-E85C-4A84-B8A2-E31C8D149704",
    "48562BFB-834B-43F2-B865-E174C372032B",
    "91062A96-BF79-4719-9679-BB5461B7620A",
    "5BA727FA-943D-418D-A238-44127EBA6EDB",
    "2DEE6458-72F8-4C97-9279-5C3E90B19888",
    "D0D77D00-38EA-40F2-91E3-5FDCE3932A49",
    "29D286B6-069C-4204-AF35-AE7744B71212",
    "4F26643C-FAAF-40CE-85F7-38DEC4746BE6",
    "8741D9DE-239A-4739-9920-4844BB587E6A",
    "9EA123B3-E118-4BE9-BF49-EE93F1BA645B",
    "B108A32A-52A4-4C4E-B178-0276BFBD9555",
    "B760D6E2-3616-4D8B-ABF2-B875B7966831",
    "2883D965-1CA4-4858-B759-A5866CA8A188",
    "D6220FCB-F005-4C26-942C-2BE168819AE3",
    "7B13EFFB-40DA-439C-AB41-9756EC32D22E",
    "94E21603-85F3-48C5-96B6-556E46FA2518",
    "94006F6C-4EEF-489C-B8E6-FF1565E25F84",
    "CC4A51EF-1CB8-4625-9A9B-3AC77AF2F668",
    "F84C0528-0D1A-45A2-B644-B3C059B3D224",
    "23682251-700A-4DE2-8FD8-BD680F53DF82",
    "9A652919-D548-4850-8053-798CDC2C762B"
]

add_query_string = ','.join(additional_amenities)

add_endpoint = f"https://developer.nps.gov/api/v1/amenities?id={add_query_string}&api_key={api_key}"

add_request = urllib.request.Request(add_endpoint)

add_response = urllib.request.urlopen(add_request).read()

add_amenity_data = json.loads(add_response.decode('utf-8'))

for amenity in add_amenity_data['data']:
    print(f"{amenity['id']} | {amenity['name']}")

