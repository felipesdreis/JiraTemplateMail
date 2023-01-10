console.log("Extensao Jira Email Rodando");

console.log(equipesConfig)

const interval = setInterval(() => {
    // const header = document.querySelector(".aui-nav")
    const header = document.querySelector("#jira-issue-header-actions")
    let key = document.querySelector("#jira-issue-header > div > div > div > nav > ol > div:nth-child(4) > li > a > span").innerHTML;
    let summary = document.querySelector("#ak-main-content > div > div > div._4t3i1osq._1e0c1txw._2lx21bp4 > div._4t3i1osq._kqswh2mm > div._kqswh2mm._4t3i1osq > div._ogwtidpf._6tinidpf._1cezidpf._m3zkidpf._7yjtidpf._ldgnidpf._un3pidpf._29hzidpf._4t3i1osq._1e0c1txw._2lx21bp4._15y61q9c._k8em1osq._dzc24jg8 > div > div._1reo1e7b._18m92qvy._12ji1r31._1qu2glyw._12y31o36._16jlkb7n._1o9zidpf._i0dlidpf._1ul9xilx._19bv18bx > div > div._1e0c1txw._16jlkb7n._1o9zkb7n._i0dl1wug._1ul9idpf._1bsb1osq > div > div > div > form > div > div > div > div > h1").textContent;
    var time = '';
    let existe = document.querySelector("#ak-main-content > div > div > div._4t3i1osq._1e0c1txw._2lx21bp4 > div._4t3i1osq._kqswh2mm > div._kqswh2mm._4t3i1osq > div._ogwtidpf._6tinidpf._1cezidpf._m3zkidpf._7yjtidpf._ldgnidpf._un3pidpf._29hzidpf._4t3i1osq._1e0c1txw._2lx21bp4._15y61q9c._k8em1osq._dzc24jg8 > div > div._1reo1e7b._18m92qvy._12ji1r31._1qu2glyw._12y31o36._16jlkb7n._1o9zidpf._i0dlidpf._1ul9xilx._19bv18bx > div > div._19pkftgi > div:nth-child(1) > div._16jlkb7n._1bsb1nrf._vchhusvi._9e5411fb._mfgb11fb._1u0b11fb._t5zr11fb._196m16np > div > div > div > form > div > div > div > div") !== null;
    if (existe) {
        time = document.querySelector("#ak-main-content > div > div > div._4t3i1osq._1e0c1txw._2lx21bp4 > div._4t3i1osq._kqswh2mm > div._kqswh2mm._4t3i1osq > div._ogwtidpf._6tinidpf._1cezidpf._m3zkidpf._7yjtidpf._ldgnidpf._un3pidpf._29hzidpf._4t3i1osq._1e0c1txw._2lx21bp4._15y61q9c._k8em1osq._dzc24jg8 > div > div._1reo1e7b._18m92qvy._12ji1r31._1qu2glyw._12y31o36._16jlkb7n._1o9zidpf._i0dlidpf._1ul9xilx._19bv18bx > div > div._19pkftgi > div:nth-child(1) > div._16jlkb7n._1bsb1nrf._vchhusvi._9e5411fb._mfgb11fb._1u0b11fb._t5zr11fb._196m16np > div > div > div > form > div > div > div > div").textContent;
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
        console.log('header found');
        console.log(header);
        clearInterval(interval);
        time = time.trim();
        var equipeCfg = equipesConfig.filter(cfgEquipe => {
            return cfgEquipe.equipe == time
        })
        var equipe = (equipeCfg.length > 0) ? equipeCfg[0].initEmail : "<equipe>";
        console.log(`inicio email ${equipe}`);

        const combomail = document.createElement("select");
        combomail.classList.add("form-select");
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

        const divButtons = document.createElement("div")
        divButtons.id = "divButtons"

        const buttonFeature = document.createElement("button");
        buttonFeature.innerHTML = "Branch Name " + ' <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" height="15"/>';
        buttonFeature.classList.add("btn");
        buttonFeature.classList.add("btn-outline-warning");
        buttonFeature.classList.add("git");
        buttonFeature.setAttribute(
            'style',
            'margin-left: 3vh;',
          );
        

        const buttonAssunto = document.createElement("button");
        buttonAssunto.innerHTML = "Gerar Email";
        buttonAssunto.classList.add("btn");
        buttonAssunto.classList.add("btn-primary");

        const line = document.createElement("hr")

       
        divButtons.append(line)
        divButtons.appendChild(combomail);
        divButtons.appendChild(buttonAssunto);
        divButtons.appendChild(buttonFeature);
        divButtons.append(line)
        

        header.appendChild(divButtons)


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
            //verifica se quer que abre o template de email
            if(confirm('Gostaria de abrir o template?')){
    
                switch(e.options[e.selectedIndex].text){
                    case 'Entendimento':
                        window.open("https://docs.google.com/document/d/1Kmm6Mp6CQj1fCHT24Q5LP5E0aoS4uQ37-3ME1w0mPwA/edit?usp=share_link", "_blank");
                        break;
                    case 'Validação em homologação':
                        window.open("https://docs.google.com/document/d/1OuFpQOY7ZqfxEuw1Fe-H2OB_ekMGRPc6cig8iGwu0PI/edit?usp=share_link", "_blank");
                        break;
                    case 'Pós-Janela':
                        window.open("https://docs.google.com/document/d/1abBtKtoM4ALcHPZvU-aWrrbu26whNWO5lVwKXcqmhyA/edit?usp=share_link", "_blank");
                        break;
                }
            }
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