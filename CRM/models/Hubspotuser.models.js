const { json } = require('body-parser');
const request = require('request-promise');
(async function() {
try{
const contacts =  await request({
method: 'GET',
url: 'https://api.hubapi.com/contacts/v1/lists/all/contacts/recent?hapikey=d71e609d-1c06-46c9-b809-6b3d8874d3fe&property=phone&property=firstname&property=lastname&property=email&count=100',
json: true
});
const makecontacts = private.mask(contacts);
console.log(makecontacts.results[0]);
}
catch(e){
console.log('Error', e);
}
})();