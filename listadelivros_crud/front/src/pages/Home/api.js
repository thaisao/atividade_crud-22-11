import axios from 'axios' //o axios retorna uma função que pode ser utilizada para fazer requisições como get, post, put, delete, entre outras.

const api = axios.create({ //aqui é criado uma instãncia chamada api (instância personalizada do axios com config específicas)
    baseURL: 'http://localhost:3003/' // o parâmetro baseUrl está sendo configurado para este endereço, o que significa que todas as requisições terão essa URL como base
})

export default api; //exporta a instância configurada, para que ela possa ser configurada em outros arquivos do projeto