const axios = require('axios');
const fundData = require('./RetornoAPI');
const fs = require('fs');
const Fundo = require('./Fundo')

const url = 'https://maisretorno.com/api/v1/fundos/ss/cshg-mapfre-juro-real-fic-fim-prev/';
const options = { headers: { 'Authorization': 'Basic YXBpOlIkX1hKZk1uNVdhaHlKaA==' } };

const getFundData = async () => {
    try {
        const response = await axios.get(url, options)
        const data = response.data;
        return data;
    } catch (e) {
        console.error("Não foi possível fazer a requisição.", e.Error || '');
        console.log('Utilizando cache local');
        return fundData;
    }
}

const writeFile = async (nome, data) => {
    fs.writeFile(nome + '.json', data, 'utf8', (err) => { if (err) throw err; });
}

let main = async () => {
    let fundData = await getFundData();
    let fundo = new Fundo(fundData);
    writeFile('RetornoAPI', JSON.stringify(fundData));
    writeFile('dataFundo', JSON.stringify(fundo.statsData));
    fundo.printRendimentos(args[0], args[1]);
}

let args = process.argv.slice(2);

main(args);