export const fetchCountries = (name) => {
  const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        if (response.status === 404) {
          return Notiflix.Notify.failure(
            "Oops, there is no country with that name"
          );
        }
        throw new Error(response.status);
      }

      return response.json();
    })
    .catch((error) => console.log(error));
};
