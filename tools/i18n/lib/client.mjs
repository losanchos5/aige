// The only place that talks to the Claude API. The SDK is imported lazily, so
// mock, estimate and dry-run modes work with no dependency installed. Tests
// pass a fake with the same methods, or this client with a fake `fetch`.

/**
 * @param opts.maxRetries SDK retries for 408/409/429/5xx and connection errors
 * @param opts.fetch      a fetch implementation (tests only)
 * @param opts.apiKey     an explicit key (tests only; the SDK reads ANTHROPIC_API_KEY)
 */
export async function createApiClient({ maxRetries = 4, fetch, apiKey } = {}) {
  let Anthropic;
  try {
    ({ default: Anthropic } = await import('@anthropic-ai/sdk'));
  } catch {
    throw new Error('the Anthropic SDK is not installed: run "npm ci" in tools/i18n');
  }
  const client = new Anthropic({ maxRetries, ...(fetch ? { fetch } : {}), ...(apiKey ? { apiKey } : {}) });
  const fatalClasses = [
    Anthropic.AuthenticationError,
    Anthropic.PermissionDeniedError,
    Anthropic.NotFoundError,
    Anthropic.BadRequestError,
    Anthropic.UnprocessableEntityError,
  ].filter(Boolean);
  return {
    /** One Messages API call. */
    create: (params) => client.messages.create(params),
    /** Message Batches API. */
    batchCreate: (requests) => client.messages.batches.create({ requests }),
    batchRetrieve: (id) => client.messages.batches.retrieve(id),
    async *batchResults(id) {
      for await (const r of await client.messages.batches.results(id)) yield r;
    },
    /** Errors that retrying cannot fix (bad key, bad request, unknown model): stop the run. */
    isFatal: (err) => fatalClasses.some((C) => err instanceof C),
  };
}
