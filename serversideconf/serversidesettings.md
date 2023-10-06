# Server Info

## Virtual Machine Configuration

- **Name:** jakfilms
- **Resource ID:** `/subscriptions/bb1077b3-7619-4477-a12f-7dfe5730507a/resourceGroups/jakfilms_group/providers/Microsoft.Compute/virtualMachines/jakfilms`
- **Type:** Microsoft.Compute/virtualMachines
- **Location:** northeurope
- **Provisioning State:** Updating
- **VM ID:** 44772489-4a10-4f07-b349-ff016faa317b

### Hardware Profile

- **VM Size:** Standard_B1ms

### Storage Profile

- **Image Reference:**
  - **Publisher:** canonical
  - **Offer:** 0001-com-ubuntu-server-jammy
  - **SKU:** 22_04-lts-gen2
  - **Version:** latest
  - **Exact Version:** 22.04.202309190
- **OS Disk:**
  - **OS Type:** Linux
  - **Name:** jakfilms_OsDisk_1_8a5b8b1d17a14d3ea953d773795cb8d8
  - **Create Option:** FromImage
  - **Caching:** ReadWrite
  - **Managed Disk:**
    - **Storage Account Type:** StandardSSD_LRS
    - **ID:** `/subscriptions/bb1077b3-7619-4477-a12f-7dfe5730507a/resourceGroups/JAKFILMS_GROUP/providers/Microsoft.Compute/disks/jakfilms_OsDisk_1_8a5b8b1d17a14d3ea953d773795cb8d8`
  - **Delete Option:** Delete
  - **Disk Size GB:** 30
- **Data Disks:** []

### OS Profile

- **Computer Name:** jakfilms
- **Admin Username:** operator
- **Linux Configuration:**
  - **Disable Password Authentication:** false
  - **Provision VM Agent:** true
  - **Patch Settings:**
    - **Patch Mode:** ImageDefault
    - **Assessment Mode:** ImageDefault
- **Secrets:** []
- **Allow Extension Operations:** true
- **Require Guest Provision Signal:** true

### Security Profile

- **UEFI Settings:**
  - **Secure Boot Enabled:** true
  - **vTpm Enabled:** true
- **Security Type:** TrustedLaunch

### Network Profile

- **Network Interfaces:**
  - **ID:** `/subscriptions/bb1077b3-7619-4477-a12f-7dfe5730507a/resourceGroups/jakfilms_group/providers/Microsoft.Network/networkInterfaces/jakfilms467_z1`
  - **Delete Option:** Delete

### Diagnostics Profile

- **Boot Diagnostics:**
  - **Enabled:** true

### Zones

- Zone: 1

### Resources

- **Name:** enablevmAccess
- **ID:** `/subscriptions/bb1077b3-7619-4477-a12f-7dfe5730507a/resourceGroups/jakfilms_group/providers/Microsoft.Compute/virtualMachines/jakfilms/extensions/enablevmAccess`
- **Type:** Microsoft.Compute/virtualMachines/extensions
- **Location:** northeurope
- **Properties:**
  - **Auto Upgrade Minor Version:** true
  - **Provisioning State:** Updating
  - **Publisher:** Microsoft.OSTCExtensions
  - **Type:** VMAccessForLinux
  - **Type Handler Version:** 1.5

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

## pm2 config

```javascript
module.exports = {
  apps : [{
    name: "FileServer",
    script: "./jakfilmsserver.js",
    watch: true,
    watch_delay: 1000,
    min_uptime: 10000,
  },
  {
    name   : "ChatDatabase",
    script: "./jakfilmsData.js",
    watch: true,
    watch_delay: 1000,
    min_uptime: 10000,

  }]
}
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
