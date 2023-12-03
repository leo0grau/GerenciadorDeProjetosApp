export default {
  name: 'Tarefas',
  primaryKey: 'id_tarefa',
  properties: {
    id_tarefa: {type: 'int', indexed: true},
    nome_tarefa: 'string',
    desc: 'string',
    dataInicio: 'string',
    dataFim: 'string',
    projeto_id: 'int',
    status: 'int',
  },
};
