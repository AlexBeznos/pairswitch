const switcher = require('./switch').switcher;

const formatedHeader = {
  type: 'section',
  text: {
    type: 'mrkdwn',
    text: "Hi all!:spock-hand:\nPairs has been changed) So current pairs looks like with:"
  }
}
const divider = {
  type: "divider"
}

const formatTaskParticipant = ({name}) => ({
  type: 'mrkdwn',
  text: `*${name}*`
})

const prepareTaskName = (name) => {
  const matcher = name.match(/(?:__|[(*#)])|\[(.*?)\]\((.*)?\)/);

  if(matcher) {
    return matcher[1] 
  } else {
    return name
  }
}

const formatTaskBlock = (task) => {
  const taskName = prepareTaskName(task.title);
  const formattedDevs = task.participants.map((dev) => formatTaskParticipant(dev))

  return {
		type: 'section',
		text: {
			type: 'mrkdwn',
			text: `:clipboard: *${taskName}*`
		},
		fields: formattedDevs
	}  
}

const formatBlocks = (tasks) => {
  let blocks = [formatedHeader];

  tasks.forEach((task) => {
    blocks.push(divider)
    blocks.push(formatTaskBlock(task))
  })

  return blocks;
}

const prepareDbParticipants = (devs) => Object.keys(devs).map((id) => ({name: devs[id].name}))

const prepareDbTask = (tasks) => (id) => ({
  title: tasks[id].title,
  participants: prepareDbParticipants(tasks[id].participants)
})

const switchWithRemind = ({admin, slackClient, functions}) => async () => {
  await switcher({admin})

  const db = admin.database();
  const snapshot = await db.ref('tasks/').once('value');
  const dbTasks = snapshot.val();
  const tasks = Object
    .keys(dbTasks)
    .map(prepareDbTask(dbTasks))
  const formattedBlocks = formatBlocks(tasks);

  slackClient.chat.postMessage({
    channel: functions.config().slack.channel_id,
    blocks: formattedBlocks
  })

  return;
}

module.exports = switchWithRemind;
