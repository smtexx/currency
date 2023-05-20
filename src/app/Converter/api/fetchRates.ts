export async function fetchRates<
  Adapter extends (...args: any) => any
>(
  endpoint: string,
  adapter: Adapter
): Promise<ReturnType<Adapter> | { error: true }> {
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      const data = await response.json();
      return adapter(data);
    } else {
      throw new Error(
        `Unable to fetch rates, response status: ${response.status}`
      );
    }
  } catch (error) {
    console.error(error);
    return { error: true };
  }
}
