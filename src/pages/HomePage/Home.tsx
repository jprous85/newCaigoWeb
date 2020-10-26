import React, {useState} from "react";
import { useTranslation } from 'react-i18next';
import Events from "../../utils/traits/Events";
import BasePage from "../BasePage";

const Home = (props: any) => {
  const { t } = useTranslation();
  const { setUid } = props;
  const [data, setData] = useState([]);
  const events = new Events();

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
      <BasePage
        setUid={setUid}
      >
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