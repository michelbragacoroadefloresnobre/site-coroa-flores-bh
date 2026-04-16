# Quality Checklist — Validacao Pre-Output

Execute todas as verificacoes abaixo antes de apresentar o JSON final ao usuario.

---

## 1. Validacao de Campos

| Verificacao | Criterio |
|---|---|
| slug unico | Nao existe em `src/data/locations.json` |
| slug formato | lowercase, hifens, sem acentos, sem caracteres especiais |
| name | Grafia oficial, capitalizacao correta, sem nome da cidade |
| city | Grafia correta com acentos |
| uf | 2 letras maiusculas, sigla valida de estado brasileiro |
| title comprimento | 50-63 caracteres (WARN se >63, FAIL se >75) |
| title formato | Contem nome do local + cidade + UF |
| introduction total | 400-700 caracteres |
| introduction meta | Primeiros 152 chars terminam em limite de palavra (ponto, virgula ou espaco) |
| introduction meta conteudo | Primeiros 152 chars formam sentido completo com nome + cidade + valor |
| infoSections count | 6 a 7 secoes |
| tributeSections count | 7 a 8 secoes |
| paragraphs por secao | 2-5 paragrafos conforme especificacao de cada secao |

---

## 2. Qualidade de Conteudo

| Verificacao | Criterio |
|---|---|
| Word count total | 3.000-5.000 palavras (introduction + todas as secoes) |
| Palavras unicas do local | >= 500 palavras de conteudo especifico do local (infoSections + intro) |
| Sem em dashes | Zero ocorrencias de "—" em todo o conteudo |
| Sem palavras AI | Nenhuma das palavras/frases banidas (ver content-guidelines.md) |
| Sem fatos fabricados | Todo dado especifico (endereco, data, horario) foi verificado na pesquisa |
| Disclaimer presente | Ultimo paragrafo de tributeSections contem o disclaimer de independencia |
| Artigo no/na correto | "Entrega de flores no/na {name}" usa artigo correto para o genero |
| Flores diversificadas | 6 flores diferentes com descricoes unicas e detalhadas |
| Flores nao repetidas | Combinacao de 6 flores nao repete locais da mesma cidade |
| Mensagens de faixa | Secao com exemplos variados por tipo de relacao |
| FAQ presente | 5-6 perguntas frequentes contextualizadas ao local |
| Paragrafos variados | Nenhum par de paragrafos consecutivos comeca com a mesma palavra |
| Frases naturais | Releitura confirma tom natural, sem frases que soem artificiais |
| Tom adequado | Sem exclamacoes, sem linguagem de vendas, tom respeitoso |

---

## 3. SEO

| Verificacao | Criterio |
|---|---|
| Keyword no title | "Coroa de Flores" + nome do local presentes no title |
| Keyword na introduction | Nome do local + cidade presentes na introduction |
| Keyword em secoes | Nome do local aparece em pelo menos 2 corpos de secao |
| Nome do local | Aparece >= 15 vezes no conteudo completo (proporcional ao volume) |
| Nome da cidade | Aparece >= 8 vezes no conteudo completo |
| "coroa de flores" | Aparece >= 10 vezes no conteudo completo |
| Keywords LSI | Pelo menos 8 termos relacionados distribuidos no texto |

---

## 4. Unicidade

| Verificacao | Criterio |
|---|---|
| Introduction unica | Nao compartilha >40% da fraseologia com entradas existentes da mesma cidade |
| Secoes de tributo variadas | Orientacoes de escolha e descricoes de entrega diferem de outros locais |

---

## Formato da Tabela de Validacao

Apresente os resultados ao usuario neste formato:

```
| Verificacao | Status | Nota |
|---|---|---|
| Slug unico | OK | nao existe em locations.json |
| Title comprimento | OK | 58 caracteres |
| Word count total | OK | 3.420 palavras |
| Palavras unicas do local | OK | 820 palavras |
| Meta description | WARN | termina em "entre" (ajustar) |
| ...etc |
```

Status possiveis:
- **OK**: passou na verificacao
- **WARN**: passou com ressalva (informar o que pode ser melhorado)
- **FAIL**: nao passou (corrigir antes de salvar)

Se houver algum FAIL, corrija e revalide antes de salvar o arquivo.
