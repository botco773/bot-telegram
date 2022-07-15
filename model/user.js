import { Low, JSONFile } from "lowdb";
const adapter = new JSONFile("./database/user.json");
const db = new Low(adapter);
export default {
  async read() {
    await db.read();
    return db.data;
  },
  async insert(data) {
    await db.read();
    if (db.data) {
      if (!db.data.find((existData) => existData.id === data.id))
        db.data.push(data);
    } else {
      db.data = [];
      db.data.push(data);
    }
    await db.write();
  },
};

