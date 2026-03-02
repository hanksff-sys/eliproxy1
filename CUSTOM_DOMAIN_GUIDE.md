# Guia para Hospedagem em Domínio Personalizado (Eli Proxy)

Este guia detalha os passos necessários para hospedar seu site "Eli Proxy" em um domínio personalizado (ex: `www.seusite.com.br`), tornando-o acessível globalmente com seu próprio endereço.

## 1. Entendendo Domínios e Hospedagem

Antes de começar, é importante entender dois conceitos chave:

*   **Domínio:** É o endereço do seu site na internet (ex: `eliproxy.com.br`). Você precisa registrar e comprar um domínio de um registrador de domínios.
*   **Hospedagem:** É o serviço que armazena os arquivos do seu site e os torna acessíveis na internet. No seu caso, já configuramos o site para ser compatível com plataformas como o Heroku, que atuam como serviço de hospedagem.

## 2. Registro do Domínio

O primeiro passo é registrar o domínio desejado. Você pode fazer isso através de empresas especializadas.

### Onde Registrar seu Domínio:

| Registrador | Vantagens | Preço Médio (anual) | Observações |
| :---------- | :-------- | :------------------ | :---------- |
| **Registro.br** [1] | Ideal para domínios `.com.br` no Brasil. | R$ 40,00 | Interface simples, foco em domínios nacionais. |
| **Hostinger** [2] | Oferece domínios e hospedagem, bom para iniciantes. | R$ 30-70,00 | Frequentemente inclui domínio grátis com planos de hospedagem. |
| **GoDaddy** [3] | Grande variedade de extensões de domínio, serviços adicionais. | R$ 20-100,00 | Pode ter promoções no primeiro ano, mas renovação mais cara. |
| **Cloudflare** [4] | Oferece registro de domínio a preço de custo, focado em segurança e CDN. | Variável | Requer um pouco mais de conhecimento técnico para configurar. |

### Passos para Registrar:

1.  **Escolha um Registrador:** Selecione uma das opções acima ou outra de sua preferência.
2.  **Pesquise a Disponibilidade:** No site do registrador, procure pelo domínio que você deseja (ex: `eliproxy.com.br`).
3.  **Finalize a Compra:** Siga as instruções para comprar e registrar o domínio. Você precisará fornecer seus dados pessoais e de pagamento.

## 3. Configuração do Domínio na Hospedagem (Exemplo: Heroku)

Após registrar seu domínio, você precisa configurá-lo para apontar para o seu site hospedado. Se você seguiu o guia anterior e implantou seu site no Heroku, os passos são os seguintes:

1.  **Adicione seu Domínio ao Heroku:**
    *   Abra seu terminal e faça login no Heroku CLI (se ainda não estiver logado).
    *   Navegue até a pasta do seu projeto `vivo_plano`.
    *   Execute o comando para adicionar seu domínio ao seu aplicativo Heroku:
        ```bash
        heroku domains:add www.seusite.com.br --app seu-nome-do-app-unico
        heroku domains:add seusite.com.br --app seu-nome-do-app-unico
        ```
        Substitua `seusite.com.br` pelo seu domínio real e `seu-nome-do-app-unico` pelo nome do seu aplicativo Heroku.
    *   O Heroku retornará um ou mais **DNS Target** (ex: `sua-app-herokudns.com`). Anote esses valores.

2.  **Configure os Registros DNS no seu Registrador de Domínios:**
    *   Acesse o painel de controle do registrador onde você comprou seu domínio (Registro.br, Hostinger, GoDaddy, etc.).
    *   Procure pela seção de **Gerenciamento de DNS** ou **Configurações de DNS**.
    *   Você precisará adicionar registros do tipo `CNAME` e/ou `ALIAS`/`ANAME`:
        *   **Para `www.seusite.com.br`:** Crie um registro `CNAME` que aponte `www` para o **DNS Target** fornecido pelo Heroku (ex: `sua-app-herokudns.com`).
        *   **Para `seusite.com.br` (domínio raiz):** Se o seu registrador suportar, crie um registro `ALIAS` ou `ANAME` que aponte `@` (ou o nome do seu domínio) para o **DNS Target** do Heroku. Se não suportar, você pode precisar usar um serviço de DNS externo como o Cloudflare para gerenciar o domínio raiz.

    *   **Exemplo de Configuração DNS (pode variar ligeiramente entre registradores):**

        | Tipo de Registro | Nome/Host | Valor/Aponta para | TTL |
        | :--------------- | :-------- | :---------------- | :-- |
        | `CNAME`          | `www`     | `sua-app-herokudns.com` | Automático |
        | `ALIAS` (ou `ANAME`) | `@`       | `sua-app-herokudns.com` | Automático |

    *   **Importante:** As alterações de DNS podem levar de **alguns minutos a 48 horas** para se propagarem completamente pela internet. Durante esse período, seu site pode não estar acessível pelo novo domínio.

## 4. Verificação e HTTPS

Após a propagação do DNS, seu site deverá estar acessível pelo seu domínio personalizado.

*   **Verifique:** Digite `www.seusite.com.br` (ou `seusite.com.br`) no navegador.
*   **HTTPS (Certificado SSL):** O Heroku geralmente fornece HTTPS automaticamente para domínios personalizados. Verifique se o cadeado de segurança aparece na barra de endereço do navegador. Se não, consulte a documentação do Heroku sobre como forçar HTTPS ou configurar um certificado SSL.

## 5. Considerações Finais

*   **Manutenção:** Lembre-se de renovar seu domínio anualmente para evitar que ele expire.
*   **E-mail Personalizado:** Se você quiser um e-mail com seu domínio (ex: `contato@seusite.com.br`), você precisará configurar registros `MX` no seu gerenciador de DNS, apontando para um serviço de e-mail (Google Workspace, Zoho Mail, etc.).

--- 

**Autor:** Manus AI
**Data:** 01 de Março de 2026

## Referências

[1] [Registro.br](https://registro.br/) - Serviço oficial de registro de domínios `.br`.
[2] [Hostinger](https://www.hostinger.com.br/) - Provedor de hospedagem e registro de domínios.
[3] [GoDaddy](https://br.godaddy.com/) - Um dos maiores registradores de domínios do mundo.
[4] [Cloudflare](https://www.cloudflare.com/pt-br/products/registrar/) - Registro de domínio a preço de custo e serviços de CDN/DNS.
