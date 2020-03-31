#!/usr/bin/env bash

set -xe

ssh -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" -i testaws.pem ubuntu@ec2-3-137-69-49.us-east-2.compute.amazonaws.com << EOF
rm -rf Front-End
git clone https://github.com/linaAyman/Front-End.git
cd Front-End
npm install
rm -rf dist
ng build --prod
sudo systemctl restart nginx
exit
EOF
