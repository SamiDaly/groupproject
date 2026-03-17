import type { OmdbMovieDetail, OmdbSearchResponse } from "../Types/type";

export const API_KEY = import.meta.env.VITE_API_KEY;

export async function fetchMovies(query: string): Promise<OmdbSearchResponse> {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function fetchMovieDetails(imdbID: string): Promise<OmdbMovieDetail> {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${encodeURIComponent(imdbID)}&plot=full`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
