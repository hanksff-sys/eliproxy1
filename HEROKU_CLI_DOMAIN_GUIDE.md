# Guia de Configuração de Domínio Personalizado no Heroku CLI para Eli Proxy

Este guia detalha o processo de configuração do seu domínio personalizado (`www.eliproxy.com.br` e `eliproxy.com.br`) para o seu aplicativo Heroku, utilizando a interface de linha de comando (CLI) do Heroku.

## Pré-requisitos

Antes de começar, certifique-se de que você tem:

1.  **Heroku CLI Instalado:** Se ainda não tiver, baixe e instale em [devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli).
2.  **Login no Heroku CLI:** Abra seu terminal e faça login:
    ```bash
    heroku login
    ```
    Isso abrirá uma página no seu navegador para autenticação.
3.  **Aplicativo Heroku Criado:** Você já deve ter um aplicativo Heroku existente para o seu site Eli Proxy. Substitua `eli-proxy-app` pelo nome real do seu aplicativo Heroku nos comandos abaixo.
4.  **Domínio Registrado:** Seu domínio (`eliproxy.com.br`) deve estar registrado em um provedor (ex: Registro.br, Hostinger, GoDaddy).

## Passo 1: Adicionar o Domínio `www` ao seu Aplicativo Heroku

Primeiro, adicione o subdomínio `www` ao seu aplicativo Heroku. Este é o endereço que a maioria dos usuários digitará.

```bash
heroku domains:add www.eliproxy.com.br --app eli-proxy-app
```

*   Substitua `eli-proxy-app` pelo nome do seu aplicativo Heroku.
*   Após executar este comando, o Heroku irá gerar um `DNS Target` (alvo DNS) para este domínio. Você precisará deste valor no próximo passo.

## Passo 2: Obter o DNS Target do Heroku

Para configurar o seu domínio no registrador, você precisará do `DNS Target` que o Heroku gerou. Você pode obtê-lo com o seguinte comando:

```bash
heroku domains --app eli-proxy-app
```

Você verá uma saída similar a esta:

```
=== eli-proxy-app Domains
Hostname                 DNS Target
-----------------------  ---------------------------------------
www.eliproxy.com.br      www.eliproxy.com.br.herokudns.com
```

*   Copie o valor da coluna `DNS Target` para `www.eliproxy.com.br`. Ele será algo como `www.eliproxy.com.br.herokudns.com`.

## Passo 3: Configurar o Registro CNAME no seu Registrador de Domínio

Agora, acesse o painel de controle do seu registrador de domínio (onde você comprou `eliproxy.com.br`) e localize a seção de **Gerenciamento de DNS** ou **Zona DNS**.

Você precisará criar um registro do tipo `CNAME` com as seguintes informações:

| Campo         | Valor                                    |
| :------------ | :--------------------------------------- |
| **Tipo**      | `CNAME`                                  |
| **Nome/Host** | `www`                                    |
| **Valor/Alvo**| `www.eliproxy.com.br.herokudns.com` (o DNS Target que você copiou do Heroku) |
| **TTL**       | `Automático` ou `3600` segundos          |

## Passo 4: Adicionar o Domínio Raiz (eliproxy.com.br)

Para que seu site funcione também quando alguém digitar `eliproxy.com.br` (sem o `www`), você precisa adicionar o domínio raiz ao Heroku:

```bash
heroku domains:add eliproxy.com.br --app eli-proxy-app
```

*   Este comando também gerará um `DNS Target` para o domínio raiz. Obtenha-o novamente com `heroku domains --app eli-proxy-app`.

## Passo 5: Configurar o Domínio Raiz no seu Registrador (Registro ALIAS/ANAME ou Cloudflare)

A configuração do domínio raiz é um pouco diferente, pois registros `CNAME` não são permitidos diretamente para o domínio principal. Você tem duas opções principais:

### Opção A: Usar Registro ALIAS/ANAME (se disponível)

Alguns registradores de domínio (e provedores de DNS como Cloudflare) oferecem um tipo de registro `ALIAS` ou `ANAME` que funciona como um `CNAME` para o domínio raiz. Se o seu registrador suportar, crie um registro com:

| Campo         | Valor                                    |
| :------------ | :--------------------------------------- |
| **Tipo**      | `ALIAS` ou `ANAME`                       |
| **Nome/Host** | `@` ou `eliproxy.com.br`                 |
| **Valor/Alvo**| `eliproxy.com.br.herokudns.com` (o DNS Target do domínio raiz) |
| **TTL**       | `Automático` ou `3600` segundos          |

### Opção B: Usar Cloudflare (Recomendado para Domínio Raiz)

O Cloudflare é um serviço gratuito que atua como um proxy reverso e oferece o recurso "CNAME Flattening", que resolve o problema do domínio raiz. Além disso, ele oferece segurança (DDoS protection) e aceleração para o seu site.

1.  **Mude os Nameservers:** No seu registrador de domínio, altere os nameservers para os fornecidos pelo Cloudflare.
2.  **Adicione o Domínio no Cloudflare:** No painel do Cloudflare, adicione seu domínio `eliproxy.com.br`.
3.  **Crie os Registros DNS no Cloudflare:**
    *   **Para `www.eliproxy.com.br`:** Crie um registro `CNAME` apontando `www` para o `DNS Target` do Heroku (`www.eliproxy.com.br.herokudns.com`). Certifique-se de que o ícone de nuvem laranja esteja **ATIVO** (proxied).
    *   **Para `eliproxy.com.br` (raiz):** Crie um registro `CNAME` apontando `@` para o `DNS Target` do Heroku (`eliproxy.com.br.herokudns.com`). O Cloudflare irá automaticamente "achatar" este CNAME para um registro A, resolvendo o problema do domínio raiz. Certifique-se de que o ícone de nuvem laranja esteja **ATIVO** (proxied).

## Passo 6: Verificação e Certificado SSL (HTTPS)

Após configurar os registros DNS, pode levar de 15 minutos a 48 horas para que as mudanças se propaguem globalmente. Você pode verificar o status em sites como [dnschecker.org](https://dnschecker.org/).

*   **Verificar no Heroku CLI:**
    ```bash
    heroku domains --app eli-proxy-app
    ```
    A coluna `Status` deve eventualmente mostrar `OK` para ambos os domínios.

*   **Certificado SSL:** O Heroku oferece SSL/TLS automático e gratuito para domínios personalizados. Uma vez que o DNS esteja configurado corretamente e propagado, o Heroku provisionará o certificado automaticamente. Você pode verificar o status do SSL:
    ```bash
    heroku certs:auto --app eli-proxy-app
    ```

## Passo 7: Redirecionamento de `eliproxy.com.br` para `www.eliproxy.com.br` (Opcional, mas Recomendado)

É uma boa prática redirecionar o domínio raiz para o `www` (ou vice-versa) para evitar conteúdo duplicado e garantir que os usuários sempre acessem a mesma versão do seu site. Se você estiver usando o Cloudflare, pode configurar uma "Page Rule" para fazer isso. Em outras hospedagens, pode ser necessário configurar um redirecionamento no seu aplicativo Flask ou no servidor web (Nginx, se estiver usando VPS).

Com estes passos, seu site Eli Proxy estará acessível através do seu domínio personalizado com segurança e eficiência!
