import {firebaseApp} from '../firebase.js';
import firebase from "firebase";
import {DATATABLE} from "../Constants";

const db = firebase.firestore(firebaseApp);

class DMSConnect {
  static Datatable = DATATABLE;
  static db = db;
  protected datatable;
  protected filters: any;
  protected orders: any;
  protected limit: number | undefined;

  constructor(datatable: string) {
    this.datatable = datatable;
  }

  public setFilters(filters: any) {
    this.filters = filters;
  }

  public setOrders(orders: any) {
    this.orders = orders;
  }

  public setLimit(limit: number) {
    this.limit = limit;
  }

  public async getQuery() {
    let queryArray:any = [];
    const {datatable, filters, limit, orders} = this;
    let query: firebase.firestore.Query<firebase.firestore.DocumentData> = db.collection(datatable);
    if (filters) {
      filters.map((f: any) => {
        return query = query.where(f.field, f.condition, f.value);
      });
    }
    if (orders) {
      orders.map((m: any) => {
        return query = query.orderBy(m.field, m.order);
      })
    }
    if (limit) {
      query = query.limit(limit);
    }
    await query.get()
      .then((response) => {
        response.forEach((doc) => {
          let jsonData = doc.data();
          jsonData.id = doc.id;
          queryArray.push(jsonData);
        })
      });
    return queryArray;
  }

  public findById(id: string) {
    let queryArray: any = [];
    db.collection(this.datatable)
      .doc(id)
      .get()
      .then(doc => {
        let jsonData = doc.data();
        // @ts-ignore
        jsonData.id = doc.id;
        queryArray.push(jsonData);
      });
    return queryArray;
  }
}

export default DMSConnect;