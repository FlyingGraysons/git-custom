# Git-Custom
A custom git server program written in node.js.
This program can run on a server and allow infinite private repos.

## To run
On a remote server, run these commands to set up and start.
The setup script will add a user account __git__ (if it doesnt exist already) which users will use to access their repos.
```bash
# Clone repo
git clone https://github.com/FlyingGraysons/git-custom.git && cd git-custom
# Configure filesystem
sudo bash setup.sh # Made with linux systems in mind
# Install node dependencies
npm install
# Run
node .
```
The instructions to use the repos are all on the website that will be created.

The default port is 3000, but this can be changed with an environment variable named `PORT` set to the new port number.
```bash
# For example, to use port 80
export PORT=80
node . # To run
```

Follow these instructions on your local (client) machine to cache the server password: https://help.github.com/articles/caching-your-github-password-in-git
