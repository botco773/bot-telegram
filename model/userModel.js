import { Low, JSONFile } from "lowdb";
const adapter = new JSONFile("./database/user.json");
const db = new Low(adapter);
const userModel = {
  async read() {
    await db.read();
    return db.data;
  },
  async detail(data) {
    await db.read();
    const detail = db.data.find((existData) => existData.id === data.id);
    return detail;
  },
  async insert(data) {
    // inject default lokasi kota jakarta
    data.id_kota_kab = 1301;
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

export default userModel;

