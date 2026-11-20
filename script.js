const komunikat = document.getElementById("komunikat");
const ruchy = document.getElementById("ruchy");
const czas = document.getElementById("czas");
const najlepszyWynik = document.getElementById("najlepszy");
const btnNowaGra = document.getElementById("nowa-gra");

 $(function(){
    const plansza = $("#plansza");
    const wybranyPoziom = $("#poziom");
    
    function nowaGra() {
        plansza.empty();
        const liczbaKart = Number($("#poziom").val());
        plansza.removeClass("kolumny4 kolumny5");
        if(liczbaKart === 20) {
            plansza.addClass("kolumny5");
        } else {
            plansza.addClass("kolumny4");
        }
        for(let i=0;i<liczbaKart;i++) {
            const karta = $("<button></button>").addClass("karta");
            plansza.append(karta);
        }
    
    }
    wybranyPoziom.on("change",nowaGra);
    $("#nowa-gra").on("click",nowaGra);
    nowaGra();
 })
