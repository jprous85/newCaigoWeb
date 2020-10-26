import React, {useState} from "react";
import Connect from "./Connect";

class Events {
  private connect = new Connect(Connect.Datatable.EVENT);

  public getAllEvents() {
    return this.connect.getQuery();
  }

}

export default Events;