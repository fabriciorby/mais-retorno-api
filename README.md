# mais-retorno-api

Engenharia reversa de um js minificado.

Transformando um pouco mais de **92 mil linhas** (js + json) na informação que eu preciso.

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

## Funcionamento

Execute o arquivo `rendimentoMensal.js` e vai retornar todo o rendimento disponível pela API.

É possível adicionar até 2 argumentos na chamada.

### Chamada

`node rendimentoAnual 2015 2017`

Irá retornar os rendimentos mensais de 2015 até 2017.

`node rendimentoAnual 2015`

Irá retornar os rendimentos mensais de 2015 até o último disponível.

### Observações

Caso não seja possível se conectar com a internet ele irá retornar o dado gravado no cache [RetornoApi.json](./retornoAPI.json).

O JSON final ficará gravado em [dataFundo.json](./dataFundo.json).

Infelizmente o código está meio feio, afinal, peguei ele de um minificado, mas algum dia eu limpo ele.
