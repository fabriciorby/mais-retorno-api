# mais-retorno-api

Engenharia reversa de um js minificado.

Transformando um pouco mais de **92 mil linhas** (js + json) na informação que eu preciso.

# UPDATE

Agora e possível pesquisar fundos!

![Retorno](./img/mais-retorno-api.gif)

Obrigado [`inquirer`](https://github.com/SBoudrias/Inquirer.js) e seu plugin de autocomplete.

## Introdução

Era para ser um domingo comum, onde eu iria estudar para as minhas provas de segunda-feira... Entretanto, fui ver alguns fundos de investimento, como por exemplo esse, da minha previdência privada

https://maisretorno.com/fundo/cshg-mapfre-juro-real-fic-fim-prev

Resolvi fazer uma planilha no Google Sheets para acompanhar todo o rendimento, entretanto eu precisava do valor de rendimento mensal para ser o multiplicador na planilha.

Olhando o site, vi que tinha tudo que precisava, mas era um saco ter que ficar copiando e colando um por um... Foi então que tive a brilhante ideia de pegar a chamada da API pelo ChromeDevTools e simplesmente linkar com a minha planilha! Seria um trabalho fácil!

```javascript
const url = 'https://maisretorno.com/api/v1/fundos/ss/cshg-mapfre-juro-real-fic-fim-prev/';
const options = { headers: { 'Authorization': 'Basic YXBpOlIkX1hKZk1uNVdhaHlKaA==' } };
```

Até que vi o retorno da API, todo torto e nada eficiente, e com mais de **22 mil linhas** após formatação, que sem encontra em [RetornoApi.json](./retornoAPI.json).

![Retorno da API](./img/retornoAPI.png)

Enfim, fiquei curioso sobre como transformar esses dados em informação palpável, e então vasculhei o código-fonte da página, que possuia um import para um CDN que me levou para um javascript minificado e nem um pouco atraente de mais de **70 mil linhas** após formatação que se encontra no repositório como [rawFunction.js](./rawFunction.js).

## Comparação

[Retorno](./img/retorno.png)

[Site](./img/retornoSite.png)

## Funcionamento

`git clone https://github.com/fabriciorby/mais-retorno-api.git`

`cd mais-retorno-api`

`npm install`

`node main.js`

Irá retornar todo rendimento disponível pela API.

![Retorno](./img/retorno.png)

### Args

`node main.js 2015 2017`

![Retorno Parcial](./img/retorno-parcial.png)

Irá retornar os rendimentos mensais de 2015 até 2017.

`node main.js 2019`

![Retorno 2019](./img/retorno2019.png)

Irá retornar os rendimentos mensais de 2019 até o último disponível.

### Observações

Caso não seja possível se conectar com a internet ele irá retornar o dado gravado no cache [RetornoApi.json](./retornoAPI.json).

O JSON final ficará gravado em [dataFundo.json](./dataFundo.json).

Infelizmente o código está meio feio, afinal, peguei ele de um minificado, mas algum dia eu limpo ele.

### Alguma documentação

```javascript
const url = 'https://maisretorno.com/api/v1/fundos/';
```
Retorna uma lista com TODOS OS FUNDOS disponíveis no banco de dados. Ex: [listaFundos.json](./listaFundos.json) (6.5MB).

```javascript
const url = 'https://maisretorno.com/api/v1/fundos/s/' + nomeFundo '/';
```
Retorna uma busca numa lista de fundos com a `String nomeFundo` que você desejar.

```json
c: cnpj
n: nome
s: nome api
p: patrimonio
q: cotistas

{
    "c": 26673556000132,
    "n": "ALASKA BLACK INSTITUCIONAL FUNDO DE INVESTIMENTO DE ACOES",
    "s": "alaska-black-institucional-fia",
    "p": 1294212260.75,
    "q": 79508
}
```

```javascript
const url - 'https://maisretorno.com/api/v1/fundos/ranking/'
```
Retorna os top 10 fundos Renda Fixa, Multi Mercado e Ações dos últimos 6 meses.