# Location Schema — Especificacao Campo-a-Campo

Cada local no `src/data/locations.json` segue o tipo TypeScript abaixo:

```typescript
type Location = {
  slug: string
  name: string
  city: string
  uf: string
  title: string
  introduction: string
  infoSections: LocationSection[]
  tributeSections: LocationSection[]
}

type LocationSection = {
  title: string
  paragraphs: string[]
}
```

---

## slug

Identificador unico usado na URL (`/locais/{slug}`).

**Formato:** `{nome-slugificado}-{cidade-slugificada}`
- Lowercase
- Hifens como separadores (nunca underscores ou espacos)
- Sem acentos ou caracteres especiais
- Sem artigos (do, da, de, dos, das) quando possivel, mas mantendo legibilidade

**Exemplos:**
- `cemiterio-bonfim-belo-horizonte`
- `funeraria-paz-universal-contagem`
- `crematorio-metropolitan-curitiba`
- `sala-velorio-hospital-municipal-sao-paulo`

**Verificacao:** O slug nao pode existir no `src/data/locations.json` atual.

---

## name

Nome oficial do local como e comumente conhecido.

**Regras:**
- Usar a grafia oficial com acentos e cedilhas
- Capitalizar corretamente (nao usar TUDO MAIUSCULO)
- Nao incluir o nome da cidade no campo name
- Nao adicionar prefixos como "O" ou "A"

**Exemplos:**
- "Cemiterio do Bonfim" (nao "CEMITERIO DO BONFIM" ou "Cemiterio do Bonfim de Belo Horizonte")
- "Funeraria Paz Universal"
- "Memorial Parque Paulista"

O campo name e usado na busca do Google Maps (`{name} {city} {uf}`), entao precisa ser reconhecivel.

---

## city

Nome completo da cidade com acentos. Nunca usar abreviacoes ou siglas para cidades.

**Exemplos:** "Belo Horizonte" (nunca "BH"), "São Paulo" (nunca "SP"), "Ribeirão das Neves", "Juiz de Fora"

---

## uf

Sigla do estado com 2 letras em maiusculo.

**Exemplos:** "MG", "SP", "RJ", "PR", "RS"

---

## title

Titulo principal da pagina. Serve como H1 e como base do meta title.

**Formato padrao:** `Coroa de Flores para {name} em {city}, {uf}`

**Comprimento alvo:** 50-63 caracteres (o codigo adiciona " | Coroa de Flores Nobre" com ~25 chars, totalizando ~75-88 chars no meta title completo).

Se o formato padrao ultrapassar 63 caracteres, encurte:
- Simplificar: "Coroas para {name} - {city}, {uf}"
- Encurtar o nome do local se possivel (ex: "Cem. do Bonfim" em vez de "Cemiterio do Bonfim")

**Nunca abreviar nomes de cidades.** Sempre usar o nome completo: "Belo Horizonte" (nunca "BH"), "Sao Paulo" (nunca "SP"), "Rio de Janeiro" (nunca "RJ"). Abreviacoes sao permitidas apenas para estados (UF): "MG", "SP", "RJ", "PR".

Errado: "Coroa de Flores para Cemiterio da Consolacao em BH, MG"
Certo: "Coroa de Flores para Cemiterio da Consolacao em Belo Horizonte, MG"

**O title deve ser diferente do H1 conceitual da pagina** quando possivel, para ampliar as chances de indexacao com termos variados.

**Exemplos:**
- "Coroa de Flores para Cemiterio do Bonfim em Belo Horizonte, MG" (62 chars)
- "Coroa de Flores para Funeraria Paz Universal em Contagem, MG" (61 chars)
- "Coroas para Memorial Parque Paulista - Embu das Artes, SP" (57 chars)

---

## introduction

Paragrafo de abertura da pagina. Os primeiros 152 caracteres viram a meta description.

**Comprimento:** 400-700 caracteres totais (mais extenso para dar contexto rico).

**Regra critica dos primeiros 152 caracteres:**

O codigo em `page.tsx` corta a introduction em exatamente 152 caracteres e adiciona "...":
```typescript
location.introduction.length > 155
  ? location.introduction.slice(0, 152) + "..."
  : location.introduction
```

