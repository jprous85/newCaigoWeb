import React from "react";
import Connect from "./Connect";

class DTO {

  private connect;

  constructor(datatable: any) {
    this.connect = new Connect(datatable);
  }

  public async findAll() {
    return await this.connect.getQuery();
  }

  public async findBy(conditions: object | undefined, orders: object | undefined) {
    if (conditions) this.connect.setFilters(conditions);
    if (orders) this.connect.setOrders(orders);
    return await this.connect.getQuery();
  }

  public async findById(condition: string) {
    return await this.connect.findById(condition);
  }
}

export default DTO;