const komunikat = document.getElementById("komunikat");
const ruchy = document.getElementById("ruchy");
const czas = document.getElementById("czas");
const najlepszyWynik = document.getElementById("najlepszy");
const btnNowaGra = document.getElementById("nowa-gra");

 $(function(){
    const plansza = $("#plansza");
    const wybranyPoziom = $("#poziom");
    const symbole = ["🍎", "🍇", "🍓", "🍒", "🍋", "🍉", "🥝", "🍑", "🍍", "🥥"];
    let stoper = null;
    
    function stopStoper() {
        clearInterval(stoper);
        stoper=null;
    }
    function nowaGra() {
        let licznikRuchow = 0;
        let sekundy = 0;
        let czyGraWystartowala = false;

        $("#ruchy").text(0);
        $("#czas").text(0);
        $("#komunikat").text("");
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
        if(!czyGraWystartowala) {
            czyGraWystartowala = true;
            stoper = setInterval(function() {
                sekundy++;
                $("#czas").text(sekundy);
            },1000);
        }
    
    }
    wybranyPoziom.on("change",nowaGra);
    $("#nowa-gra").on("click",nowaGra);
    nowaGra();
 })
