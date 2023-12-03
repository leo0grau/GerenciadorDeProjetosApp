import Realm from 'realm';
//esquemas
import User from './schema/user';
import Tarefas from './schema/tarefas';

import Projetos from './schema/projetos';

// import Config from '../schema/config';
export default async function getRealm() {
  return await Realm.open({
    schema: [User, Tarefas, Projetos],
    schemaVersion: 1,
  });
}
