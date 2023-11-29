export const getQueryParamsFromUrl = url => {
  if (!url) return {};

  const { search } = new URL(url);
  const urlSearchParams = new URLSearchParams(search);
  return Object.fromEntries(urlSearchParams.entries());
};
