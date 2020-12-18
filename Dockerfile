FROM node
ADD . /app/
WORKDIR /app
RUN npm install -g pm2
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start:pm2"]
