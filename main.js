const bowling = {
    "players": [],
    "setScores": function() {
        if(this.players[0].scores.length < 10){
            this.players.forEach((giocatore)=>{
                 let tiro = Math.round(Math.random() * (10-0)+0);
                 if(tiro == 10){
                    let img = document.createElement("img")
                    img.setAttribute("src", "https://i.makeagif.com/media/4-11-2022/OSOGTu.gif")
                    img.classList.add("img-strike")
                    document.body.appendChild(img)
                    setTimeout(() => {
                        img.remove()
                    }, 5000);
                }
                 giocatore.scores.push(tiro);
                 giocatore.finalScore = giocatore.scores.reduce((acc,val) => acc + val,0)
            }) 
        }
    },
    "setWinner": function() {
        this.players.sort( (a, b)=> b.finalScore - a.finalScore );
        let winner = this.players[0];
        this.players.forEach( (giocatore)=>{
            if(giocatore.finalScore > winner.finalScore){
                winner = giocatore;
            }
        } );
    },
    "createTable": function() {
        playersWrapper.innerHTML = "";

        this.players.forEach((giocatore, i)=>{
            let tr = document.createElement("tr");
            tr.innerHTML = `
                            <th scope="row">${i+1}</th>
                            <td>${giocatore.name}</td>
                            <td>${giocatore.scores[0] ? giocatore.scores[0] : 0}</td>
                            <td>${giocatore.scores[1] ? giocatore.scores[1] : 0}</td>
                            <td>${giocatore.scores[2] ? giocatore.scores[2] : 0}</td>
                            <td>${giocatore.scores[3] ? giocatore.scores[3] : 0}</td>
                            <td>${giocatore.scores[4] ? giocatore.scores[4] : 0}</td>
                            <td>${giocatore.scores[5] ? giocatore.scores[5] : 0}</td>
                            <td>${giocatore.scores[6] ? giocatore.scores[6] : 0}</td>
                            <td>${giocatore.scores[7] ? giocatore.scores[7] : 0}</td>
                            <td>${giocatore.scores[8] ? giocatore.scores[8] : 0}</td>
                            <td>${giocatore.scores[9] ? giocatore.scores[9] : 0}</td>
                            <td>${giocatore.finalScore}</td>
                            `
            playersWrapper.appendChild(tr)
        })
    },
    "nuovoGiocatore": function(nome) {
        bowling.players.push({"name": nome, "scores": [], "finalScore": 0 })
    },
    "setModalResults": function(){

        modalWinner.innerHTML = `Il vincitore è ${this.players[0].name}`
 
    },
    "resetGame": function(){
        this.players = [];
    },
    "rivincita": function() {
        this.players.forEach((el)=>{
            el.scores = [];
            el.finalScore = [0];
        })
    }
};
let modalBody = document.querySelector("#modalBody");
let modalWinner = document.querySelector("#modalWinner");
let playStart = document.querySelector("#playStart");
let clickCount = 0;

const myModal = new bootstrap.Modal('#classificaModale', {
    backdrop: false
  })
const modalToggle = document.querySelector('#classificaModale'); 

playStart.addEventListener("click", ()=>{
    modalWinner.innerHTML = ""
    bowling.setScores();
    bowling.createTable();
    clickCount++;
    if(clickCount===10){
        setTimeout(()=>{
            myModal.show(modalToggle);
        }, 5000);
    }
    bowling.setModalResults();
});

let btnRivincita = document.querySelector("#btnRivincita");

btnRivincita.addEventListener("click", ()=>{
    bowling.rivincita();
    bowling.createTable();
})

let btnNuovaPartita = document.querySelector("#btnNuovaPartita");

btnNuovaPartita.addEventListener("click", ()=>{
    bowling.resetGame();
    bowling.createTable();
})

let inputNuovoGiocatore = document.querySelector("#inputNuovoGiocatore");
let aggiungiGiocatore = document.querySelector("#aggiungiGiocatore");

aggiungiGiocatore.addEventListener("click", ()=>{
    bowling.nuovoGiocatore(inputNuovoGiocatore.value);
    bowling.createTable();
    inputNuovoGiocatore.value = "";
})

