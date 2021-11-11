console.log("Extensao Jira Email Rodando");

console.log(equipesConfig)

const interval = setInterval(() => {
    const header = document.querySelector(".aui-nav")
    let key = document.querySelector('#key-val').innerHTML;
    let summary = document.querySelector('#summary-val').textContent;
    var time = '';
    let existe = document.querySelector('#customfield_14300-val') !== null;
    if (existe) {
        time = document.querySelector('#customfield_14300-val').textContent;
    } else {
        time = document.querySelector('#customfield_10000-val').textContent;
    }

    /**
     * monta e retorna o nome da branch como feature
     *
     * @return {String} feature branch name 
     */
    function montaBranchName() {
        var excluir = [',', 'uma', 'um', '-', 'a', 'ante', 'após até', 'com', 'contra', 'de', 'desde', 'em',
            'entre', 'para', 'per', 'perante', 'por', 'sem', 'sob', 'no', 'na', 'parte', '.']

        var thisSummary = summary.toLowerCase()
        var thisIssue = key

        //Limpa Parenteses
        thisSummary = thisSummary.replace(/\([^)]*\)/g, '')
        //limpa virgulas e caracteres especias \[]-_\
        thisSummary = thisSummary.replace(/,|\[|]|-|_|\//g, ' ')
        thisSummary = thisSummary.trim()
        //remove acentos
        thisSummary = thisSummary.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        thisSummary = thisSummary.trim()
        var splitSummary = thisSummary.split(' ')

        //remove palavras em excluir[]
        var newSummary = splitSummary.filter(palavra => {
            return excluir.indexOf(palavra) == -1 && palavra.length > 1
        })

        //monta branch name
        var featureTitle = 'feature-' + thisIssue
        newSummary.forEach(palavra => {
            featureTitle = `${featureTitle}_${palavra}`
        });

        console.log(featureTitle);
        return featureTitle

    }


    if (header) {
        console.log(header);
        clearInterval(interval);
        time = time.trim();
        var equipeCfg = equipesConfig.filter(cfgEquipe => {
            return cfgEquipe.equipe == time
        })
        var equipe = (equipeCfg.length > 0) ? equipeCfg[0].initEmail : "<equipe>";
        console.log(`inicio email ${equipe}`);

        var combomail = document.createElement("select");
        combomail.classList.add("combo");
        combomail.id = "combomail"

        var opt1 = document.createElement("option");
        opt1.value = "Entendimento";
        opt1.text = "Entendimento";
        combomail.appendChild(opt1);

        var opt2 = document.createElement("option");
        opt2.value = "Validação em homologação";
        opt2.text = "Validação em homologação";
        combomail.appendChild(opt2);

        var opt3 = document.createElement("option");
        opt3.value = "Pós Janela CRQ0000";
        opt3.text = "Pós-Janela";
        combomail.appendChild(opt3);

        header.appendChild(combomail);

        const buttonAssunto = document.createElement("button");
        buttonAssunto.innerHTML = "Assunto Email";
        buttonAssunto.classList.add("assunto");
        header.appendChild(buttonAssunto);


        const buttonFeature = document.createElement("button");
        buttonFeature.innerHTML = "Branch Name";
        buttonFeature.classList.add("git");
        header.appendChild(buttonFeature);


        //input temporario para copiar e colar
        let input = document.createElement("input");
        input.id = "tempText"


        buttonAssunto.addEventListener("click", () => {

            const e = document.querySelector("#combomail")
            let tipo = e.options[e.selectedIndex].value;
            let msg = `${equipe} ${tipo} ${key} (${summary})`;

            header.appendChild(input);
            input.value = msg;
            input.focus();
            input.select();
            input.setSelectionRange(0, 99999);
            document.execCommand("copy");
            header.removeChild(input);

            alert("COPIADO PARA AREA DE TRANSFERENCIA \n " + input.value);
        })


        buttonFeature.addEventListener("click", () => {
            let branchName = montaBranchName();

            header.appendChild(input);
            input.value = branchName;
            input.focus();
            input.select();
            input.setSelectionRange(0, 99999);
            document.execCommand("copy");
            header.removeChild(input);
            alert("COPIADO PARA AREA DE TRANSFERENCIA \n " + input.value);
        })

    }

}, 1000);