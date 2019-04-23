const reminder = ({slackClient, functions}) => () => {
  slackClient.chat.postMessage({
    channel: functions.config().slack.channel_id,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: "Hey there:hand:!\nLets actualise our tasks and pairs to be able to switch them in time."
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'PairSwitch :smile_cat:',
            emoji: true
          },
          url: 'https://pairswitch.firebaseapp.com',
          value: 'link_click_123'
        }
      }
    ]
  })
}

module.exports = reminder;
