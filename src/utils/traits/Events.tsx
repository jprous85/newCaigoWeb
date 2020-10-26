import DMSConnect from "./DMSConnect";
import DMS from "./DMS";

class Events extends DMS {
  constructor() {
    super(DMSConnect.Datatable.EVENTS);
  }
}

export default Events;