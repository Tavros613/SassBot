var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/cool face$/;sassRegex = /^\/sass master$/;sleepRegex = /^\/go to sleep$/;helpRegex = /^\/command help$/;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage(cool());
    this.res.end();
  }else if (request.text && sassRegex.test(request.text)){
  this.res.writeHead(200);
  postMessage("Sass Mattster!");
  this.res.end();
}else if (request.text && sleepRegex.test(request.text)){
  this.res.writeHead(200);
  postMessage('http://1.bp.blogspot.com/-CCjCTfBx3cU/UYsRmIIO5UI/AAAAAAAABc0/hmg70idNAsM/s1600/WonkaWhatIsSleep.jpg');
  this.res.end();
}else if (request.text && helpRegex.test(request.text)){
  this.res.writeHead(200);
    postMessage("/cool face, /sass master, /command help");
  postMessage("Currently Available Commands:");
  this.res.end();
  }else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(req) {
  var botResponse, options, body, botReq;

  botResponse = req;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
