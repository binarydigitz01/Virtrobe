import os
from PIL import Image
import google.generativeai as genai
from fuzzywuzzy import process

# Configure the Gemini API
genai.configure(api_key="AIzaSyDNaki4Nif7hnhTJsvJsHQqu7-lkCTXHAY")

# Define the base directory where images are stored
base_dir = os.path.abspath("../Collection")

# Possible keyword categories
genders = ["Men", "Women"]
wear_types = ["Formal", "Casual", "Party", "Winter", "Summer"]
colors = ["black", "red", "green", "grey", "blue", "white"]

# Function to extract keywords using Gemini API
def extract_keywords_from_gemini(user_input):
    model_name = "gemini-1.5-flash"
    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 64,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain",
    }

    model = genai.GenerativeModel(
        model_name=model_name,
        generation_config=generation_config,
    )

    chat_session = model.start_chat(history=[])
    prompt = (
        "Go through this user prompt, and give me a string of keywords that belong "
        "to my list. Convert words outside my list that are similar to words in my "
        "list. My list includes {Men, Women, formals, casual, party, winter, summer, black, red, green, grey, blue, white}. "
        "Just give me a list of keywords and nothing else. "
        f"User prompt --- {user_input}"
    )

    response = chat_session.send_message(prompt)
    return response.text.strip().split(", ")

# Function to find the best match for a given word using fuzzy matching
def find_best_match(word, choices):
    match, score = process.extractOne(word, choices)
    return match if score >= 80 else None  # Adjust the threshold as needed

# Function to extract the gender, wear_type, and color using fuzzy matching
def get_keywords_from_gemini(gemini_keywords):
    gender = None
    wear_type = None
    color = None

    # Iterate through the Gemini API results to find the best matches for gender, wear_type, and color
    for keyword in gemini_keywords:
        if not gender:
            gender = find_best_match(keyword, genders)
        if not wear_type:
            wear_type = find_best_match(keyword, wear_types)
        if not color:
            color = find_best_match(keyword, colors)
    return gender, wear_type, color

# Function to generate folder path
def get_image_path(gender, wear_type, color):
    folder_path = os.path.join(gender, wear_type, color)
    folder_paths = [os.path.join(folder_path,i) for i in os.listdir(os.path.abspath(os.path.join(os.curdir,'../Collection/',folder_path)))]
    return folder_paths

# Function to display images from the folder
# def display_images(folder_path):
#     if os.path.exists(folder_path):
#         image_files = [f for f in os.listdir(folder_path) if f.endswith(('.png', '.jpg', '.jpeg'))]
#         if image_files:
#             for img_file in image_files:
#                 img_path = os.path.join(folder_path, img_file)
#                 img = Image.open(img_path)
#                 # st.image(img, caption=img_file, use_column_width=True)
#         else:
#             st.write("No images found in this folder.")
#     else:
#         st.write("Folder not found.")



# Chat input
# user_input = st.text_input("Ask for images (e.g., 'Show male formals in black'):")
user_input = input()

# Process user input and extract keywords using Gemini API
if user_input:
    gemini_keywords = extract_keywords_from_gemini(user_input)
    gender, wear_type, color = get_keywords_from_gemini(gemini_keywords)

    if not gender:
        import sys
        args = sys.argv
        if not gender:
            if "male" in args:
                gender = "Men"
            else:
                gender = "Women"


    if wear_type and color:
        folder_paths = get_image_path(gender, wear_type, color)
        print("\n".join(folder_paths),end="")
    else:
        print("Could not understand your query. Please make sure to mention wear type and color.")
