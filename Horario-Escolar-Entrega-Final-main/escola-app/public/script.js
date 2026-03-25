async function carregarSelects(){
    let turmas = await fetch("/turmas").then(r => r.json())
    let professores = await fetch("/professores").then(r => r.json())

    let turmaSelect = document.getElementById("turma")
    let profSelect = document.getElementById("professor")

    turmaSelect.innerHTML = ""
    profSelect.innerHTML = ""

    turmas.forEach(t => {
        turmaSelect.innerHTML += `<option>${t.nome}</option>`
    })

    professores.forEach(p => {
        profSelect.innerHTML += `<option>${p.nome}</option>`
    })
}

async function carregarHorarios(){
    let dados = await fetch("/horarios").then(r => r.json())

    let tabela = document.getElementById("tabela")
    let horas = ["08:00","09:00","10:00","11:00","12:00"]
    let dias = ["Segunda","Terca","Quarta","Quinta","Sexta"]

    tabela.innerHTML = ""

    horas.forEach(h => {
        let tr = document.createElement("tr")
        tr.innerHTML = `<td>${h}</td>`

        dias.forEach(d => {
            let aula = dados.find(x => x.hora == h && x.dia == d)

            if(aula){
                tr.innerHTML += `
                <td>
                    ${aula.disciplina}<br>
                    ${aula.professor}<br>
                    <button onclick="apagarHorario(${aula.id})">🗑️</button>
                </td>`
            } else {
                tr.innerHTML += `<td></td>`
            }
        })

        tabela.appendChild(tr)
    })
}

async function addHorario(){
    let turma = document.getElementById("turma").value
    let professor = document.getElementById("professor").value
    let dia = document.getElementById("dia").value
    let hora = document.getElementById("hora").value
    let disciplina = document.getElementById("disciplina").value

    if(!turma || !professor || !hora || !disciplina){
        alert("Preenche tudo!")
        return
    }

    await fetch("/horarios", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({turma, dia, hora, disciplina, professor})
    })

    carregarHorarios()
}

// 🔥 APAGAR DEFINITIVO
async function apagarHorario(id){
    if(!confirm("Tens a certeza que queres apagar definitivamente?")) return

    let r = await fetch("/horarios/" + id, {
        method: "DELETE"
    })

    let res = await r.json()

    if(res.ok){
        carregarHorarios()
    }else{
        alert("Erro ao apagar")
    }
}

// iniciar
carregarSelects()
carregarHorarios()