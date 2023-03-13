import "./css/styles.css";
import debounce from "lodash.debounce";
import { fetchCountries } from "./js/fetchCountries";
import Notiflix from "notiflix";

const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.querySelector("input#search-box"),
  list: document.querySelector(".country-list"),
  oneCountry: document.querySelector(".country-info"),
};

refs.searchBox.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const textInput = e.target.value.trim();
  cleanMarkup();
  if (textInput !== "") {
    fetchCountries(textInput)
      .then((datasCountries) => {
        if (datasCountries.length > 10) {
          Notiflix.Notify.info(
            "Too many matches found. Please enter a more specific name."
          );
          console.log("!!!100");
        } else if (datasCountries.length >= 2 && datasCountries.length <= 10) {
          console.log("10");
          countryListRender(datasCountries);
        } else if (datasCountries.length === 1) {
          countryOneRender(datasCountries);
        }
      })
      .catch((error) => {
        Notiflix.Notify.failure("Oops, there is no country with that name");
      });
  }
}

function countryListRender(countries) {
  const markup = countries
    .map((country) => {
      return `<li><img src="${country.flags.svg}" width="30" height="25">
     <p>Name: ${country.name.official}</p></li>`;
    })
    .join("");
  refs.list.innerHTML = markup;
}

function countryOneRender(countries) {
  const markup = countries
    .map((country) => {
      return `<li>
<img src="${country.flags.svg}" width="120">
<h2>Name: ${country.name.official}</h2>
<h3>Capital: ${country.capital}</h3>
<p>Population: ${country.population}</p>
<p>Languages: ${Object.values(country.languages)}</p>
</li>`;
    })
    .join("");
  refs.oneCountry.innerHTML = markup;
}
function cleanMarkup() {
  refs.oneCountry.innerHTML = "";
  refs.list.innerHTML = "";
}
