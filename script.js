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
    let sekundy = 0;
    let czyGraWystartowala = false;
    let licznikRuchow = 0;
    let odkryte = [];
    let blokadaKlikania = false;

    function stopStoper() {
        clearInterval(stoper);
        stoper = null;
    }

    function nowaGra() {
        licznikRuchow = 0;
        stopStoper();
        sekundy = 0;
        czyGraWystartowala = false;
        odkryte = [];
        blokadaKlikania = false;
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

        let wybraneKarty = symbole.slice(0, liczbaKart/2);
        let talia = wybraneKarty.concat(wybraneKarty);
        talia.sort(function(){ 
            return Math.random() - 0.5;
        });

        for(let i = 0; i < liczbaKart; i++) {
            const karta = $("<button></button>").addClass("karta").attr("type", "button").attr("data-symbol", talia[i]).text(talia[i]);

            karta.on("click", function(){
                if(blokadaKlikania) {
                    return;
                }

                let kliknieta = $(this);

                if(kliknieta.hasClass("odkryta")) {
                    return;
                }

                if(!czyGraWystartowala) {
                    czyGraWystartowala = true;
                    stoper = setInterval(function() {
                        sekundy++;
                        $("#czas").text(sekundy);
                    }, 1000);
                }

                kliknieta.addClass("odkryta");
                odkryte.push(kliknieta);

                if(odkryte.length === 2) {
                    licznikRuchow++;
                    $("#ruchy").text(licznikRuchow);

                    const pierwsza = odkryte[0];
                    const druga = odkryte[1];

                    if(pierwsza.attr("data-symbol") === druga.attr("data-symbol")) {
                        pierwsza.addClass("dopasowana");
                        druga.addClass("dopasowana");
                        odkryte = [];

                        if($(".karta.dopasowana").length === liczbaKart) {
                            stopStoper();
                            $("#komunikat").text("WYGRANA! Wykonane ruchy: " + licznikRuchow + ", czas: " + sekundy + "s");
                        }
                    } else {
                        blokadaKlikania = true;
                        setTimeout(function() {
                            pierwsza.removeClass("odkryta");
                            druga.removeClass("odkryta");
                            odkryte = [];
                            blokadaKlikania = false;
                        }, 800);
                    }
                }
            });

            plansza.append(karta);
        }
    }

    wybranyPoziom.on("change", nowaGra);
    $("#nowa-gra").on("click", nowaGra);
    nowaGra();
});