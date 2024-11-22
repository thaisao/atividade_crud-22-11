//essa parte no front, é responsável por gerenciar a interface do usuário, com ações de listar, atualizar, deletar e etc.


import { useState, useEffect } from "react"; //useState gerencia o estado local e o useEffect permite executar a API
import api from "../../api";
import "./styles.css";

function Home() {
    const [title, setTitle] = useState(''); //estado para o título do livro
    const [author, setAuthor] = useState(''); // para o autor
    const [books, setBooks] = useState([]); //para armazenar a lista de livros

    const [editing, setEditing] = useState(null); // armazena o livro que está sendo editado (null quando não há)

    useEffect(() => {
        fetchBooks(); // usado para buscar os livros da api
    }, []);

    // essa função faz uma requisição GET à API para buscar todos os livros e atualiza o estado books com os dados recebidos. Caso haja um erro, ele é informado no console
    const fetchBooks = async () => {
        try {
            const response = await api.get('/');
            setBooks(response.data);
        } catch (error) {
            console.error(`Error ao buscar dados: ${error}`);
        }
    };

    // função chamada quando o formulário é enviado
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (editing) {
                // atualiza um intem (o livro e autor) já existente

                await api.put(`updateItem/${editing.id}`, {
                    title,
                    author,
                });
                setEditing(null); // após preencher a atualização do título e autor e enviar, os campos de texto são esvaziados

            } else {
                // adiciona o novo item após ser editado
                await api.post('/insertItem', {
                    title,
                    author,
                });
            }

            setTitle('');
            setAuthor('');
            fetchBooks(); // atualiza a lista de livros

        } catch (error) {
            console.error('Erro ao inserir/atualizar dados: ', error);
        }
    }

    //quando o botão editar é clicado, essa função é chamada. Ela preenche os campos de entrada com os dados do livro a ser editado e define o estado editing para o livro selecionado.
    const handleEdit = (book) => {
        setTitle(book.title);
        setAuthor(book.author);
        setEditing(book); // especifica o item que está sendo editado
    };

    // quando o botão excluir é clicado, essa função é chamada. Ela envia uma requisição delete para excluir o livro com o id correspondente e, em seguida, atualiza a lista de livros.
    const handleDelete = async (id) => {
        try {
            await api.delete(`/deleteItem/${id}`);
            fetchBooks(); // Atualiza a lista de livros após exclusão
        } catch (error) {
            console.error('Erro ao excluir dados: ', error);
        }
    };

    //renderização da face, elementos HTML
    return (
        <div>
            <h1>{editing ? 'Editar Item' : 'Inserir Novo Item'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título: </label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Autor: </label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <button type="submit">{editing ? 'Atualizar' : 'Inserir'}</button>
                {editing && <button type="button" onClick={() => setEditing(null)}>Cancelar</button>}
            </form>

            <h1>Tabela de Livros</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>
                                <button onClick={() => handleEdit(book)}>Editar</button>
                                <button onClick={() => handleDelete(book.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;