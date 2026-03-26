import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';

const getOptions = (params = {}) => ({
  params: { language: 'en-US', ...params },
});

export const useMovieDetails = (id, cat) => {
  return useQuery({
    queryKey: ['movie', id, cat],
    queryFn: async () => {
      const type = cat === 'M' ? 'movie' : 'tv';
      const { data } = await api.get(`/${type}/${id}`, getOptions());
      return data;
    },
    enabled: !!id && !!cat,
  });
};

export const useMovieVideos = (id, cat) => {
  return useQuery({
    queryKey: ['videos', id, cat],
    queryFn: async () => {
      const type = cat === 'M' ? 'movie' : 'tv';
      const { data } = await api.get(`/${type}/${id}/videos`, getOptions());
      return data.results;
    },
    enabled: !!id && !!cat,
  });
};

export const useMovieRecommendations = (id, cat, page = 1) => {
  return useQuery({
    queryKey: ['recommendations', id, cat, page],
    queryFn: async () => {
      const type = cat === 'M' ? 'movie' : 'tv';
      const { data } = await api.get(`/${type}/${id}/recommendations`, getOptions({ page }));
      return data.results;
    },
    enabled: !!id && !!cat,
  });
};

export const useMovieCredits = (id, cat) => {
  return useQuery({
    queryKey: ['credits', id, cat],
    queryFn: async () => {
      const type = cat === 'M' ? 'movie' : 'tv';
      const { data } = await api.get(`/${type}/${id}/credits`, getOptions());
      return data.cast;
    },
    enabled: !!id && !!cat,
  });
};

export const useTrending = (mediaType = 'all', timeWindow = 'week', page = 1) => {
  return useQuery({
    queryKey: ['trending', mediaType, timeWindow, page],
    queryFn: async () => {
      const { data } = await api.get(`/trending/${mediaType}/${timeWindow}`, getOptions({ page }));
      return data;
    },
  });
};

export const usePopularMovies = (page = 1) => {
  return useQuery({
    queryKey: ['popular', 'movie', page],
    queryFn: async () => {
      const { data } = await api.get('/movie/popular', getOptions({ page }));
      return data;
    },
  });
};

export const usePopularTvShows = (page = 1) => {
  return useQuery({
    queryKey: ['popular', 'tv', page],
    queryFn: async () => {
      const { data } = await api.get('/tv/popular', getOptions({ page }));
      return data;
    },
  });
};

export const useSearchMovies = (query, page = 1) => {
  return useQuery({
    queryKey: ['search', 'movie', query, page],
    queryFn: async () => {
      const { data } = await api.get('/search/multi', getOptions({ query, page }));
      return data;
    },
    enabled: !!query,
  });
};

export const useMovieGenres = (type) => {
  return useQuery({
    queryKey: ['genres', type],
    queryFn: async () => {
      const { data } = await api.get(`/genre/${type}/list`, getOptions());
      return data.genres;
    },
  });
};

export const useDiscover = (type, { genre, year, sortBy, page } = {}) => {
  return useQuery({
    queryKey: ['discover', type, genre, year, sortBy, page],
    queryFn: async () => {
      const params = { page, sort_by: sortBy };
      if (genre) params.with_genres = genre;
      if (year) params.primary_release_year = year;
      const { data } = await api.get(`/discover/${type}`, { params: { ...getOptions().params, ...params } });
      return data;
    },
  });
};

export const useGetContentDetails = (id, cat) => {
  return useQuery({
    queryKey: ['content', id, cat],
    queryFn: async () => {
      const { data } = await api.get(`/${cat === 'M' ? 'movie' : 'tv'}/${id}`, getOptions());
      return data;
    },
    enabled: !!id && !!cat,
  });
};

export const useMovieImages = (id, cat) => {
  return useQuery({
    queryKey: ['images', id, cat],
    queryFn: async () => {
      const type = cat === 'M' ? 'movie' : 'tv';
      const { data } = await api.get(`/${type}/${id}/images`, getOptions());
      return data;
    },
    enabled: !!id && !!cat,
  });
};

export const useSimilarMovies = (id, cat, page = 1) => {
  return useQuery({
    queryKey: ['similar', id, cat, page],
    queryFn: async () => {
      const type = cat === 'M' ? 'movie' : 'tv';
      const { data } = await api.get(`/${type}/${id}/similar`, getOptions({ page }));
      return data;
    },
    enabled: !!id && !!cat,
  });
};

export const usePersonDetails = (personId) => {
  return useQuery({
    queryKey: ['person', personId],
    queryFn: async () => {
      const { data } = await api.get(`/person/${personId}`, getOptions());
      return data;
    },
    enabled: !!personId,
  });
};

export const usePersonMovieCredits = (personId) => {
  return useQuery({
    queryKey: ['person-credits', personId],
    queryFn: async () => {
      const { data } = await api.get(`/person/${personId}/movie_credits`, getOptions());
      return data;
    },
    enabled: !!personId,
  });
};

export const usePersonTvCredits = (personId) => {
  return useQuery({
    queryKey: ['person-tv-credits', personId],
    queryFn: async () => {
      const { data } = await api.get(`/person/${personId}/tv_credits`, getOptions());
      return data;
    },
    enabled: !!personId,
  });
};

export const useExternalIds = (id, cat) => {
  return useQuery({
    queryKey: ['external-ids', id, cat],
    queryFn: async () => {
      const type = cat === 'M' ? 'movie' : 'tv';
      const { data } = await api.get(`/${type}/${id}/external_ids`, getOptions());
      return data;
    },
    enabled: !!id && !!cat,
  });
};

export const useReleaseDates = (id, cat) => {
  return useQuery({
    queryKey: ['release-dates', id, cat],
    queryFn: async () => {
      const type = cat === 'M' ? 'movie' : 'tv';
      const { data } = await api.get(`/${type}/${id}/release_dates`, getOptions());
      return data;
    },
    enabled: !!id && !!cat,
  });
};

export const useContentTranslations = (id, cat) => {
  return useQuery({
    queryKey: ['translations', id, cat],
    queryFn: async () => {
      const type = cat === 'M' ? 'movie' : 'tv';
      const { data } = await api.get(`/${type}/${id}/translations`, getOptions());
      return data;
    },
    enabled: !!id && !!cat,
  });
};