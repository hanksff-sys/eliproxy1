# Guia de Deploy do Site Eli Proxy para o Heroku (Git e Heroku CLI)

Este guia detalha o processo de como você pode enviar (fazer o "deploy") os arquivos do seu site Eli Proxy para o Heroku, tornando-o acessível publicamente. Utilizaremos o Git para gerenciar o código e o Heroku CLI para interagir com a plataforma.

## Pré-requisitos

Antes de iniciar, certifique-se de que você tem:

1.  **Heroku CLI Instalado:** Se ainda não tiver, baixe e instale em [devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli).
2.  **Git Instalado:** Baixe e instale em [git-scm.com/downloads](https://git-scm.com/downloads).
3.  **Conta Heroku:** Uma conta ativa no Heroku.
4.  **Login no Heroku CLI:** Abra seu terminal e faça login:
    ```bash
    heroku login
    ```
    Isso abrirá uma página no seu navegador para autenticação.
5.  **Arquivos do Site Eli Proxy:** A pasta `vivo_plano` (ou o nome que você deu ao projeto) contendo `app.py`, `requirements.txt`, `Procfile`, `templates/` e `static/`.

## Passo a Passo para o Deploy

Siga estes passos no seu terminal, dentro da pasta raiz do seu projeto Eli Proxy (onde está o `app.py`).

### Passo 1: Navegar até a Pasta do Projeto

Abra seu terminal e navegue até a pasta raiz do seu projeto Eli Proxy. Por exemplo:

```bash
cd /caminho/para/sua/pasta/vivo_plano
```

### Passo 2: Inicializar um Repositório Git Local

Se você ainda não tem um repositório Git na pasta do seu projeto, inicialize um:

```bash
git init
```

### Passo 3: Adicionar os Arquivos ao Git

Adicione todos os arquivos do seu projeto ao controle de versão do Git:

```bash
git add .
```

### Passo 4: Fazer o Primeiro Commit

Salve as alterações no seu repositório Git local:

```bash
git commit -m "Primeiro commit do site Eli Proxy"
```

### Passo 5: Criar um Aplicativo Heroku

Crie um novo aplicativo no Heroku. O Heroku gerará um nome aleatório para ele, ou você pode especificar um nome único (substitua `nome-do-seu-app-eli-proxy` por um nome de sua escolha):

```bash
heroku create nome-do-seu-app-eli-proxy
```

*   **Importante:** Anote o nome do aplicativo gerado ou escolhido, pois você o usará em comandos futuros (ex: `nome-do-seu-app-eli-proxy`).

### Passo 6: Adicionar o Remote Heroku

Conecte seu repositório Git local ao aplicativo Heroku que você acabou de criar:

```bash
heroku git:remote -a nome-do-seu-app-eli-proxy
```

### Passo 7: Fazer o Deploy do Código para o Heroku

Agora, envie seu código para o Heroku. Isso iniciará o processo de build e deploy:

```bash
git push heroku master
```

*   O Heroku detectará automaticamente que é um aplicativo Python, instalará as dependências listadas no seu `requirements.txt` e configurará o servidor web usando o `Procfile`.
*   Este processo pode levar alguns minutos.

### Passo 8: Escalar o Dyno Web

Por padrão, o Heroku pode não iniciar o processo web automaticamente. Você precisa escalar o dyno (instância do servidor) para que seu aplicativo esteja ativo:

```bash
heroku ps:scale web=1 --app nome-do-seu-app-eli-proxy
```

### Passo 9: Verificar o Status do Aplicativo

Você pode verificar se o seu aplicativo está rodando e qual é a URL dele:

```bash
heroku open --app nome-do-seu-app-eli-proxy
```

Este comando abrirá o seu site no navegador. A URL será algo como `https://nome-do-seu-app-eli-proxy.herokuapp.com/`.

## Próximos Passos

Com o site no ar, você pode seguir o guia anterior (`HEROKU_CLI_DOMAIN_GUIDE.md`) para configurar seu domínio personalizado (`www.eliproxy.com.br`) e o Certificado SSL. Lembre-se de que o nome do aplicativo (`nome-do-seu-app-eli-proxy`) será usado em todos os comandos do Heroku.

Se precisar de ajuda em qualquer um desses passos, não hesite em perguntar!
