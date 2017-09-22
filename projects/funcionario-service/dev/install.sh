#!/bin/bash

cat > /etc/resolv.conf <<EOT
nameserver 172.16.10.101
search planos.net
EOT
