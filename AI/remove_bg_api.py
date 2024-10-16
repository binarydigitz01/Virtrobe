import requests

response = requests.post(
    'https://api.remove.bg/v1.0/removebg',
    files={'image_file': open("C:\\Users\\Mangalam\\Downloads\\OOTDiffusion-main\\run\\examples\\garment\\02305_00.jpg", 'rb')},
    data={'size': 'auto'},
    headers={'X-Api-Key': 'k27PVbqFgBRQz*********'},
)
if response.status_code == requests.codes.ok:
    with open('no-bg.png', 'wb') as out:
        out.write(response.content)
else:
    print("Error:", response.status_code, response.text)