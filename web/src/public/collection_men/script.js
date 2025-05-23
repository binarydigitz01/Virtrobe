function toggleChatWindow() {
  const chatWindow = document.getElementById("chatWindow");
  chatWindow.style.display = (chatWindow.style.display === "block") ? "none" : "block";
}

async function getImages(query) {
  const url = "/api/chatbot?" + new URLSearchParams({ token: '32a5999c-22f1-4209-a89a-8117b48d517b', data: query }).toString();
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}


async function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  let images = await getImages(userInput);
  images = images.split("\n");
  console.log(images);
  const chatOutput = document.getElementById("chat-output");
  // Add user's message
  const userMessage = document.createElement("div");
  userMessage.className = "message user-message";
  userMessage.textContent = userInput;
  chatOutput.appendChild(userMessage);

  // Clear the input field
  document.getElementById("user-input").value = "";

  // Add bot image response
  const botResponse = document.createElement("div");
  botResponse.className = "message bot-message";
  const botImage = document.createElement("img");
  botImage.src = "/" + images[0]; // Replace with any image link.
  botImage.alt = "Bot Response";
  botImage.className = "bot-image";
  botResponse.appendChild(botImage);
  chatOutput.appendChild(botResponse);

  const new_resp = document.createElement("div");
  const avatarImage = document.createElement("img");
  avatarImage.src = "/api/avatar?"+ new URLSearchParams({outfit:"/"+images[0]});
  avatarImage.className = "bot-image";
  new_resp.appendChild(avatarImage);
  chatOutput.appendChild(new_resp);


  // Increase chat window size by 20% when image is added
  increaseChatWindowSize();

  // Scroll to bottom after message is added
  chatOutput.scrollTop = chatOutput.scrollHeight;


}


function increaseChatWindowSize() {
  const chatWindow = document.getElementById("chatWindow");
  chatWindow.style.transform = "scale(1.60)"; // Scale the chat window
  chatWindow.style.transformOrigin = "bottom right"; // Scale from bottom right
}
