import { makeHttpRequest, authHttpRequest } from "../../config/httpHelpers";
import baseUrl from "../../config/baseUrl";

export const makeAuthRequest = (url, data, params) =>
  authHttpRequest(`${baseUrl}${url}`, data, "POST", params);

export const makePostRequest = (url, data = {}, params = {}) =>
  makeHttpRequest(`${baseUrl}${url}`, data, "POST", params || {});

export const makeGetRequest = (url, params = {}) =>
  makeHttpRequest(`${baseUrl}${url}`, {}, "GET", params || {});
