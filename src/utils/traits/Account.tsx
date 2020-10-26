import DMS from "./DMS";
import DMSConnect from "./DMSConnect";
import firebase from "firebase";

class Account extends DMS {

  protected userDB: any;

  constructor() {
    super(DMSConnect.Datatable.USERS);
    this.userDB = DMSConnect.db.collection(DMSConnect.Datatable.USERS);
  }

  public getCurrentUser() {
    return firebase.auth().currentUser?.uid || null;
  }

  public async login(email: string, password: string) {
    let account: firebase.auth.UserCredential | string = '';
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((e) => {
        account = e;
      })
      .catch((e) => {
        account = e;
      });
    return account;
  }

  public async logout() {
    await firebase.auth().signOut();
  }

}

export default Account;