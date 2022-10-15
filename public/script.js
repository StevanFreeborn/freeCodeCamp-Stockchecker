const getStockFormElement = document.getElementById('get-stock-form');
const stockSymbolElement = document.getElementById('stock-symbol');
const companyNameElement = document.getElementById('company-name');
const stockPriceElement = document.getElementById('stock-price');
const lastUpdateTimeElement = document.getElementById('latest-update-time');
const lastSourceElement = document.getElementById('latest-source');

window.onload = e => {
  getStockFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    const stockSymbol = e.target[0].value;
    await getStockPrice(stockSymbol);
  });
}

const getStockPrice = async (stockSymbol) => {
  const res = await fetch(`/api/stock-prices/?stock=${stockSymbol}`);
  const data = await res.json();
  console.log(data);
}