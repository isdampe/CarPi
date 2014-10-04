#!/bin/bash
#This should launch automatically as root on boot.
#You can do this by adding the following to /etc/rc.local
#
#sudo bash ~/carpi/bash/carpi-launch.sh &

pkill gpsd
sleep 1
node /home/pi/carpi/node/gpsd-mounter/gpsd-mounter.js
