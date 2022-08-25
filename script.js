const select = document.querySelectorAll('select');
const input = document.querySelectorAll('input');
const API_URL = "https://api.exchangerate.host/latest";
let html = '';


async function currency(){
    const res = await fetch(API_URL);
    const data = await res.json();
    const arrkeys = Object.keys(data.rates);
    const rates = data.rates;
    console.log(rates);

    arrkeys.map(item =>{
        return html += `<option value=${item}>${item}</option>`;
    });
    console.log(html);
    for(let i=0; i<select.length; i++){
        select[i].innerHTML = html;
    };

    function convert(i,x){
        input[i].value = input[x].value * rates[select[i].value] / rates[select[x].value];
    }

    input[0].addEventListener('keyup', ()=> convert(1,0));

    input[1].addEventListener('keyup', ()=> convert(0,1));

    select[0].addEventListener('change', ()=> convert(0,1));
    
    select[1].addEventListener('change', ()=> convert(1,0));
};
currency();