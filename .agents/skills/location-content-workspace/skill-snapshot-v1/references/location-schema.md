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

Nome completo da cidade com acentos.

**Exemplos:** "Belo Horizonte", "Sao Paulo", "Ribeirao das Neves", "Juiz de Fora"

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
- Abreviar cidade conhecida: "BH" para "Belo Horizonte", "SP" para "Sao Paulo"
- Simplificar: "Coroas para {name} - {city}, {uf}"

**O title deve ser diferente do H1 conceitual da pagina** quando possivel, para ampliar as chances de indexacao com termos variados.

**Exemplos:**
- "Coroa de Flores para Cemiterio do Bonfim em Belo Horizonte, MG" (62 chars)
- "Coroa de Flores para Funeraria Paz Universal em Contagem, MG" (61 chars)
- "Coroas para Memorial Parque Paulista - Embu das Artes, SP" (57 chars)

---

## introduction

Paragrafo de abertura da pagina. Os primeiros 152 caracteres viram a meta description.

**Comprimento:** 250-400 caracteres totais.

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

Array com 3 secoes informativas sobre o local. Cada secao tem `title` (string) e `paragraphs` (string[]).

### Secao 1: "Localizacao e como chegar"

Esta secao vira o primeiro H2 da pagina (fonte serif, destaque visual).

**2 paragrafos:**
- Paragrafo 1: endereco/bairro, regiao da cidade, acessibilidade
- Paragrafo 2: como chegar (rotas de carro, linhas de onibus, metro, estacionamento)

Se o endereco real foi encontrado na pesquisa, inclua-o. Se nao, descreva a regiao sem inventar.

### Secao 2: "Horario de funcionamento"

**2 paragrafos:**
- Paragrafo 1: horarios de visitacao/operacao (dias, horarios, feriados)
- Paragrafo 2: horarios administrativos, recomendacao de verificar

Sempre usar linguagem cautelosa se os horarios nao foram 100% confirmados: "geralmente funciona das 7h as 18h", "recomenda-se verificar diretamente".

Para funerarias que operam 24h, declarar claramente.

### Secao 3: "Historia e relevancia" ou "Sobre o local"

Usar "Historia e relevancia" quando o local tem historia documentada (ano de fundacao, fatos notaveis).
Usar "Sobre o local" quando as informacoes sao mais gerais.

**2 paragrafos:**
- Paragrafo 1: fundacao, historia, fatos notaveis
- Paragrafo 2: significado atual, servicos oferecidos, papel na comunidade

---

## tributeSections

Array com 3 secoes sobre flores e entrega. Cada secao tem `title` (string) e `paragraphs` (string[]).

### Secao 1: "Como escolher a coroa ideal"

**2 paragrafos:**
- Paragrafo 1: orientacoes para escolha considerando o tipo de cerimonia e relacao com o falecido. Personalizar para o tipo de local (cemiterio vs funeraria vs crematorio).
- Paragrafo 2: mencionar a variedade do catalogo, opcoes de tamanho, faixas personalizadas, prazo de entrega.

Variar as orientacoes entre locais. Nao copiar o mesmo texto.

### Secao 2: "Flores mais utilizadas e seus significados"

**4 paragrafos**, cada um sobre uma flor diferente.

Formato: `"Flor: descricao e significado."`

Flores disponiveis para rotacao (escolher 4 diferentes por local):
- Lirios: pureza, elevacao espiritual, paz
- Rosas: amor, respeito, admiracao (brancas = paz, vermelhas = saudade)
- Crisantemos: verdade, lealdade, eternidade, durabilidade
- Gerberas: alegria, gratidao pela vida compartilhada
- Orquideas: beleza eterna, amor duradouro, sofisticacao
- Anturios: forca, resistencia, homenagem duradoura
- Margaridas: inocencia, pureza, simplicidade, ternura
- Astromelias: devocao, amizade duradoura, gratidao
- Angelicas: espiritualidade, protecao, delicadeza, fe

Cada descricao deve ser unica. Nao reutilizar textos identicos entre locais.

### Secao 3: "Entrega de flores no/na {name}"

**Artigo no/na conforme genero do substantivo principal:**
- "no" para: Cemiterio, Grupo, Memorial, Parque, Velorio, Monte, Crematório
- "na" para: Funeraria, Casa, Capela, Sala, Associacao

**2 paragrafos:**
- Paragrafo 1: promessa de entrega pontual, eficiencia, cuidado, logistica
- Paragrafo 2: **DISCLAIMER OBRIGATORIO** de independencia. Usar exatamente esta estrutura:

```
"Por favor, note que nao possuimos nenhum vinculo com o/a {name} - {city}. Nosso servico e independente e dedicado a entregar coroas de flores neste local para ajuda-lo a prestar sua ultima homenagem."
```

Ajustar "o/a" conforme o genero do local (o Cemiterio, a Funeraria).
