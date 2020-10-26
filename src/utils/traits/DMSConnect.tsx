import React from "react";
import {firebaseApp} from '../firebase.js';
import firebase from "firebase";
import {DATATABLE} from "../Constants";

const db = firebase.firestore(firebaseApp);

class Connect {
  static Datatable = DATATABLE;
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
    let query = db.collection(datatable);
    if (filters) {
      filters.map((f: any) => {
        // @ts-ignore
        query = query.where(f.field, f.condition, f.value);
      });
    }
    if (orders) {
      orders.map((m: any) => {
        // @ts-ignore
        query = query.orderBy(m.field, m.order);
      })
    }
    if (limit) {
      // @ts-ignore
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

  public async findById(id: string) {
    let queryArray: any = [];
    await db.collection(this.datatable)
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

export default Connect;