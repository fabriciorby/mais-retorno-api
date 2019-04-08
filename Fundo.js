const moment = require('moment')

let fundo = class Fundo {

    constructor(fundData) {
        this.monthsShort = "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_");
        this.fundData = fundData;
        this.generateStatsData();
    }

    getStructuredData() {
        for (var dataEstruturada = {}, e = null, n = 0; n < this.fundData.cotacoes.length; n++) {
            let ano = moment(this.fundData.cotacoes[n].m + 10800000).format("YYYY");
            let mes = moment(this.fundData.cotacoes[n].m + 10800000).format("MM");
            dataEstruturada[ano] || (dataEstruturada[ano] = {
                months: new Array,
                ticks: {},
                stats: {
                    fundo: {}
                }
            })
            dataEstruturada[ano].ticks[mes] || (
                e ? (dataEstruturada[ano].ticks[mes] = [e]) : (dataEstruturada[ano].ticks[mes] = []),
                dataEstruturada[ano].stats.fundo.total = 0,
                dataEstruturada[ano].stats.fundo[mes] = 0
            )
            dataEstruturada[ano].months.indexOf(mes) < 0 && dataEstruturada[ano].months.push(mes);
            dataEstruturada[ano].ticks[mes].push(this.fundData.cotacoes[n]);
            e = this.fundData.cotacoes[n];
        }
        return dataEstruturada
    }

    generateStatsData() {

        let dataEstruturada = this.getStructuredData();
        let tickInaugural = void 0;

        for (let ano in dataEstruturada) {
            for (let mes in dataEstruturada[ano].months) {

                let numMes = dataEstruturada[ano].months[mes]
                let primeiroTick = dataEstruturada[ano].ticks[numMes][0]
                let ultimoTick = dataEstruturada[ano].ticks[numMes][dataEstruturada[ano].ticks[numMes].length - 1]

                dataEstruturada[ano].stats.fundo[numMes] = 100 * (ultimoTick.c / primeiroTick.c - 1)
            }

            let primeiroTickDoAno = this.getFirstTickOfYear(dataEstruturada, ano);
            let ultimoTickDoAno = this.getLastTickOfYear(dataEstruturada, ano);

            tickInaugural || (tickInaugural = primeiroTickDoAno);

            dataEstruturada[ano].stats.fundo.year = 100 * (ultimoTickDoAno.c / primeiroTickDoAno.c - 1)
            dataEstruturada[ano].stats.fundo.total = 100 * (ultimoTickDoAno.c / tickInaugural.c - 1);
        }
        this.statsData = dataEstruturada
        this.statsKeys = Object.keys(this.statsData)

        return dataEstruturada;
    }

    getFirstTickOfYear(t, e, n) {
        void 0 === n && (n = 'ticks');
        let r = (new Date).getFullYear().toString();
        t[e] || e === r || (e = r), t[e] || (e = (parseInt(e) - 1).toString())
        return t[e][n][t[e].months[0]][0]
    }

    getLastTickOfYear(t, e, n) {
        void 0 === n && (n = 'ticks');
        let r = (new Date).getFullYear().toString();
        t[e] || e === r || (e = r), t[e] || (e = (parseInt(e) - 1).toString());
        let i = t[e].months[t[e].months.length - 1];
        return t[e][n][i][t[e][n][i].length - 1]
    }

    printRendimentos(anoInicio, anoFim) {

        let printHelper = {};

        anoInicio || (anoInicio = 0);
        anoFim || (anoFim = 9999);

        for (let ano in this.statsData) {
            if (ano > anoFim) 
                break;
            if (ano >= anoInicio){
                this.print(ano, printHelper);
            }
        }

        console.table(printHelper);

    }

    print(ano, printHelper) {
        printHelper[ano] = {};
        for (let i = 0; i < 12; i++) {
            let rendimentoMensal = this.statsData[ano].stats.fundo[this.stringifyMonth(i + 1)];
            printHelper[ano][this.monthsShort[i]] = rendimentoMensal ? rendimentoMensal.toFixed(2) + '%' : '-';
        }
        printHelper[ano]['Ano'] = this.statsData[ano].stats.fundo['year'].toFixed(2) + '%';
    }

    stringifyMonth(month) {
        if (month.toString().length < 2) {
            let a = '0' + month.toString();
            return a;
        } else {
            return month.toString();
        }
    }
}

module.exports = fundo;