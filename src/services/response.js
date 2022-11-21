export const isError = (response) => {
  if (!response.ok) {
    throw new Error(response.status)
  }
}