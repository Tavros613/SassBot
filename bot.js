var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
   var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/cool guy$/;

  if (request.text == "#help"){
  this.res.writeHead(200);
  postMessage('https://docs.google.com/document/d/1Uv2hNQ1BI8xESlJOp1NBJjwHb13ro1oIUwykRvG9uAs/edit?usp=sharing');
  postMessage("This is a great resource that should answer all of your questions!");
  this.res.end();
  }else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}
function reverse(s) {
  return s.split('').reverse().join('');
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