Portanto, os primeiros 152 caracteres DEVEM:
1. Terminar em um limite natural de palavra (nao cortar no meio)
2. Formar uma frase completa ou uma clausula que faca sentido sozinha
3. Incluir o nome do local e a cidade
4. Conter uma proposta de valor (entrega, confiabilidade, cuidado)
5. Ser persuasiva para estimular o clique no Google (funcionar como argumento de venda)

**Estrutura sugerida:**
- Frase 1 (70-90 chars): sobre o local e sua importancia
- Frase 2 (60-80 chars): sobre o servico de entrega
- = ~150 chars antes do corte
- Frases adicionais: mais detalhes sobre o local e o servico

**Exemplo:**
```
"O Cemiterio do Bonfim e um dos mais antigos e tradicionais de Belo Horizonte, com mais de um seculo de historia. A Coroa de Flores Nobre realiza entregas de coroas de flores no Cemiterio do Bonfim, garantindo que sua homenagem chegue com todo o carinho e respeito que o momento exige."
```
Primeiros 152 chars: "O Cemiterio do Bonfim e um dos mais antigos e tradicionais de Belo Horizonte, com mais de um seculo de historia. A Coroa de Flores Nobre realiza entre" — note que "entre" esta cortado. Isso precisa ser ajustado.

**Tecnica:** Escreva a introduction completa. Depois, conte os primeiros 152 caracteres e ajuste para que o corte caia apos um ponto final, virgula ou palavra completa.

---

## infoSections

Array com 6 a 7 secoes informativas sobre o local. Cada secao tem `title` (string) e `paragraphs` (string[]). Essas secoes devem somar entre 1.500 e 2.500 palavras, sendo a maior parte conteudo unico baseado em pesquisa real.

### Secao 1: "Localizacao e como chegar"

Esta secao vira o primeiro H2 da pagina (fonte serif, destaque visual).

**3-4 paragrafos:**
- Paragrafo 1: endereco completo, bairro, regiao da cidade, pontos de referencia proximos
- Paragrafo 2: como chegar de carro (rotas principais, rodovias, estacionamento)
- Paragrafo 3: transporte publico (linhas de onibus, metro, terminais proximos)
- Paragrafo 4 (opcional): dicas praticas de acesso (melhor horario, trânsito, alternativas)

Se o endereco real foi encontrado na pesquisa, inclua-o com detalhes. Se nao, descreva a regiao e os arredores sem inventar.

### Secao 2: "Horario de funcionamento"

**2-3 paragrafos:**
- Paragrafo 1: horarios de visitacao/operacao (dias uteis, finais de semana, feriados)
- Paragrafo 2: horarios administrativos, servicos disponiveis por periodo
- Paragrafo 3 (opcional): recomendacoes sobre datas especiais (Finados, festas religiosas)

Sempre usar linguagem cautelosa se os horarios nao foram 100% confirmados: "geralmente funciona das 7h as 18h", "recomenda-se verificar diretamente".

Para funerarias que operam 24h, declarar claramente e explicar como funciona o plantao.

### Secao 3: "Historia e relevancia" ou "Sobre o local"

Usar "Historia e relevancia" quando o local tem historia documentada (ano de fundacao, fatos notaveis).
Usar "Sobre o local" quando as informacoes sao mais gerais.

**3-4 paragrafos:**
- Paragrafo 1: fundacao, contexto historico, quem fundou e por que
- Paragrafo 2: evolucao ao longo dos anos, marcos importantes, expansoes
- Paragrafo 3: significado atual para a comunidade, personalidades sepultadas (se cemiterio), premios ou reconhecimentos
- Paragrafo 4 (opcional): curiosidades, particularidades arquitetonicas, patrimonio cultural

Essa secao e onde a pesquisa real mais importa. Quanto mais detalhes verificados, melhor para SEO e credibilidade.

### Secao 4: "Estrutura e servicos"

**3-4 paragrafos:**
- Paragrafo 1: infraestrutura fisica (capelas, salas de velorio, quantidade, capacidade)
- Paragrafo 2: servicos oferecidos (tipos de sepultamento, cremacao, translado, documentacao)
- Paragrafo 3: comodidades para visitantes (estacionamento, copa, banheiros, acessibilidade)
- Paragrafo 4 (opcional): diferenciais do local (areas verdes, jardins, memorial, ossuario)

Adaptar ao tipo de local: cemiterios falam de quadras, jazigos, ossarios; funerarias falam de capelas, preparacao, translado; crematorios falam de fornos, columbarios, urnas.

