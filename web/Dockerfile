# Step 1: Specify a base image
FROM node:latest

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install --dev

# If you're using a production environment, you can use:
# RUN npm ci --only=production

# Step 5: Copy all the source files to the working directory
COPY . .

# Step 6: Expose the port the app runs on (e.g., 3000)
EXPOSE 3000

# Step 7: Define the default command to run your app
CMD ["npm", "run", "dev"]
