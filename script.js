const quotes = document.getElementById("quotes");
const loader = document.getElementById("loader");
let page = 1;
let total = 0;

const hideLoader = () => {
  loader.classList.remove("show");
};

const showLoader = () => {
  loader.classList.add("show");
};

const getQuotes = async (page) => {
  const quotesUrl = `https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=10`;
  showLoader();
  const response = await fetch(quotesUrl);

  if (!response.ok) {
    throw new Error(`An error has occured: ${response.status}`);
  }
  const json = await response.json();
  showQuotes(json.data);
  hideLoader();
};

const showQuotes = (array) => {
  array.map((quote) => {
    const quoteElement = document.createElement("blockquote");
    quoteElement.classList.add("quote");
    quoteElement.innerHTML = `<span>${quote.id})</span>
        ${quote.quote}
        <footer>${quote.author}</footer>`;

    quotes.appendChild(quoteElement);
  });
};

const hasMoreQuotes = (page, total);

const loadQuotes = (page) => {
  showLoader();
  setTimeout(() => {
    getQuotes(page);
  }, 500);
};

document.addEventListener("scroll", () => {
  const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
  console.log(
    `scrollTop - ${scrollTop}  clientHeight - ${clientHeight}  scrollHeight - ${scrollHeight}`
  );

  if (scrollTop + clientHeight >= scrollHeight) {
    page++;
    console.log(page);
    loadQuotes(page);
  }
});

getQuotes(page);
