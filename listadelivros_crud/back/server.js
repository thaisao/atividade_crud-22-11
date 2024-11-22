//rota para buscar todos os itens
app.get('/', async (req, res) => { //get é um método http. rota: /
    try {
        const items = await getAllItems(); // chama a função para buscar todos os itens
        res.status(200).json(items); // se a operação der certo,, as respostas contém itens em formato json
    } catch (error) {
        res.status(500).json({ error: error.message }); // quando há um erro, é enviado uma mensagem detalhando o problema
    }
});

// rota para inserir um item
app.post('/insertItem', async (req, res) => { //insertItem é uma rota feita pelo post
    const { title, author } = req.body; // Extrai título e autor do corpo da requisição, quando juntado o post e o inserItem, este é chamado para inserir esses dados no banco de dados
    try {
        const result = await insertItem(title, author); // Chama a função para inserir um item
        res.status(201).json(result); // envia o resultado das inserções
    } catch (error) {
        res.status(500).json({ error: error.message }); // se ocorrer um erro, é enviado uma mensagem com status 500 (Erro interno do servidor)
    }
});


// rota para atualizar um item
app.put('/updateItem/:id', async (req, res) => { //rota: updateItem :id (parâmetro que especifica qual livro será atualizado)
    const { id } = req.params; // quando a requisição put atualiza os livros, extrai o id do parâmetro
    const { title, author } = req.body; // Extrai os novos dados (título e autor) do corpo da requisição

    try {
        // atualiza o item no banco de dados
        const result = await updateItem(id, title, author);
        res.status(200).json(result); // envia o resultado da atualização
    } catch (error) {
        res.status(500).json({ error: error.message }); // se ocorrer um erro, é enviado uma mensagem com status 500 (Erro interno do servidor)
    }
});


// rota para excluir um item
app.delete('/deleteItem/:id', async (req, res) => { //delete é o método http, :id (parâmetro que especifica qual livro será atualizado)
    const { id } = req.params; //extrai o ID do parâmetro da URL

    try {
        // chama a função deleteItem para excluir o livro do banco de dados
        const result = await deleteItem(id);
        res.status(200).json(result); // envia o resultado da exclusão
    } catch (error) {
        res.status(500).json({ error: error.message }); // Envia uma mensagem de erro
    }
});