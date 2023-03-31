import axios from "axios";

export const authHttpRequest = async (url, data, method, params) => {
  const res = await axios({
    url,
    method,
    data,
    params,
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
  });
  return res;
};

export const makeHttpRequest = async (url, data = {}, method, params) => {
  const activeUser = JSON.parse(
    sessionStorage.getItem("IWPW_3ing_Token") || ""
  );

  const res = await axios({
    url,
    data,
    method,
    params,
    headers: {
      Accept: "application/json, text/plain */*",
      Authorization: `Bearer ${activeUser.access_token}`,
      // "Cache-Control": "no-cache",
      // "Access-Control-Allow-Origin": "*",
    },
  });
  return res;
};

export const makeHttpRequestWithoutToken = async (url, data, method, params) => {
  const res = await axios({
    url,
    method,
    data,
    params,
    headers: {
      Accept: "application/json, text/plain */*",
      // "Cache-Control": "no-cache",
      // "Access-Control-Allow-Origin": "*",
    },
  });
  return res;
};

export const makeFormDataHttpRequest = async (url, data, method, params) => {
  const activeUser = JSON.parse(
    sessionStorage.getItem("IWPW_3ing_Token") || ""
  );

  const res = await axios({
    url,
    data,
    method,
    params,
    headers: {
      "Content-Type": "multipart/form-data",
      // "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${activeUser.access_token}`,
      // "Cache-Control": "no-cache",
    },
  });
  return res;
};
