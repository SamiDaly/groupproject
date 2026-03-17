export type OmdbSearchItem = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type OmdbSearchResponse =
  | { Response: "True"; Search: OmdbSearchItem[]; totalResults: string }
  | { Response: "False"; Error: string };

export type OmdbMovieDetail = {
  Title: string;
  Year: string;
  Plot?: string;
  Genre?: string;
  Runtime?: string;
  Poster: string;
  imdbRating?: string;
  imdbVotes?: string;
  Response: "True" | "False";
  Error?: string;
};
