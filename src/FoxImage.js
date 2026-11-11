export const API_URL = 'https://randomfox.ca/floof/';

export async function getFoxImage() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch a fox image.');
  }

  const data = await response.json();
  if (typeof data.image !== 'string' || !data.image) {
    throw new Error('The fox image response was invalid.');
  }

  return data.image;
}
