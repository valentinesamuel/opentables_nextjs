export const getQueryParams = (url: string) => {
  const queryParams: { [key: string]: string } = {};
  let queryParamssearchPortion = url.split("?")[1].split("&");
  queryParamssearchPortion.forEach((params) => {
    queryParams[params.split("=")[0]] = params
      .split("=")[1]
      .replaceAll("%20", " ");
    return queryParams;
  });
  return queryParams;
};
