const functions = require('firebase-functions');
const admin = require('firebase-admin');
const WebClient = require('@slack/web-api').WebClient;

const withCors = require('./utils').withCors;
const switchFunc = require('./src').switch;
const remindFunc = require('./src').remind;
const switchWithRemind = require('./src').switchWithRemind;
const slackClient = new WebClient(functions.config().slack.bot_token)

admin.initializeApp();

const container = {
  admin,
  functions,
  slackClient
}
exports.switch = functions.https.onRequest(withCors(switchFunc(container)));
exports.remind = functions.pubsub.schedule('every wednesday 11:00').timeZone('Europe/Kiev').onRun(remindFunc(container));
exports.switchWithRemind = functions.pubsub.schedule('every wednesday 17:00').timeZone('Europe/Kiev').onRun(switchWithRemind(container));
