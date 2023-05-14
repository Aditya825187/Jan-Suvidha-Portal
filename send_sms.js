// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid ="AC5052563d4805d00c4cb544146d26e6c7";
const authToken = "fbbabfa5e3b8589cfd5f63f300282369";
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+1 640 333 8681',
     to: '+917046661140'
   })
  .then(message => console.log(message.sid));
