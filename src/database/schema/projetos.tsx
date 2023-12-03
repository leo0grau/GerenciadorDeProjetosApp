export default {
  name: 'Projetos',
  primaryKey: 'id_projeto',
  properties: {
    id_projeto: {type: 'int', indexed: true},
    nome_projeto: 'string',
    inicio: 'string',
    fim: 'string',
    finalizado: 'bool',
  },
};
