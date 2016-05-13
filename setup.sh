#/bin/bash
# Set up script
# run using sudo
if [ "$EUID" -ne 0 ]
  then echo "Please run as root using sudo"
  exit
fi

if [ ! -d "/home/git" ]; then
	useradd git # add git user
	passwd git # add git passwd
fi

mkdir -p /var/git
chmod -R 777 /var/git

echo "Complete! Made folder '/var/git' and updated permissions."
echo "To run server, cd to where it is downloaded and run 'node .'"
