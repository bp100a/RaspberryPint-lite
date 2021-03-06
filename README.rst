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
2) Copy a private key to CircleCI project settings (Settings->Permissions->SSH Permissions)
    a) This has to be in OpenSSH format
    b) make note of the "fingerprint"
3) Copy the public key associated with the PK above to the authorized_keys file on the Pi (~/.ssh)
4) In the CircleCI config.yml file, reference the SSH key fingerprint from step #2
5) In your CircleCI container, install openssh-client
6) In CircleCI you have to add your Raspberry Pi key to the known hosts
    a) from on the Pi get the contents /etc/ssh/ssh_host_ecdsa_key.pub
    b) prefix hostname & ip address: myserver.com,100.10.12.43 <public key>
7) Now you should be able to SCP files to the pi

You should end up with something like this:

.. image:: https://raw.githubusercontent.com/bp100a/RaspberryPint-lite/master/Sample.png
   :height: 500
   :align: center