import { Low, JSONFile } from "lowdb";
const DB_NAME = "user";
const adapter = new JSONFile(`./database/${DB_NAME}.json`);
const db = new Low(adapter);
const DEFAULT_LOCATION = { id: 1301, lokasi: "KOTA JAKARTA" };
const userModel = {
  async read() {
    await db.read();
    return db.data;
  },
  async detail(id) {
    await db.read();
    const detail = db.data.find((existData) => existData.user.id === id);
    return detail;
  },
  async createUser(data) {
    // inject default lokasi kota jakarta
    data.location = DEFAULT_LOCATION;
    await db.read();
    if (db.data) {
      let findUser = db.data.find(
        (existData) => existData.user.id === data.user.id
      );
      if (findUser) {
        // update history
        let findUser = db.data.find((user) => user.user.id === data.user.id);
        findUser.history = data.history;
        db.data = db.data.filter((user) => user.user.id !== data.user.id);
        db.data.push(findUser);
      } else {
        db.data.push(data);
      }
    } else {
      db.data = [];
      db.data.push(data);
    }
    await db.write();
  },
  async update(data) {
    await db.read();
    let findUser = db.data.find(
      (existData) => existData.user.id === data.user.id
    );
    if (findUser) {
      // update history
      let findUser = db.data.find((user) => user.user.id === data.user.id);
      findUser.location = data.location;
      db.data = db.data.filter((user) => user.user.id !== data.user.id);
      db.data.push(findUser);
    }
    await db.write();
  },
};

export default userModel;
