export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const query = getQuery(event);
  const body = await readBody(event);

  await $fetch(`${config.apiBase}/telemetry/attributes`, {
    method: "POST",
    headers: {
      "X-Api-Key": config.apiKey,
    },
    query,
    body,
    onRequestError: (error) => {
      throw createError({
        statusCode: 400,
        statusMessage: "Something went wrong",
      });
    },
    onResponseError: (error) => {
      throw createError({
        statusCode: 400,
        statusMessage: "Something went wrong",
      });
    },
  });
  return "Ok";
});
