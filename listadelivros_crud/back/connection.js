const mysql = require('mysql2/promise') //biblioteca do mysql2

const connection = mysql.createPool({ //createPool é um conjunto de conexões com o banco de dados, que melhora o desempenho principalmente das aplicações que usam muitas requisições ao  banco de dados
    host: 'localhost', //endereço do servidor mysql
    port: 3306, //número da porta do mysql onde está ouvindo
    user: 'root', //nome do usuário do banco de dados
    password: 'root', //senha associada ao usuário do banco de dados
    database: 'teste_node', //nome utilizado no banco de dados
    })

module.exports = connection //connection é onde contém o pool de conexões, quando exportada, ela permite a realização de consultas ao banco de dados