# Server Info


```json
{
    "name": "jakfilms",
    "id": "/subscriptions/bb1077b3-7619-4477-a12f-7dfe5730507a/resourceGroups/jakfilms_group/providers/Microsoft.Compute/virtualMachines/jakfilms",
    "type": "Microsoft.Compute/virtualMachines",
    "location": "northeurope",
    "properties": {
        "hardwareProfile": {
            "vmSize": "Standard_B1ms"
        },
        "provisioningState": "Updating",
        "vmId": "44772489-4a10-4f07-b349-ff016faa317b",
        "storageProfile": {
            "imageReference": {
                "publisher": "canonical",
                "offer": "0001-com-ubuntu-server-jammy",
                "sku": "22_04-lts-gen2",
                "version": "latest",
                "exactVersion": "22.04.202309190"
            },
            "osDisk": {
                "osType": "Linux",
                "name": "jakfilms_OsDisk_1_8a5b8b1d17a14d3ea953d773795cb8d8",
                "createOption": "FromImage",
                "caching": "ReadWrite",
                "managedDisk": {
                    "storageAccountType": "StandardSSD_LRS",
                    "id": "/subscriptions/bb1077b3-7619-4477-a12f-7dfe5730507a/resourceGroups/JAKFILMS_GROUP/providers/Microsoft.Compute/disks/jakfilms_OsDisk_1_8a5b8b1d17a14d3ea953d773795cb8d8"
                },
                "deleteOption": "Delete",
                "diskSizeGB": 30
            },
            "dataDisks": []
        },
        "osProfile": {
            "computerName": "jakfilms",
            "adminUsername": "operator",
            "linuxConfiguration": {
                "disablePasswordAuthentication": false,
                "provisionVMAgent": true,
                "patchSettings": {
                    "patchMode": "ImageDefault",
                    "assessmentMode": "ImageDefault"
                }
            },
            "secrets": [],
            "allowExtensionOperations": true,
            "requireGuestProvisionSignal": true
        },
        "securityProfile": {
            "uefiSettings": {
                "secureBootEnabled": true,
                "vTpmEnabled": true
            },
            "securityType": "TrustedLaunch"
        },
        "networkProfile": {
            "networkInterfaces": [
                {
                    "id": "/subscriptions/bb1077b3-7619-4477-a12f-7dfe5730507a/resourceGroups/jakfilms_group/providers/Microsoft.Network/networkInterfaces/jakfilms467_z1",
                    "properties": {
                        "deleteOption": "Delete"
                    }
                }
            ]
        },
        "diagnosticsProfile": {
            "bootDiagnostics": {
                "enabled": true
            }
        }
    },
    "zones": [
        "1"
    ],
    "resources": [
        {
            "name": "enablevmAccess",
            "id": "/subscriptions/bb1077b3-7619-4477-a12f-7dfe5730507a/resourceGroups/jakfilms_group/providers/Microsoft.Compute/virtualMachines/jakfilms/extensions/enablevmAccess",
            "type": "Microsoft.Compute/virtualMachines/extensions",
            "location": "northeurope",
            "properties": {
                "autoUpgradeMinorVersion": true,
                "provisioningState": "Updating",
                "publisher": "Microsoft.OSTCExtensions",
                "type": "VMAccessForLinux",
                "typeHandlerVersion": "1.5"
            }
        }
    ]
}
```

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
