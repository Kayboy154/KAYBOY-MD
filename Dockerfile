FROM node:lts-buster

# Clone the repository into /root/KAYBOY-MD
RUN git clone https://github.com/mayelprince/KAYBOY-MD.git /root/KAYBOY-MD

# Set working directory
WORKDIR /root/KAYBOY-MD

# Install dependencies
RUN npm install && npm install -g pm2 || yarn install --network-concurrency 1

# Expose port
EXPOSE 9090

# Start the bot with node index.js
CMD ["node", "index.js"]
