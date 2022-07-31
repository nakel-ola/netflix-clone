// export const config = {
//   API_KEY: "57186edf75b1e0e4312c8aa3ad4c6271",
//   BASE_URL: "https://api.themoviedb.org/3/",
//   BASE_URL_CATEGORY: "https://api.themoviedb.org/",
//   IMAGE_URL: "https://image.tmdb.org/t/p/w1280",
// };

export const config = {
  API_KEY: `${process.env.API_KEY}`,
  BASE_URL: `${process.env.BASE_URL}`,
  BASE_URL_CATEGORY: `${process.env.BASE_URL_CATEGORY}`,
  IMAGE_URL: `${process.env.IMAGE_URL}`,
};

export const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];
export async function getPopularMovies(type: string) {
  let data = [];
  try {
    const response = await fetch(
      `${config.BASE_URL}${type}/popular?api_key=${config.API_KEY}&language=en-US`
    );
    const responseData = await response.json();
    data = responseData?.results;
  } catch (error) {}
  return data;
}

export async function getMoviesList() {
  let data: any[] = [];
  try {
    const response = await fetch(
      `${config.BASE_URL}genre/movie/list?api_key=${config.API_KEY}`
    );
    const responseData = await response.json();
    data = responseData.genres.map((data: any) => ({ ...data, type: "movie" }));
  } catch (error) {}
  return data;
}
export async function getSeriesList() {
  let data = [];
  try {
    const response = await fetch(
      `${config.BASE_URL}genre/tv/list?api_key=${config.API_KEY}`
    );

    const responseData = await response.json();
    data = responseData.genres.map((data: any) => ({ ...data, type: "tv" }));
  } catch (error) {}
  return data;
}

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
export async function getMoviesBycategory(id: number, type: string) {
  let data = [];
  try {
    const response = await fetch(
      `${config.BASE_URL}discover/${type}?api_key=${config.API_KEY}&with_genres=${id}`
    );
    var responseData = await response.json();
    data = shuffle(responseData?.results);
  } catch (error) {}
  return data;
}

export const getRandomData = async () => {

  const data = [];
  try {
    const seen = new Set();
    let series = await getSeriesList();
    let movies = await getMoviesList();

    let newData = [...series, ...movies];

    const result = newData.filter((el) => {
      const duplicate = seen.has(el.name);
      seen.add(el.name);
      return !duplicate;
    });

    for (var a = [], i = 0; i < 10; ++i) a[i] = i;
    a = shuffle(a);

    const nums = a;

    for (let i = 0; i < nums.length; i++) {
      data.push(result[nums[i]]);
    }

  } catch (e) {
    console.log(e);
  }

  return data;
};

export async function getCast(id: number) {
  let data = [];
  try {
    const response = await fetch(
      `${config.BASE_URL}movie/${id}/credits?api_key=${config.API_KEY}`
    );
    var responseData = await response.json();
    data = responseData;
  } catch (error) {}
  return data;
}

//genre/movie/list

export async function getSimilarMovies(id: number) {
  let data = [];
  try {
    const response = await fetch(
      `${config.BASE_URL}/movie/${id}/similar?api_key=${config.API_KEY}`
    );
    var responseData = await response.json();
    data = responseData.results;
  } catch (error) {}
  return data;
}