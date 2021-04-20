/* eslint-disable no-await-in-loop */
const haiku = require("./haiku");

const users: any = {};

// Random ID until the ID is not in use
async function randomID() {
  let id = haiku();
  while (id in users) {
    await Promise.delay(5);
    id = haiku();
  }
  return id;
}

exports.create = async (socket: any) => {
  const id = await randomID();
  users[id] = socket;
  return id;
};

exports.get = (id: number) => users[id];

exports.remove = (id: number) => delete users[id];
