# We don't want to start from scratch.
# That is why we tell node here to use the current node image as base.
FROM node:alpine3.11

WORKDIR /sebclient
# Create an application directory
RUN mkdir seb-client

# The /app directory should act as the main application directory
WORKDIR /sebclient/seb-client

# Copy the app package and package-lock.json file
COPY ./SEB-Client /sebclient/seb-client

# Install node packages
RUN npm install

# Copy or project directory (locally) in the current directory of our docker image (/app)
#COPY SEB-Client/ .

# Build the app
RUN npm run build

# Expose $PORT on container.
# We use a varibale here as the port is something that can differ on the environment.
ENV PORT="3000"
EXPOSE $PORT



# Start the app
CMD [ "npm", "start" ]