export function useAPI<T>(url: String, options = {}) {
  const config = useRuntimeConfig();

  const fullUrl = `${config.public.apiBase}${url}`;
  return useFetch<T>(fullUrl, {
    headers: {
      "X-Api-Key": config.public.apiKey,
    },
    ...options,
  });
}
