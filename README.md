# Projeto Angular - Informações Musicais
Este projeto é uma Single Page Application (SPA) desenvolvida em Angular, que exibe informações detalhadas sobre músicas, álbuns e outros trabalhos de um artista ou banda. A aplicação consome a API do Spotify para obter dados atualizados e permite que os usuários interajam com as informações.
[//], além de possibilitar a administração de novos conteúdos.

## Funcionalidades
- **Exploração de Músicas e Álbuns**: Visualize detalhes sobre músicas, álbuns e discografias do artista escolhido.
- **Autenticação com Spotify**: Usuários podem logar com suas contas do Spotify via OAuth2.
- **Gerenciamento de Playlists**: Adicione músicas às playlists, edite e remova músicas diretamente da aplicação.
- **Página Fã-Admin**: Área reservada para usuários administradores cadastrarem novos trabalhos do artista.
- **Design Responsivo**: Interface moderna e responsiva, criada com Angular Material.

## Tecnologias Utilizadas
- **Angular**: Framework principal para desenvolvimento da aplicação.

## Estrutura do Projeto
O projeto está organizado em módulos e componentes para facilitar a manutenção e escalabilidade:
- `app/`: Contém os módulos e componentes principais da aplicação.
  - `components/`: Componentes individuais como `home`, `album`, `track`, etc.
  - `services/`: Serviços responsáveis por interagir com as APIs e gerenciar a lógica de negócios.
  - `models/`: Modelos de dados usados na aplicação.
