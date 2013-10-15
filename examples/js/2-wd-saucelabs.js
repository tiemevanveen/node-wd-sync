// configure saucelabs username/access key here
var username = '<USERNAME>'
, accessKey = '<ACCESS KEY>';

var wdSync; 
try {
  wdSync = require('wd-sync');
} catch (err) {
  wdSync = require('../../index');
}

// 2/ wd saucelabs example 

desired = {
  platform: "LINUX",
  name: "wd-sync demo",
  browserName: "chrome"
};

var client = wdSync.remote(
  "ondemand.saucelabs.com",
    80,
    username,
    accessKey)
  , browser = client.browser
  , sync = client.sync;

sync( function() {

  console.log("server status:", browser.status());
  browser.init(desired);
  console.log("session capabilities:", browser.sessionCapabilities());

  sessionid = browser.sessionCapabilities()['webdriver.remote.sessionid'];
  if(sessionid == null){
    console.log('\x1b[36m%s\x1b[0m', "browser.sessionCapabilities()['webdriver.remote.sessionid'] = undefined!");
  }else{
    console.log('\x1b[36m%s\x1b[0m', browser.sessionCapabilities()['webdriver.remote.sessionid']);
  }

  browser.get("http://google.com");
  console.log(browser.title());

  var queryField = browser.elementByName('q');
  browser.type(queryField, "Hello World");
  browser.type(queryField, "\n");

  browser.setWaitTimeout(3000);
  browser.elementByCss('#ires'); // waiting for new page to load
  console.log(browser.title());

  browser.quit();

});

