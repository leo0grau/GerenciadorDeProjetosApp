export default {
  name: 'User',
  primaryKey: 'id_user',
  properties: {
    id_user: {type: 'int', indexed: true},
    name: 'string',
    email: 'string',
    image_user: 'string',
  },
};
