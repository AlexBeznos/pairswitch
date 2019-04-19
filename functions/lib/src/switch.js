const prepareDev = (taskId, participants) => (id) => ({
  id,
  taskId,
  name: participants[id].name
}) 

const prepareTasks = (tasks) => (id) => {
  let currentTask = tasks[id];
  currentTask.participants = Object
    .keys(currentTask.participants)
    .map(prepareDev(id, currentTask.participants))

  return {
    id, 
    participants: tasks[id].participants
  }
}

const switchFunc = ({admin}) => (req, res) => async () => {
  const db = admin.database();
  const snapshot = await db.ref('tasks/').once('value');
  const dbTasks = snapshot.val();
  const tasks = Object
    .keys(dbTasks)
    .map(prepareTasks(dbTasks))
    .filter((task) => task.participants.length === 2)

  const tasksLength = tasks.length;
  const devIndex = Math.round(Math.random());
  let changeSet = {};

  for(i = 0; i < tasksLength; i++) {
    const nextIndex = i === (tasksLength -1) ? 0 : i+1
    const currentTask = tasks[i];
    const nextTask = tasks[nextIndex];
    const devOnHold = currentTask.participants[devIndex];

    changeSet[`${currentTask.id}/participants/${devOnHold.id}`] = null;
    changeSet[`${nextTask.id}/participants/${devOnHold.id}`] = {name: devOnHold.name};
  }


  await db
    .ref('tasks/')
    .update(changeSet)

  return res.status(200).end();
}

module.exports = switchFunc;
