RaspberryPint-lite
=========================

Overview
--------

Based on the RaspberryPint tap management software, I basically
copied the style and images to create a Javascript only
implementation.
For just a tap list didn't need a database and all the
administrative overhead. Added some data for BJCP styles and SRM colors,
but basically edit beerlist.js and you are good to go.

The file taplist.html is loaded in a chromium browser at startup

/home/pi/.config/lxsession/LXDE-pi/autostart

SSH access
----------
The steps to authorize the CircleCI process to have SSH access
to the Raspberry Pi is as follows:

1) Create SSH key
2) Copy private key to CircleCI project settings (Settings->Permissions->SSH Permissions)
    a) make note of the "Fingerprint"
3) Copy the public key to the authorized_keys file on the Pi (~/.ssh)
4) In the CircleCI config.yml file, copy the SSH key fingerprint
5) In your CircleCI container, install openssh-client
6) scp files to the pi
