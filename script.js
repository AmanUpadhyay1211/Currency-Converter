// API = https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json

let selects = document.querySelectorAll(`select`);
let input = document.querySelector(`input`);
let btn = document.querySelector(`form button`);
let from = document.querySelector(`#from`);
let to = document.querySelector(`#to`);
let msg = document.querySelector(`.msg`);
// msg.textContent = `100 USD = 8293.648922 INR`; //Update exchange rate can handle it

for (const select of selects) {
  for (const currency in currencyCountryPairs) {
    let option = document.createElement(`option`);
    option.textContent = currency;
    option.value = currency;
    select.append(option);

    if (select.id === `from` && currency === `USD`) {
      option.selected = `selected`;
    } else if (select.id === `to` && currency === `INR`) {
      option.selected = `selected`;
    }
  }
  select.addEventListener(`change`, (evt) => {
    updateFlag(evt.target); //Shows which select container has bess targeted .from or .to
  });
}

let updateFlag = (select) => {
  let currCode = select.value; //INR USD etc...
  let countryCode = currencyCountryPairs[currCode];
  // let img = document.querySelectorAll(`img`);
  let img = select.previousElementSibling;
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

async function updateEXchangeRate() {
  let amount = input.value;

  if (amount === `` || amount < 1) {
    amount = 1;
    input.value = 1;
  } //TO handle such cases

  let response = await fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`
  );
  let data = await response.json();
  let rate = data[to.value.toLowerCase()];
  let finalAmt = (amount * rate).toFixed(2);
  msg.textContent = `${amount} ${from.value} = ${finalAmt} ${to.value}`;
}

btn.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  updateEXchangeRate();
});

window.addEventListener(`load`, () => {
  setTimeout(updateEXchangeRate, 4000);
});
