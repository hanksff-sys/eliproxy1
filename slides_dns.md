# Configuração de DNS para Eli Proxy: O Guia Definitivo

## O que é DNS e por que ele é essencial para o Eli Proxy?
- O **DNS (Domain Name System)** funciona como a "lista telefônica" da internet.
- Ele traduz o nome do seu domínio (ex: `eliproxy.com.br`) em um endereço IP que os servidores entendem.
- Sem uma configuração correta de DNS, os clientes não conseguem encontrar seu site digitando o nome personalizado.
- Um DNS bem configurado garante rapidez no acesso e segurança para seus usuários.

## O ecossistema do seu site: Domínio vs. Hospedagem
- O **Domínio** é o endereço comercial (ex: `eliproxy.com.br`) que você registra em sites como Registro.br.
- A **Hospedagem** é onde os arquivos do site "moram" (no seu caso, o servidor Flask/Heroku).
- A configuração de DNS é a "ponte" que liga o seu endereço (domínio) ao seu servidor (hospedagem).
- É fundamental entender que são serviços diferentes, mas que precisam estar conectados.

## Passo 1: Registrando seu domínio no Registro.br ou similar
- Acesse o site de um registrador confiável, como o **Registro.br** para domínios `.com.br`.
- Pesquise a disponibilidade do nome `eliproxy.com.br` ou similar.
- Complete o cadastro e realize o pagamento da anuidade (geralmente em torno de R$ 40,00).
- Após a confirmação, você terá acesso ao painel de controle de DNS do seu domínio.

## Passo 2: Obtendo o DNS Target da sua Hospedagem
- No painel da sua hospedagem (ex: Heroku), adicione o domínio personalizado nas configurações.
- O sistema gerará um **DNS Target** único, como `eliproxy-12345.herokudns.com`.
- Este endereço é o "destino final" para onde o tráfego do seu domínio deve ser enviado.
- Copie este endereço, pois você precisará dele para configurar o seu registrador de domínios.

## Passo 3: Configurando o registro CNAME para o subdomínio 'www'
- No painel do seu registrador de domínio, localize a seção "Configurar DNS" ou "Editar Zona DNS".
- Adicione um novo registro do tipo **CNAME**.
- No campo **Nome/Host**, insira `www`.
- No campo **Valor/Destino**, cole o DNS Target que você obteve na hospedagem.
- Isso garante que quem digitar `www.eliproxy.com.br` seja levado ao seu site corretamente.

## Passo 4: Configurando o domínio raiz (Apex Domain)
- O domínio raiz é o endereço sem o 'www' (ex: `eliproxy.com.br`).
- Alguns registradores permitem o uso de registros do tipo **ALIAS** ou **ANAME** para apontar para o DNS Target.
- Se o seu registrador não suportar ALIAS, você pode usar o **Cloudflare** como intermediário gratuito.
- O Cloudflare oferece o recurso de "CNAME Flattening", que resolve esse problema de forma profissional.

## Passo 5: Propagação de DNS e o tempo de espera necessário
- As alterações de DNS não são instantâneas; elas precisam ser "espalhadas" por todos os servidores do mundo.
- Esse processo é chamado de **Propagação de DNS** e pode levar de 15 minutos até 48 horas.
- Você pode acompanhar o status da propagação em sites como `dnschecker.org`.
- Não se preocupe se o site não abrir imediatamente; é um comportamento normal da internet.

## Passo 6: Verificação final e Certificado de Segurança (SSL)
- Após a propagação, acesse seu site pelo domínio personalizado no navegador.
- Verifique se o ícone do cadeado aparece ao lado da URL (Protocolo HTTPS).
- O HTTPS é obrigatório hoje em dia para passar confiança aos clientes e melhorar o SEO.
- A maioria das hospedagens modernas, como Heroku e Render, fornece o certificado SSL automaticamente.

## Dicas de Ouro para uma configuração sem erros
- **Evite múltiplos registros A:** Se você usar CNAME, remova registros do tipo 'A' antigos que apontem para outros IPs.
- **TTL (Time To Live):** Se possível, deixe o TTL em "Automático" ou "3600 segundos".
- **Cuidado com o cache:** Se o site não abrir, tente limpar o cache do seu navegador ou usar uma aba anônima.
- **Mantenha os dados atualizados:** Verifique sempre se o e-mail do seu registrador de domínio está correto para não perder avisos de renovação.

## Conclusão: Seu Eli Proxy pronto para o mundo!
- Com o domínio personalizado, sua marca ganha autoridade e profissionalismo.
- O processo pode parecer técnico, mas seguindo estes passos, você terá sucesso.
- Agora seus clientes podem acessar `eliproxy.com.br` de qualquer lugar com total segurança.
- Parabéns! Seu site está oficialmente no ar com identidade própria.
