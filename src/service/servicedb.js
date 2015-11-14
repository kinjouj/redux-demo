import db from "db.js";

import { DB_NAME } from "../constants";

export default class ServiceDB {
  static openDB() {
    return new Promise((resolve) => {
      db.open({
        server: DB_NAME,
        version: 1,
        schema: {
          todo: {
            key: { keyPath: "id", autoIncrement: true },
            indexes: {
              body: { unique: true }
            }
          }
        }
      }).then((server) => {
        resolve(server);
      });
    });
  }
}
