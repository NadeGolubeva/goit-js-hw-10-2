export const fetchCountries = (name) => {
  const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
