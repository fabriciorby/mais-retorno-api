# mais-retorno-api

Era para ser um domingo comum, onde eu iria estudar para as minhas provas de segunda-feira.

Antes de ir estudar fui ver alguns fundos de investimento, como por exemplo esse, da minha previdência privada.

Resolvi fazer uma planilha no Google Sheets para acompanhar todo o rendimento, entretanto eu precisava do valor de rendimento mensal para ser o multiplicador na planilha.

Olhando o site, vi que tinha tudo que precisava, mas era um saco ter que ficar copiando e colando um por um...

https://maisretorno.com/fundo/cshg-mapfre-juro-real-fic-fim-prev

Foi então que tive a brilhante ideia de pegar a API pelo ChromeDevTools e simplesmente linkar com a minha planilha! Seria um trabalho fácil!

Até que vi o retorno da API, todo torto e nada eficiente, e com mais de 22 mil linhas após formatação.

![Retorno da API](./img/retornoAPI.png)

Enfim, fiquei curioso sobre como transformar esses dados em informação, e então vasculhei o código-fonte da página, que possuia um Javascript minificado e nem um pouco atraente de mais de 70 mil linhas após formatação que se encontra no repositório como [rawFunction.js](./rawFunction.js).

E é isso... Só executar o rendimentoMensal.js e vai retornar os dados que eu quero.

É possível adicionar até 2 argumentos na chamada.

`node rendimentoAnual 2015 2017`

Irá retornar os rendimentos mensais de 2015 até 2017.

`node rendimentoAnual 2015`

Irá retornar os rendimentos mensais de 2015 até o último disponível.

Caso não seja possível se conectar com a internet ele irá retornar o dado gravado no cache [RetornoApi.json](./retornoAPI.json).

O JSON final ficará gravado em [dataFundo.json](./dataFundo.json).

Infelizmente o código ta feio, mas algum dia eu limpo ele.