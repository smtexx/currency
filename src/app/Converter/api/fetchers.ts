export const endpoint_ErApiCom =
  'https://open.er-api.com/v6/latest/USD';

export async function fetcher_ErApiCom(
  endpoint: string
): Promise<unknown> {
  const response = await fetch(endpoint);
  if (response.ok) {
    const data = await response.json();
    return data as unknown;
  } else {
    throw new Error(
      `Unable to fetch rates, response status: ${response.status}`
    );
  }
}
