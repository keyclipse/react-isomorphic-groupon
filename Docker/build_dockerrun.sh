#!/usr/bin/env bash
USER="keyclipse"
REPO="react-isomorprhic-trinity"
VERSION=$(git describe --tags)

cat << EOF
{
  "AWSEBDockerrunVersion": "1",
  "Image": {
    "Name": "$USER/$REPO:$VERSION",
    "Update": "true"
  },
  "Ports": [
    {
      "ContainerPort": "8080"
    }
  ],
  "Logging": "/var/log/"
}
EOF
