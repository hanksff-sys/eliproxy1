# Guia de Implantação do Site Vivo Planos

Este documento detalha como implantar e manter seu site "Vivo Planos" de forma permanente, utilizando serviços de hospedagem web. O site foi desenvolvido em Python com o framework Flask, HTML, CSS e JavaScript.

## 1. Visão Geral do Projeto

O site "Vivo Planos" é uma aplicação web moderna e responsiva, projetada para anunciar planos de internet e serviços de streaming. Ele inclui:

*   **Seções de Planos:** Dedicadas a planos de internet (Vivo 500GB Ilimitados) e serviços de streaming (Canais e Streamings Liberados).
*   **Informações de Contato:** Seção com cards para WhatsApp, Telefone, E-mail e Instagram, com dados fictícios para fácil edição.
*   **Design Moderno:** Utiliza HTML5, CSS3 (com gradientes e animações) e JavaScript para interatividade e responsividade.
*   **Estrutura Flask:** Backend simples em Python para servir as páginas estáticas.

## 2. Estrutura de Arquivos

O projeto está organizado da seguinte forma:

```
vivo_plano/
├── app.py                  # Aplicação principal Flask
├── requirements.txt        # Dependências Python do projeto
├── Procfile                # Configuração para deploy em plataformas como Heroku
├── templates/
│   └── index.html          # Template HTML principal do site
└── static/
    ├── css/style.css       # Estilos CSS do site
    ├── js/main.js          # Lógica JavaScript (scroll suave, abas, animações)
    └── img/
        └── streaming-hero.jpg # Imagem de destaque da seção de streaming
```

## 3. Configuração Local (Opcional)

Para rodar o site localmente em sua máquina:

1.  **Pré-requisitos:** Certifique-se de ter Python 3 e `pip` instalados.
2.  **Navegue até a pasta do projeto:**
    ```bash
    cd vivo_plano
    ```
3.  **Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Execute a aplicação Flask:**
    ```bash
    python3 app.py
    ```
5.  Abra seu navegador e acesse `http://localhost:5000`.

## 4. Edição dos Dados de Contato e Conteúdo

Todos os dados de contato (WhatsApp, telefone, e-mail, Instagram) e o conteúdo textual das seções podem ser editados diretamente no arquivo `templates/index.html`.

Procure pelos comentários `<!-- EDITE: -->` para identificar os locais onde as informações fictícias devem ser substituídas pelas suas. Por exemplo:

```html
<!-- Card WhatsApp -->
<a href="https://wa.me/5511999990000" target="_blank" class="contato-card wpp-card">
  <!-- ... -->
  <div class="contato-info">
    <span class="contato-label">WhatsApp</span>
    <!-- EDITE: substitua pelo seu número -->
    <span class="contato-value">(11) 99999-0000</span>
  </div>
  <!-- ... -->
</a>
```

## 5. Implantação Permanente (Hospedagem)

Para tornar seu site acessível publicamente 24/7, você precisará implantá-lo em um serviço de hospedagem. Recomenda-se plataformas que suportam aplicações Python com Gunicorn, como o Heroku.

### Opção Recomendada: Heroku

O Heroku é uma plataforma de nuvem (PaaS) que facilita a implantação de aplicações web. O `Procfile` e `requirements.txt` já foram configurados para compatibilidade com o Heroku.

#### Passos para Implantação no Heroku:

1.  **Crie uma conta Heroku:** Se você ainda não tem uma, registre-se em [Heroku](https://www.heroku.com/).
2.  **Instale o Heroku CLI:** Siga as instruções em [Heroku Dev Center](https://devcenter.heroku.com/articles/heroku-cli) para instalar a interface de linha de comando do Heroku.
3.  **Faça login no Heroku CLI:** Abra seu terminal e execute:
    ```bash
    heroku login
    ```
    Isso abrirá uma página no navegador para você fazer login.
4.  **Navegue até a pasta do seu projeto:**
    ```bash
    cd /caminho/para/seu/projeto/vivo_plano
    ```
5.  **Inicialize um repositório Git (se ainda não o fez):**
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
6.  **Crie uma nova aplicação Heroku:**
    ```bash
    heroku create seu-nome-do-app-unico
    ```
    Substitua `seu-nome-do-app-unico` por um nome exclusivo para seu site. O Heroku fornecerá uma URL como `https://seu-nome-do-app-unico.herokuapp.com/`.
7.  **Implante o código no Heroku:**
    ```bash
    git push heroku master
    ```
    O Heroku detectará o `requirements.txt` e o `Procfile`, instalará as dependências e iniciará sua aplicação.
8.  **Abra seu site:**
    ```bash
    heroku open
    ```
    Isso abrirá seu site no navegador.

#### Atualizando o Site

Sempre que você fizer alterações no código (por exemplo, editar o `index.html` com seus dados de contato), siga estes passos:

1.  **Adicione e faça commit das suas alterações:**
    ```bash
    git add .
    git commit -m "Atualiza dados de contato"
    ```
2.  **Implante novamente no Heroku:**
    ```bash
    git push heroku master
    ```

### Outras Opções de Hospedagem

Você também pode considerar outras opções, dependendo da sua preferência e necessidade:

*   **Render:** Similar ao Heroku, com bom suporte a aplicações Python. Veja [Render](https://render.com/).
*   **DigitalOcean / AWS / Google Cloud:** Para maior controle e escalabilidade, você pode configurar um servidor virtual privado (VPS) e instalar o Gunicorn + Nginx manualmente. Esta opção requer mais conhecimento técnico.

--- 

**Autor:** Manus AI
**Data:** 01 de Março de 2026
