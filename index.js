// Node.js git server management

// Setup basic express server
var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded());
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

server.listen(port, function () {
	console.log('Server listening at port %d', port);
});

// To get ip
const publicIp = require('public-ip');

var address

publicIp.v4().then(ip => {
    console.log('Public ip is: ' + ip);
	address = ip;
});

// Routing
app.use(express.static(__dirname + '/public'));

// Running system commands
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { console.log(stdout) }
function system(command) {
	exec( command, puts);
}

// For checking if it exists
var fs = require('fs');
function checkFor(dirname) {
	try {
	    // Query the entry
	    stats = fs.lstatSync('/var/git/' +dirname);

	    // Is it a directory?
	    if (stats.isDirectory()) {
	        return true;
	    } else {
	    	return false;
	    }
	}
	catch (e) {
	    return false;
	}
}


// For timestamping logging
function timeStamp() {
// Create a date object with the current time
	var now = new Date();

// Create an array with the current month, day and time
	var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];

// Create an array with the current hour, minute and second
	var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];

// If seconds and minutes are less than 10, add a zero

	for ( var i = 0; i < 3; i++ ) {
		if ( date[i] < 10 ) {
			date[i] = "0" + date[i];
		}
		if ( time[i] < 10 ) {

			time[i] = "0" + time[i];
		}
	}

// Return the formatted string
	return "[" +date.join("/") + " " + time.join(":") +"] "
}
// Custom loggin function
function log(string) {
	console.log(timeStamp() + string);
}

// For escaping requests
var jsesc = require('jsesc');

app.post('/', function (req, res) {
	var finalRemark;
	if(/^[a-zA-Z0-9-_]*$/.test(req.body.reponame) == false) {
		res.send('Your search string contains illegal characters.');
		finalRemark = "Failed: Illegal characters"
	} else if (checkFor(req.body.reponame + '.git')) {
		res.send('That Repo name is already used.')
		finalRemark = "Failed: Repo exists";
	} else {
		res.send('Set remote to \"git@' + address + ':/var/git/' + req.body.reponame + '.git\"');
		finalRemark = "Success"
		system('cd /var/git/ && mkdir ' + req.body.reponame + '.git && cd ' + req.body.reponame + '.git && git init --bare');
	}
	log('New git repo: \"' + req.body.reponame + ".git\" " + finalRemark);

});
