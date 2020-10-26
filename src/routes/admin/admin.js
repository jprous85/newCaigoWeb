import React from "react";
import { Route } from 'react-router-dom';

import Index from '../../pages/admin/Index'

const Admin = ({match}) => {
  return (
    <div>
      <Route exact path={[`${match.url}`, `${match.url}/create`]} component={Index} />
      <Route exact path={`${match.url}/update`} component={Index} />
    </div>
  );
}
export default Admin;