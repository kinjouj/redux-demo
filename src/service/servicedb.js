import db from "db.js";

import { DB_NAME } from "../constants";

export default class ServiceDB {

  static openDB() {
    return new Promise(resolve => {
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
      }).then(server => {
        resolve(server);
      });
    });
  }

  static addTodo(text) {
    return new Promise((resolve, reject) => {
      ServiceDB.openDB().then(server => {
        server.todo.add({ body: text }).then(entries => {
          resolve(entries);
        }).catch(error => {
          reject(error);
        });
      });
    });
  }

  static findAll() {
    return new Promise(resolve => {
      ServiceDB.openDB().then(server => {
        server.todo.query().all().execute().then(entries => {
          resolve(entries);
        }).catch(error => {
          console.error(error);
          resolve([]);
        });
      });
    });
  }
}