### Secao 5: "Informacoes uteis para visitantes"

**2-3 paragrafos:**
- Paragrafo 1: o que esperar ao visitar (procedimentos na entrada, recepcao, orientacao)
- Paragrafo 2: recomendacoes praticas (vestimenta adequada, objetos pessoais, tempo de permanencia)
- Paragrafo 3 (opcional): normas e regulamentos relevantes (horarios de sepultamento, restricoes de acesso)

### Secao 6: "{city} e a regiao"

**2-3 paragrafos contextuais sobre a cidade:**
- Paragrafo 1: dados gerais da cidade (populacao, regiao, importancia economica/cultural)
- Paragrafo 2: como o local se insere no contexto da cidade, outros locais funerarios da regiao
- Paragrafo 3 (opcional): como a Coroa de Flores Nobre atende a cidade e regiao metropolitana

Essa secao ajuda no SEO local e contextualiza o servico para quem pesquisa de fora da cidade.

### Secao 7 (opcional): Secao extra especifica do local

Se a pesquisa revelar algo particularmente interessante (ex: tombamento cultural, programa de visitas guiadas, projetos sociais, curiosidades unicas), adicionar uma secao extra com titulo descritivo.

**2-3 paragrafos** sobre o tema especifico.

---

## tributeSections

Array com 7 a 8 secoes sobre flores, homenagens e entrega. Cada secao tem `title` (string) e `paragraphs` (string[]). Essas secoes devem somar entre 1.500 e 2.500 palavras. Embora tenham conteudo mais tematico do que as infoSections, devem ser variadas entre locais para evitar duplicacao que prejudica o SEO.

### Secao 1: "Como escolher a coroa ideal"

**3 paragrafos:**
- Paragrafo 1: orientacoes para escolha considerando o tipo de cerimonia e relacao com o falecido. Personalizar para o tipo de local (cemiterio vs funeraria vs crematorio).
- Paragrafo 2: diferencas entre tamanhos e categorias de coroas (tradicional, ouro, diamante), quando cada uma e mais indicada.
- Paragrafo 3: mencionar a variedade do catalogo, faixas personalizadas, prazo de entrega, possibilidade de foto antes do envio.

Variar as orientacoes entre locais. Nao copiar o mesmo texto.

### Secao 2: "Flores mais utilizadas e seus significados"

**6 paragrafos**, cada um sobre uma flor diferente (expandido de 4 para 6).

Formato: `"Flor: descricao e significado."`

Flores disponiveis para rotacao (escolher 6 diferentes por local):
- Lirios: pureza, elevacao espiritual, paz, uma das flores mais tradicionais em cerimônias funebres
- Rosas: amor, respeito, admiracao. Brancas = paz e reverencia, vermelhas = saudade e amor profundo, rosadas = gratidao
- Crisantemos: verdade, lealdade, eternidade. Muito duráveis, ideais para coroas que precisam manter a beleza
- Gerberas: alegria, gratidao pela vida compartilhada. Cores vibrantes que celebram a memoria
- Orquideas: beleza eterna, amor duradouro, sofisticacao e elegancia
- Anturios: forca, resistencia, homenagem duradoura. Flores tropicais que simbolizam perseveranca
- Margaridas: inocencia, pureza, simplicidade, ternura. Evocam memorias afetivas
- Astromelias: devocao, amizade duradoura, gratidao por momentos compartilhados
- Angelicas: espiritualidade, protecao, delicadeza, fe e conforto espiritual
- Cravos: fascínio, distincao, amor maternal. Brancos representam amor puro, vermelhos saudade
- Girassois: admiracao, lealdade, vitalidade. Representam uma vida que irradiou luz aos outros

Cada descricao deve ser unica e detalhada (2-3 frases por flor). Nao reutilizar textos identicos entre locais. Nunca repetir a mesma combinacao de 6 para locais na mesma cidade.

### Secao 3: "Mensagens para faixas de coroas de flores"

