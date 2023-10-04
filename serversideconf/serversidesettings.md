# Server Info

ubuntu 22.04

server dns: jakfilms.northeurope.cloudapp.azure.com

## Server SSL Configuration

```apacheconf
<VirtualHost *:443>
    ServerAdmin joonalam@metropolia.fi

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

    ProxyPass /backend/ http://localhost:3002/
    ProxyPassReverse /backend/ http://localhost:3002/
    ProxyPass / http://localhost:3001/
    ProxyPassReverse / http://localhost:3001/

    RewriteEngine on
    RewriteCond %{HTTP:Upgrade} WebSocket [NC]
    RewriteCond %{HTTP:Connection} upgrade [NC]
    RewriteRule ^/?(.*) "ws://localhost:3001/$1" [P,L]

    ServerName jakfilms.northeurope.cloudapp.azure.com
    Include /etc/letsencrypt/options-ssl-apache.conf
    SSLCertificateFile /etc/letsencrypt/live/jakfilms.northeurope.cloudapp.azure.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/jakfilms.northeurope.cloudapp.azure.com/privkey.pem
</VirtualHost>

```

## Crontab settings

```crontab

*/5 * * * * /home/aanderson/update-script.sh

```

## Azure Firewall Settings

| Priority | Name                          | Port | Protocol | Source            | Destination    | Action |
| -------- | ----------------------------- | ---- | -------- | ----------------- | -------------- | ------ |
| 300      | SSH                           | 22   | TCP      | Any               | Any            | Allow  |
| 320      | HTTPS                         | 443  | TCP      | Any               | Any            | Allow  |
| 340      | HTTP                          | 80   | TCP      | Any               | Any            | Allow  |
| 65000    | AllowVnetInBound              | Any  | Any      | VirtualNetwork    | VirtualNetwork | Allow  |
| 65001    | AllowAzureLoadBalancerInBound | Any  | Any      | AzureLoadBalancer | Any            | Allow  |
| 65500    | DenyAllInBound                | Any  | Any      | Any               | Any            | Deny   |

## update script

```bash

#!/bin/bash

# Change to the project directory
cd /home/aanderson/LuxDei

# Start the SSH agent and add the SSH key
eval `ssh-agent -s`
ssh-add /home/aanderson/.ssh/id_ed25519

# Perform a Git pull to update the code
git pull

# Check if changes were pulled (git diff will show changes)
if [[ -n $(git diff) ]]; then
  # If changes were pulled, navigate to the frontend directory
  cd frontend
  npm install
  npm run build
  cd ..
  cd backend
  npm i
fi

```

[update-script.sh](update-script.sh)
