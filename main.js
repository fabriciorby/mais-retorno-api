const axios = require('axios');
const inquirer = require('inquirer');
const fundData = require('./RetornoAPI');
const fs = require('fs');
const Fundo = require('./Fundo');

//const url = 'https://maisretorno.com/api/v1/fundos/ss/cshg-mapfre-juro-real-fic-fim-prev/';

const options = { headers: { 'Authorization': 'Basic YXBpOlIkX1hKZk1uNVdhaHlKaA==' } };

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));
inquirer.prompt([{
    type: 'autocomplete',
    name: 'from',
    message: 'Digite o fundo que deseja obter o rendimento.',
    source: async (answersSoFar, input) => {
        try {
            if (!input) return [];
            const response = await axios.get(getUrlPesquisa(input), options)
            const filtroNome = response.data.map(item => item.s);
            return filtroNome;
        } catch (e) {
            console.error("Não foi possível fazer a requisição.", e.Error || '');
            console.error("Verifique sua conexão com a internet.")
            process.exit(1);
        }
    }
}]).then(function (answers) {
    main(answers.from)
});

const getUrlPesquisa = (input) => {
    return 'https://maisretorno.com/api/v1/fundos/s/' + input + '/';
}

const getUrlFundo = (input) => {
    return 'https://maisretorno.com/api/v1/fundos/ss/' + input + '/';
}

const getFundData = async (codFundo) => {
    try {
        const response = await axios.get(getUrlFundo(codFundo), options)
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

let main = async (codFundo) => {
    let fundData = await getFundData(codFundo);
    let fundo = new Fundo(fundData);
    writeFile('RetornoAPI', JSON.stringify(fundData));
    writeFile('dataFundo', JSON.stringify(fundo.statsData));
    fundo.printRendimentos(args[0], args[1]);
    console.log("Exibindo dados para " + codFundo);
}

let args = process.argv.slice(2);