**4-5 paragrafos com exemplos de mensagens agrupadas por tipo de relacao:**
- Paragrafo 1: introducao sobre a importancia da mensagem na faixa e como ela complementa a homenagem
- Paragrafo 2: exemplos para familiares proximos (pais, conjuges, filhos). Ex: "Saudades eternas, pai querido", "Com amor e gratidao, sua familia"
- Paragrafo 3: exemplos para amigos e colegas. Ex: "Uma amizade que jamais sera esquecida", "Com respeito e admiracao, seus colegas"
- Paragrafo 4: exemplos para homenagens corporativas e institucionais. Ex: "Nossos sentimentos, Equipe [empresa]", "Em memoria de um grande profissional"
- Paragrafo 5 (opcional): orientacoes sobre personalizacao (tamanho da mensagem, letras maiusculas, cores da faixa)

Variar os exemplos entre locais. Oferecer pelo menos 3-4 exemplos por categoria.

### Secao 4: "O significado da homenagem com flores"

**3-4 paragrafos sobre a tradicao e o significado cultural:**
- Paragrafo 1: historia da tradicao de enviar flores em momentos de luto (breve contexto cultural brasileiro)
- Paragrafo 2: como as flores confortam e transmitem sentimentos quando palavras nao sao suficientes
- Paragrafo 3: a importancia de estar presente mesmo a distancia, e como a entrega de flores representa esse gesto
- Paragrafo 4 (opcional): como diferentes culturas e religioes veem a homenagem floral

### Secao 5: "Como funciona nosso servico de entrega"

**3-4 paragrafos explicando o processo passo a passo:**
- Paragrafo 1: como fazer o pedido (WhatsApp, escolher modelo, informar dados da cerimonia)
- Paragrafo 2: preparo e montagem da coroa (flores naturais, frescor, cuidado artesanal)
- Paragrafo 3: logistica de entrega (transporte, confirmacao de horario, foto antes do envio)
- Paragrafo 4 (opcional): diferenciais do servico (atendimento 24h, frete gratis, cobertura regional)

Contextualizar para o local especifico quando possivel (mencionar a logistica para aquela regiao/cidade).

### Secao 6: "Perguntas frequentes sobre entrega no/na {name}"

**5-6 paragrafos em formato pergunta-resposta:**
Cada paragrafo comeca com a pergunta em destaque seguida da resposta. Exemplos de perguntas:
- "Qual o prazo de entrega para o/a {name}?" — resposta contextualizada com a logistica local
- "Posso enviar flores mesmo estando em outra cidade?" — sim, entregamos em todo o Brasil
- "A coroa e feita com flores naturais?" — sim, todas as coroas sao montadas com flores naturais e frescas
- "Como sei que a coroa foi entregue?" — foto de confirmacao enviada por WhatsApp
- "Vocês entregam em feriados e finais de semana?" — sim, atendimento 24 horas
- "Posso personalizar a mensagem da faixa?" — sim, faixas personalizadas em todas as coroas

Adaptar as perguntas ao local e tipo (crematorios podem ter pergunta sobre flores em cremacao, por exemplo).

### Secao 7: "Entrega de flores no/na {name}"

**Artigo no/na conforme genero do substantivo principal:**
- "no" para: Cemiterio, Grupo, Memorial, Parque, Velorio, Monte, Crematório
- "na" para: Funeraria, Casa, Capela, Sala, Associacao

**3 paragrafos:**
- Paragrafo 1: promessa de entrega pontual, eficiencia, cuidado, logistica para aquele local especifico
- Paragrafo 2: como a equipe conhece a regiao e garante a entrega no horario, mencionando particularidades do acesso ao local
- Paragrafo 3: **DISCLAIMER OBRIGATORIO** de independencia. Usar exatamente esta estrutura:

```
"Por favor, note que nao possuimos nenhum vinculo com o/a {name} - {city}. Nosso servico e independente e dedicado a entregar coroas de flores neste local para ajuda-lo a prestar sua ultima homenagem."
```

Ajustar "o/a" conforme o genero do local (o Cemiterio, a Funeraria).

### Secao 8 (opcional): "Etiqueta e costumes em cerimônias fúnebres"

**2-3 paragrafos sobre comportamento e tradicoes:**
- Paragrafo 1: como se comportar em um velorio/funeral (vestimenta, postura, tempo de permanencia)
- Paragrafo 2: quando e como oferecer condolencias (pessoalmente, por mensagem, com flores)
- Paragrafo 3 (opcional): tradicoes regionais ou religiosas relevantes para a cidade/local

Variar entre locais com foco em diferentes aspectos da etiqueta.
