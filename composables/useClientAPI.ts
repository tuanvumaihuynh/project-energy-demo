export function useClientAPI<T>(url: String, options = {}) {
  const config = useRuntimeConfig();

  const fullUrl = `${config.public.apiBase}${url}`;
  const res = $fetch<T>(fullUrl, {
    headers: {
      "X-Api-Key": config.public.apiKey,
    },
    ...options,
  });
  return res;
}
