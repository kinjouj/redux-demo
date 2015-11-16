import IDBStore from "idb-wrapper-promisify";
import { DB_NAME } from "../constants";

export default class ServiceDB {

  static addTodo(text) {
    return new Promise((resolve, reject) => {
      var store = ServiceDB.getStore();
      store.ready.then(
        () => store.put({ body: text })
      ).then((id) => {
        store.get(id).then((entry) => {
          resolve([entry]);
        });
      }).catch(error => {
        console.error(error.target.error);
        reject(error);
      });
    });
  }

  static findAll() {
    return new Promise(resolve => {
      var store = ServiceDB.getStore();
      store.ready.then(
        () => store.getAll()
      ).then((entries) => {
        resolve(entries);
      }).catch(error => {
        console.error(error.target.error);
        resolve([]);
      });
    });
  }

  static getStore() {
    return new IDBStore({
      storeName: DB_NAME,
      version: 1,
      indexes: [
        { name: "body", unique: true }
      ]
    });
  }
}
