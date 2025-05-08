export function getListTitleAndPath(keyword) {
  const moviePathBase = "/movies?movies-tag";
  const tvPathBase = "/tv-shows?tv-tag";

  let path, listTitle;

  switch (keyword) {
    case "popularMovies":
      path = `${moviePathBase}=popular&page=1`;
      listTitle = "Popular Movies";
      break;
    case "popularTv":
      listTitle = "Popular TV Shows";
      path = `${tvPathBase}=popular&page=1`;
      break;
    case "topRatedMovies":
      listTitle = "Top Rated Movies";
      path = `${moviePathBase}=top_rated&page=1`;
      break;
    case "topRatedTv":
      listTitle = "Top Rated TV Shows";
      path = `${tvPathBase}=top_rated&page=1`;
      break;
    case "nowPlaynigMovies":
      listTitle = "Now Playnig Movies";
      path = `${moviePathBase}=now_playing&page=1`;
      break;
    case "onTheAir":
      listTitle = "TV Shows on the Air";
      path = `${tvPathBase}=on_the_air&page=1`;
      break;
    case "upcomingMovies":
      listTitle = "Upcoming Movies";
      path = `${moviePathBase}=upcoming&page=1`;
      break;
    case "airingTodayTV":
      listTitle = "TV Shows Airing Today";
      path = `${tvPathBase}=airing_today&page=1`;
      break;
    default:
      path = `${moviePathBase}=popular&page=1`;
      listTitle = "Popular Movies";
      break;
  }

  return { path, listTitle };
}

export function getImageViaPath(path, width) {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/w${width}${path}`;
}

export function updateDateFormat(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
export function formatDateForPerson(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getYearMonthFormat(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}
export function getYearFormat(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
  });
}

export function calculateAge(birthday, deathday = null) {
  const birthDate = new Date(birthday);
  const endDate = deathday ? new Date(deathday) : new Date();
  const age = Math.floor(
    (endDate - birthDate) / (365.25 * 24 * 60 * 60 * 1000)
  );
  return age;
}

export function ratePercentage(rate) {
  const rateNum = Math.round(Number(rate) * 10);
  return rateNum;
}

export function formatNumber(num) {
  return num % 1 !== 0 ? num.toFixed(1) : num;
}

export function getPictureUrlFormat(paramId, width = 1280) {
  // for backdrop width w400, w780, w1280, original
  // for log width "w45", "w92", "w154", "w185", "w300", "w500", "original"
  // for poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
  // for profile_sizes "w45", "w185", "h632", "original",
  // for still_sizes "w92", "w185", "w300", "original",
  return paramId ? `https://image.tmdb.org/t/p/w${width}${paramId}` : null;
}

export function getProfileImageUrl(path) {
  if (!path) return;
  return `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${path}`;
}

export function getMainCrewRolls(arr) {
  const directing = arr?.filter((item) => item["job"] === "Director");
  const writing = arr?.filter(
    (item) => item["job"] === "Screenplay" || item["job"] === "Writer"
  );

  return { directing, writing };
}

export function formatHugeNumber(num) {
  const units = [
    { value: 1000000000, symbol: "B" },
    { value: 1000000, symbol: "M" },
    { value: 1000, symbol: "K" },
  ];

  for (const unit of units) {
    if (num >= unit.value) {
      const formatted = (num / unit.value).toFixed(2);
      return formatted.endsWith(".00")
        ? Math.round(num / unit.value) + unit.symbol
        : formatted + unit.symbol;
    }
  }

  return num;
}

export function updateRuntime(runtime) {
  const hours = Math.floor(runtime / 60);
  const remainingMinutes = runtime % 60;

  if (!hours) return `${runtime}min`;

  return `${hours}h ${remainingMinutes}min`;
}
