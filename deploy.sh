#!/usr/bin/env bash

set -xe

ssh -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" -i testaws.pem ubuntu@ec2-3-17-150-160.us-east-2.compute.amazonaws.com << EOF
rm -rf Front-End
git clone https://github.com/linaAyman/Front-End.git
cd Front_End
npm install
npm install -g @angular/cli@8.3.5 
rm -rf dist
ng build
sudo service nginx restart
exit
EOF
