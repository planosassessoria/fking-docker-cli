#!/bin/bash

cat > /etc/resolv.conf <<EOT
nameserver 172.16.10.101
search planos.net
EOT

git clone -b master https://2e98bd396757e8e362e3e4d5cc82d812e92b69a2:x-oauth-basic@github.com/planosassessoria/funcionario-service.git /home/node/funcionario-service

cd /home/node/funcionario-service

npm install

npm install -g pm2
