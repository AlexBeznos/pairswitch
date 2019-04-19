const functions = require('firebase-functions');
const admin = require('firebase-admin');
const withCors = require('./utils').withCors;
const switchFunc = require('./src').switch;

admin.initializeApp();

const container = {
  admin
}
exports.switch = functions.https.onRequest(withCors(switchFunc(container)));
