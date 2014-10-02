CarPi
=====

A collection of NodeJS scripts I wrote for real-time tracking of my car.

Required software
-----------------

	sudo apt-get install gpsd gpsd-clients nodejs npm

If npm install fails, run

	npm config set registry http://registry.npmjs.org/

You should probably also manually download the latest node build
and manually install it.

The setup
---------
My Pi has a BU-353 gps antenna plugged into it.
Seems to work out of the box.

After installing the node pre-requisites and npm-install on each
module, you should only need to edit each module and run gpsd-mounter.js

gpsd-mounter checks for gpsd crashes, and antenna drop ins/outs. If detected
it should relaunch gpsd with the correct device, and then relaunch gpsloop.


License
-------

The MIT License (MIT)

Copyright (c) 2014 Richard Denton

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.