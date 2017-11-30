#!/bin/bash

cd /home/ubuntu/server/
sudo chmod 777 -R /home/ubuntu/server/backend
sudo chmod 777 -R /home/ubuntu/server/frontend
cd /home/ubuntu/server/backend
sudo mv /home/ubuntu/server/node_modules /home/ubuntu/server/backend/node_modules
npm install
cd /home/ubuntu/server/backend/server
pm2 restart loopback --update-env
sudo service nginx reload