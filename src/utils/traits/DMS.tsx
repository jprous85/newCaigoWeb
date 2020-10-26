import DMSConnect from "./DMSConnect";

class DMS {

  private connect;

  constructor(datatable: any) {
    this.connect = new DMSConnect(datatable);
  }

  public async findAll() {
    return await this.connect.getQuery();
  }

  public async findBy(
    conditions: object | undefined,
    orders: object | undefined = undefined,
    limit: number | undefined = undefined
  ) {
    if (conditions) this.connect.setFilters(conditions);
    if (orders) this.connect.setOrders(orders);
    if (limit) this.connect.setLimit(limit);
    return await this.connect.getQuery();
  }

  public findById(condition: string) {
    return this.connect.findById(condition);
  }
}

export default DMS;