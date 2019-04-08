const axios = require('axios');
const inquirer = require('inquirer');
const fundData = require('./RetornoAPI');
const fs = require('fs');
const Fundo = require('./Fundo');

const options = { headers: { 'Authorization': 'Basic YXBpOlIkX1hKZk1uNVdhaHlKaA==' } };
const args = process.argv.slice(2);

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

const menu = () => {
    inquirer.prompt([{
        type: 'autocomplete',
        name: 'codFundo',
        message: 'Digite o fundo que deseja obter o rendimento.',
        pageSize: 10,
        source: async (answersSoFar, input) => {
            if (!input) return [];
            const pesquisaData = await getPesquisaData(input);
            return pesquisaData;
        }
    }]).then(async (answers) => {
        await getRendimento(answers.codFundo);
        pesquisarOutroFundo();
    });
}

const getPesquisaData = async (input) => {
    try {
        const response = await axios.get(getUrlPesquisa(input), options)
        const filtroNome = response.data.map(item => item.s);
        return filtroNome;
    } catch (e) {
        console.error("Não foi possível fazer a requisição.", e.Error || '');
        console.error("Verifique sua conexão com a internet.")
        process.exit(1);
    }
}

const getUrlPesquisa = (input) => {
    return 'https://maisretorno.com/api/v1/fundos/s/' + input + '/';
}

const getRendimento = async (codFundo) => {
    let fundData = await getFundData(codFundo);
    let fundo = new Fundo(fundData);
    writeFile('RetornoAPI', JSON.stringify(fundData));
    writeFile('dataFundo', JSON.stringify(fundo.statsData));
    fundo.printRendimentos(args[0], args[1]);
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

const getUrlFundo = (codFundo) => {
    return 'https://maisretorno.com/api/v1/fundos/ss/' + codFundo + '/';
}

const writeFile = async (nome, data) => {
    fs.writeFile(nome + '.json', data, 'utf8', (err) => { if (err) throw err; });
}

const pesquisarOutroFundo = () => {
    inquirer.prompt([{
        type: 'list',
        name: 'input',
        message: 'Deseja pesquisar outro fundo?',
        choices: ['Não', 'Sim'],
        filter: (input) => {
            return input == 'Sim' ? true : false;
        }
    }]).then((answers) => {
        if (answers.input) {
            console.clear();
            menu();
        }
    });
}

menu();