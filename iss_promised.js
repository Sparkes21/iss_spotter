 const request = require('request-promise-native');


 fetchMyIP = function() {
  return request('https://api.ipify.org?format=json')
 };

 


 fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`)
 };

 fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request (url);
 };

 const nextISSTimesForMyLocation = function () {
  return fetchMyIP() 
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const { response } = JSON.parse(data);
    return response;
  });
}



 module.exports = { nextISSTimesForMyLocation };