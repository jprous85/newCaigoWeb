import React, {useState} from "react";
import { useTranslation } from 'react-i18next';
import Events from "../../../utils/traits/Events";
import Account from "../../../utils/traits/Account";
// @ts-ignore
import { useHistory } from "react-router-dom";
import BasePage from "../BasePage";

const Home = (props: any, context:any) => {
  const { isLogin, setIsLogin } = props;
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const history = useHistory();

  const events = new Events();
  const account = new Account();

  const login = () => {
    account.login('jprous.caigo@gmail.com', '1234567').then((e:string | any) => {
      if (e.operationType === 'signIn') {
        setIsLogin(true);
        history.push( '/admin')
      }
    })
  }

  const logout = () => {
    account.logout();
  }

  useState( () => {
    events.findBy([
      {
        field: 'status',
        condition: '==',
        value: 'published'
      },
      {
        field: 'start_time',
        condition: '>=',
        value: new Date().toISOString()
      }
    ],
      [
        {
          field: 'start_time',
          order: 'asc'
        },
        {
          field: 'priority',
          order: 'desc'
        }
      ]
    ).then((e) => {
      setData(e);
    });

  });
  return (
    <div>
      <BasePage>
        {t('helloWold')}
        <ul>
          {data && data.map((de: any) => {
            return (<li key={de.id}>{de.name}</li>);
          })}
        </ul>
      </BasePage>
    </div>
  );
}

export default Home;