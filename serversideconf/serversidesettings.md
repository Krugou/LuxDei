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

[update-script.sh](URL)
