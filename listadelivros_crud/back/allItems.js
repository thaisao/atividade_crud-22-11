const connection = require('./connection')  //importando a conexão com o banco de dados


//função responsável por pegar todos os dados do book no banco de dados
const getAllItems = async () => {
    try {
        const[query] = await connection.execute('SELECT * FROM teste_node.book') //executa o mysql para buscar todos os registros da tabela book
        //a palavra await serve para esperar que toda execução do mysql termine para prosseguir com o código
        return query //query seria o resultado de todos os registros da tabela
    } catch (error) {
        throw new Error(`Erro ao buscar itens: ${error.message}`) //quando houver erro no código, o catch é respondável por pegar e lançar uma mensagem detalhada do erro
    }
}

//função para inserir um novo livro e autor do livro na tabela book
async function insertItem(title, author){
    try{
        const insertQuery = "INSERT INTO book (title, author) VALUES (?, ?)" //função de inserir um novo registro na tabela, utilizando parâmetros para evitar provlemas de segurança.
        const values = [title, author] //o values contém o valor que é inserido na tabela (autores e livros)

        const[result] = await connection.execute(insertQuery, values) //executa a inserção de valores, trocando os parâmetros pelos títulos e autores
        return result //traz o resultado
    } catch(error){
        throw new Error(`Erro ao inserir item: ${error.message}` ) //quando houver erro no código, o catch é respondável por pegar e lançar uma mensagem detalhada do erro
    }
}

// essa função atualiza os dados existentes da tabela book
const updateItem = async (id, title, author) => {
    try {
        const updateQuery = "UPDATE book SET title = ?, author = ? WHERE id = ?"; //atualiza o título e o autor do livro com base no seu id
        const values = [title, author, id]; //contém nos novos nomes, títulos e autores
        const [result] = await connection.execute(updateQuery, values); //responsável por passar os valores dessas informações atualizadas
        return result; //retorna o resultado desta função
    } catch (error) {
        throw new Error(`Erro ao atualizar item: ${error.message}`); //quando houver erro no código, o catch é respondável por pegar e lançar uma mensagem detalhada do erro
    }
};

// essa função exclui um valor da tabela book
const deleteItem = async (id) => {
    try {
        const deleteQuery = "DELETE FROM book WHERE id = ?"; //serve para excluir um livro e autor da tabela book
        const values = [id]; //aqui contém o id do item deletado
        const [result] = await connection.execute(deleteQuery, values); //executa a ação de excluir os valores, passando o id para um parâmetro
        return result;
    } catch (error) {
        throw new Error(`Erro ao excluir item: ${error.message}`); //quando houver erro no código, o catch é respondável por pegar e lançar uma mensagem detalhada do erro
    }
};


module.exports = { getAllItems, insertItem, updateItem, deleteItem }; //para exportar todas essas funções em um crud