---
name: location-content
description: "Gera conteudo JSON otimizado para SEO para paginas de locais (cemiterios, funerarias, capelas, crematorios, salas de velorio) do site Coroa de Flores Nobre. Use esta skill quando o usuario quiser criar ou atualizar conteudo para uma pagina de local, adicionar novo cemiterio ou funeraria, gerar JSON de localidade, ou mencionar qualquer nome de cemiterio/funeraria no contexto de criacao de conteudo para o site. Tambem use quando o usuario disser 'novo local', 'adicionar local', 'conteudo de local', 'criar pagina para [nome]', 'gerar conteudo para [cemiterio/funeraria]', 'adicionar cemiterio', 'nova funeraria'. Para auditoria SEO de paginas existentes, veja seo-audit. Para copywriting generico, veja copywriting."
---

# Location Content Generator

Skill para gerar conteudo JSON de paginas de locais (cemiterios, funerarias, crematorios, capelas, salas de velorio) para o site Coroa de Flores Nobre. O conteudo gerado alimenta paginas estaticas otimizadas para SEO.

A skill e generica para qualquer cidade e estado do Brasil. Pode ser reutilizada em projetos identicos para diferentes regioes.

## Antes de Comecar

Leia o `CLAUDE.md` do projeto para entender o contexto, tech stack e convencoes. Isso garante que o conteudo gerado seja compativel com o pipeline de renderizacao existente.

## Workflow

### Passo 1: Coletar Inputs

Pergunte ao usuario:
- **Nome do local** (ex: "Cemiterio do Bonfim", "Funeraria Paz Universal")
- **Cidade** (ex: "Belo Horizonte", "Sao Paulo", "Curitiba")
- **Estado (UF)** (ex: "MG", "SP", "PR")

Se o usuario fornecer apenas o nome, pergunte cidade e UF antes de prosseguir. Isso evita confusoes com locais homonimos em cidades diferentes.

Se o usuario fornecer varios locais de uma vez, processe um por vez para manter a qualidade da pesquisa.

### Passo 2: Verificar Duplicatas

Leia `src/data/locations.json` e verifique se o slug gerado ja existe. Se existir, avise o usuario e pergunte como prosseguir (atualizar ou cancelar).

Gere o slug no formato: `{nome-slugificado}-{cidade-slugificada}` (lowercase, hifens, sem acentos, sem caracteres especiais).

### Passo 3: Pesquisar Informacoes Reais

Use WebSearch para encontrar dados verificaveis sobre o local. Execute pelo menos 3 buscas:

1. `"{nome do local}" {cidade} endereco horario funcionamento`
2. `"{nome do local}" {cidade} historia`
3. `"{nome do local}" {cidade}` (busca geral para confirmar dados)

Registre o que encontrar:
- Endereco completo e bairro
- Horarios de funcionamento (visitacao e administrativo)
- Ano de fundacao ou inauguracao
- Fatos historicos relevantes
- Como chegar (vias de acesso, transporte publico)
- Servicos oferecidos
- Telefone e outras informacoes de contato

**Regra critica sobre informacoes nao verificadas:**

O conteudo sera publicado e lido por pessoas reais em momentos delicados. Informacoes incorretas causam frustacao e destroem credibilidade. Quando nao puder confirmar um dado:
- Para horarios: use "geralmente funciona das Xh as Yh" ou "recomenda-se verificar os horarios diretamente com a administracao"
- Para enderecos: descreva a regiao/bairro sem inventar numero ou rua
- Para historia: omita detalhes especificos (datas, nomes) que nao foram confirmados
- Nunca fabrique informacoes. Preferir omissao a invencao.

### Passo 4: Apresentar Achados

Antes de gerar o conteudo, apresente ao usuario um resumo do que foi encontrado na pesquisa e o que nao pode ser confirmado. Pergunte se tem informacoes adicionais para complementar.

### Passo 5: Gerar Conteudo

Gere o JSON completo seguindo as especificacoes em `references/location-schema.md` para o formato de cada campo, e `references/content-guidelines.md` para as regras de escrita, tom e padroes anti-AI.

Estes arquivos de referencia contem as regras detalhadas. Leia-os antes de gerar o conteudo.

### Passo 6: Validar

Execute o checklist em `references/quality-checklist.md` antes de apresentar o output. Apresente uma tabela resumo com o status de cada verificacao.

Exemplo:
| Verificacao | Status | Nota |
|---|---|---|
| Slug unico | OK | nao existe em locations.json |
| Title 50-63 chars | OK | 58 caracteres |
| Introducao primeiros 152 chars | OK | termina em "...homenagem." |
| Total de palavras | OK | 612 palavras |
| Sem em dashes | OK | nenhum encontrado |
| Disclaimer presente | OK | paragrafo final de tributeSections |

### Passo 7: Salvar Output

Salve o JSON em `src/data/locations/generated/{slug}.json`. O arquivo contem um unico objeto Location (sem array).

Exiba o JSON completo no chat para revisao.

### Passo 8: Instrucoes de Integracao

Informe ao usuario como adicionar o local ao site:
1. Revisar o JSON gerado
2. Copiar o objeto para o array em `src/data/locations.json`
3. Se a cidade for nova, adicionar em `src/data/cities.json` e `src/data/regions.json`
4. Rodar `npm run build` para verificar que compila sem erros
5. A pagina estara disponivel em `/locais/{slug}`

Ou ofereca para fazer o merge automaticamente.

---

## Contexto Tecnico de Renderizacao

Entender como cada campo e usado na pagina ajuda a escrever conteudo mais eficaz:

- **title** → H1 da pagina + meta title (o codigo adiciona " | Coroa de Flores Nobre" ao final)
- **introduction** → meta description (primeiros 152 chars + "...") + paragrafo de abertura da pagina
- **infoSections[0].title** → H2 (fonte serif, 26-30px, bold)
- **infoSections[1+].title** → H3 (18-20px, bold)
- **tributeSections[*].title** → H3 (mesmo estilo)
- **name + city** → embed do Google Maps, breadcrumbs, links para locais irmaos
- **slug** → URL canonica em `/locais/{slug}`

O Google Maps usa a query `{name} {city} {uf}` para localizar o pin. Portanto, o campo `name` deve ser reconhecivel pelo Google Maps.

## Tipos de Locais Suportados

- Cemiterios (Cemiterio do Bonfim, Cemiterio da Paz, etc.)
- Funerarias (Funeraria Paz Universal, Funeraria Santa Casa, etc.)
- Crematorios (Crematorio Metropolitan, etc.)
- Salas de Velorio (Sala de Velorio do Hospital X, etc.)
- Memoriais e Capelas
- Grupos funerarios (Grupo Zelo, Grupo Memorial, etc.)

Cada tipo tem particularidades no conteudo (crematorios mencionam cremacao, funerarias mencionam servicos completos, etc.). Adapte o conteudo ao tipo do local.
