#!/bin/bash
#This should launch automatically as root on boot.

pkill gpsd
sleep 1
node /home/pi/carpi/node/gpsd-mounter/gpsd-mounter.js
