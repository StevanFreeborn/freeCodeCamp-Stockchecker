const getStockFormElement = document.getElementById('get-stock-form');
const stockSymbolElement = document.getElementById('stock-symbol');
const companyNameElement = document.getElementById('company-name');
const stockPriceElement = document.getElementById('stock-price');
const lastUpdateTimeElement = document.getElementById('latest-update-time');
const lastSourceElement = document.getElementById('latest-source');
const errorMessageElement = document.getElementById('error-message');

window.onload = async (e) => {

  const defaultStockSymbol = 'VTI'
  const defaultStock = await getStockPrice(defaultStockSymbol);
  updateStockInformation(defaultStock);

  getStockFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (errorMessageElement.innerText) {
      errorMessageElement.innerText = '';
    }
    
    const stockSymbol = e.target[0].value;
    const stock = await getStockPrice(stockSymbol);

    if (stock.hasOwnProperty('error')) {
      errorMessageElement.innerText = stock.error;
      return resetStockInformation();
    }

    updateStockInformation(stock);
  });
}

const getStockPrice = async (stockSymbol) => {
  const res = await fetch(`/api/stock-prices/?stock=${stockSymbol}`);
  const stock = await res.json();
  return stock;
}

const updateStockInformation = (stock) => {
  stockSymbolElement.innerText = stock?.stockData?.stock;
  companyNameElement.innerText = stock?.stockData?.companyName;
  stockPriceElement.innerText = "$" + stock?.stockData?.price;
  lastUpdateTimeElement.innerText = new Date(stock?.stockData?.latestUpdate).toLocaleString();
  lastSourceElement.innerText = stock?.stockData?.latestSource;
}

const resetStockInformation = () => {
  stockSymbolElement.innerText = '-';
  companyNameElement.innerText = '';
  stockPriceElement.innerText = '-';
  lastUpdateTimeElement.innerText = '-';
  lastSourceElement.innerText = '-';
}