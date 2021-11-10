import Axios from 'axios';

export const ApiGetDataJobsheetID = async () => {
  const response = await Axios.get(
    '/api/apcargo/public/admin/getJSbuyingSelling/'
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });

  return response;
};
