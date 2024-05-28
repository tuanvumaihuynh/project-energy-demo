export const useCustomFetch = (url: String) => {
  const config = useRuntimeConfig();

  const fullUrl = `${config.public.apiBase}${url}`;
  return useFetch(fullUrl, {
    headers: {
      "X-Api-Key": config.public.apiKey,
    },
  });
};
