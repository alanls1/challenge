# Free Dictionary App

## Descrição

Este é um aplicativo móvel desenvolvido para listar palavras em inglês utilizando a Free Dictionary API. O objetivo é exibir termos, significados, fonética e permitir que os usuários gerenciem suas palavras visualizadas e favoritas.

## Tecnologias Utilizadas

### Mobile:

- **Framework:** React Native
- **Estilização:** React Native Paper
- **Gestão de Estado:** Redux para gerenciamento global de dados
- **Banco de Dados Local:** AsyncStorage

### Back-End:

- **Node** Para gerenciamento do servidor
- **express** para autenticação e armazenamento de favoritos/histórico
- **Nodemon** para reiniciar o servidor automaticamente durante o desenvolvimento

## Funcionalidades

- [x] Listagem infinita de palavras
- [x] Exibição dos significados e fonética
- [x] Salvamento e remoção de palavras favoritas
- [x] Lista de palavras visualizadas anteriormente
- [x] Cache de requisições para buscas repetidas

### Diferenciais Implementados

- [x] Tocador de áudio para pronúncia
- [ ] Injeção de dependência
- [ ] Testes unitários/E2E (a desenvolver)
- [ ] Login de usuário com histórico vinculado (a desenvolver)

## Instalação e Uso

1. Clone o repositório:

   ```sh
   git clone https://github.com/seu-usuario/free-dictionary-app.git
   cd free-dictionary-app
   ```

2. Instale as dependências:

   ```sh
   npm install
   # ou
   yarn install
   ```

3. Execute o projeto:
   ```sh
   npm expo start
   # ou
   yarn expo start
   ```

## Estrutura do Projeto

```
/free-dictionary-app
|-- src/
|   |-- components/  # Componentes reutilizáveis
|   |-- pages/       # Telas do aplicativo
|   |-- services/    # Chamadas à API e armazenamento local
|   |-- utils/       # Funções auxiliares e gerenciamento de estado
|   |-- hooks/       # Custom hook para gerenciar as palavras favoritas
|-- App.tsx          # Arquivo principal
|-- README.md        # Documentação
|-- .env             # Arquivo para variáveis de ambiente
```

## Padrões de Código

- Clean Code
- Modularização
- Async/Await para chamadas assíncronas

## API Utilizada

[Free Dictionary API](https://dictionaryapi.dev/)

## Desafios e Decisões Técnicas

Um dos maiores desafios foi definir a melhor abordagem para resgatar todas as palavras e realizar as requisições dos objetos correspondentes. Isso exigiu uma estratégia eficiente para garantir um bom desempenho e evitar chamadas desnecessárias à API.

Uma decisão técnica importante foi a utilização do Redux para gerenciar os dados, pois ele permitiu acessar os objetos de palavras em diversas páginas sem a necessidade de reconsultar a API constantemente, tornando a aplicação mais rápida e responsiva.

## Links

- **Repositório:** [GitHub](https://github.com/alanls1/challenge)
- **Apresentação:** [Link para a apresentação](#)

---

This is a challenge by Coodesh.
