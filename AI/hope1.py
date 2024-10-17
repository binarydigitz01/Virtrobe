#woman red top perfect code

import cv2
import numpy as np
from PIL import Image

def overlay_cloth_on_avatar(avatar_path, cloth_path, output_path):
    # Load the avatar image
    avatar = Image.open(avatar_path).convert("RGBA")
    # Load the clothing image
    cloth = Image.open(cloth_path).convert("RGBA")

    who = avatar_path.split("_")
    # who = [path.split(".") for path in who]
    print(who)
    what = cloth_path.split(" ")[0]
    print(f"what: {what}")
    # what = [path.split(".") for path in what]

    # Resize the cloth image based on the desired cloth position and avatar size
    avatar_width, avatar_height = avatar.size
    # Initialize cloth_position_x and cloth_position_y with default values
    cloth_position_x = 0
    cloth_position_y = 0

    if "female" in who and "mid" in who:
        if "upper" in what:
            cloth_position_y = 280
            cloth = cloth.resize((300, 260))
            cloth_position_x = int((avatar_width - cloth.size[0]) / 2)

        elif "lower" in what:
            cloth_position_y = 500
            cloth = cloth.resize((215, 280))
            cloth_position_x = int((avatar_width - cloth.size[0]) / 2)

        else:
            return


    if "female" in who and "sa" in who:
        if "upper" in what:
            cloth_position_y = 207
            cloth = cloth.resize((300, 260))
            cloth_position_x = int((avatar_width - cloth.size[0]) / 2)-7
        else:
            return

    if "male" in who and "mid" in who:
        if "upper" in what:
            cloth_position_y = 260
            cloth = cloth.resize((447, 300))
            cloth_position_x = int((avatar_width - cloth.size[0]) / 2)

        elif "lower" in what:
            cloth_position_y = 500
            cloth = cloth.resize((215, 280))
            cloth_position_x = int((avatar_width - cloth.size[0]) / 2)

        else:
            return
    if "male" in who and "sa" in who:
        if "upper" in what:
            cloth_position_y = 197
            cloth = cloth.resize((300, 260))
            cloth_position_x = int((avatar_width - cloth.size[0]) / 2)-7
        else:
            return


    # if cloth_position == 'upper':
    #     # cloth = cloth.resize((int(avatar_width * 0.8), int(avatar_height * 0.35)))
    #     # cloth_position_y = int(avatar_height * 0.365) # Adjust as per the avatar proportion
    #     cloth_position_y = 217
    #     cloth = cloth.resize((215, 260))
    # elif cloth_position == 'lower':
    #     #cloth = cloth.resize((int(avatar_width * 0.5), int(avatar_height * 0.5)))
    #     #cloth_position_y = int(avatar_height * 0.6) # Adjust as per the avatar proportion
    #     cloth_position_y = 375
    #     cloth = cloth.resize((215, 260))
    # else:
    #     print("Invalid cloth position. Use 'upper' or 'lower'.")
    #     return

    # # Position the cloth in the center horizontally
    # cloth_position_x = int((avatar_width - cloth.size[0]) / 2)

    # Create a blank transparent layer for combining the images
    combined = Image.new('RGBA', avatar.size)
    combined.paste(avatar, (0, 0), avatar)

    # Paste the cloth on top of the avatar
    combined.paste(cloth, (cloth_position_x, cloth_position_y), cloth)

    # Convert the result to RGB mode and save it as an output file
    final_image = combined.convert("RGB")
    final_image.save(output_path)

    print(f"Output saved to {output_path}")

# Input paths
avatar_image_path = 'avatar_male_sa_.png'  # Replace with your avatar image path
cloth_image_path = 'upper (14).jpg'    # Replace with your cloth image path
output_image_path = 'overlayed_avatar.png'          # Output path for the combined image

import requests

# response = requests.post(
#     'https://api.remove.bg/v1.0/removebg',
#     files={'image_file': open(cloth_image_path, 'rb')},
#     data={'size': 'auto'},
#     headers={'X-Api-Key': 'RPXQ3N6GaSo5HN5v63Ee4cPh'},
# )

# if response.status_code == requests.codes.ok:
#     with open(cloth_image_path, 'wb') as out:
#         out.write(response.content)
# else:
#     print("Error:", response.status_code, response.text)

# Fit an upper or lower cloth on the avatar ('upper' or 'lower')
overlay_cloth_on_avatar(avatar_image_path, cloth_image_path, output_image_path)
