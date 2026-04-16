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
| introduction total | 250-400 caracteres |
| introduction meta | Primeiros 152 chars terminam em limite de palavra |
| introduction meta conteudo | Primeiros 152 chars formam sentido completo com nome + cidade + valor |
| infoSections count | Exatamente 3 secoes |
| tributeSections count | Exatamente 3 secoes |
| paragraphs por secao | 2 paragrafos (exceto flores: 4 paragrafos) |

---

## 2. Qualidade de Conteudo

| Verificacao | Criterio |
|---|---|
| Word count total | >= 500 palavras (introduction + todas as secoes) |
| Sem em dashes | Zero ocorrencias de "—" em todo o conteudo |
| Sem palavras AI | Nenhuma das palavras/frases banidas (ver content-guidelines.md) |
| Sem fatos fabricados | Todo dado especifico (endereco, data, horario) foi verificado na pesquisa |
| Disclaimer presente | Ultimo paragrafo de tributeSections contem o disclaimer de independencia |
| Artigo no/na correto | "Entrega de flores no/na {name}" usa artigo correto para o genero |
| Flores diversificadas | 4 flores diferentes com descricoes unicas |
| Flores nao repetidas | Combinacao de 4 flores nao repete locais da mesma cidade |
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
| Nome do local | Aparece >= 6 vezes no conteudo completo |
| Nome da cidade | Aparece >= 3 vezes no conteudo completo |
| "coroa de flores" | Aparece >= 4 vezes no conteudo completo |
| Keywords LSI | Pelo menos 3 termos relacionados distribuidos no texto |

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
| Word count | OK | 612 palavras |
| Meta description | WARN | termina em "entre" (ajustar) |
| ...etc |
```

Status possiveis:
- **OK**: passou na verificacao
- **WARN**: passou com ressalva (informar o que pode ser melhorado)
- **FAIL**: nao passou (corrigir antes de salvar)

Se houver algum FAIL, corrija e revalide antes de salvar o arquivo.
