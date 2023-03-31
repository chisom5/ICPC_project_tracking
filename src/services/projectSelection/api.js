import {
  makeHttpRequest,
  authHttpRequest,
  makeFormDataHttpRequest,
} from "../../config/httpHelpers";
import baseUrl from "../../config/baseUrl";

export const makePostRequest = (url, data = {}, params = {}) =>
  makeHttpRequest(`${baseUrl}${url}`, data, "POST", params || {});

export const makeGetRequest = (url, params = {}) =>
  makeHttpRequest(`${baseUrl}${url}`, {}, "GET", params || {});

export const makeDeleteRequest = (url, params = {}) =>
  makeHttpRequest(`${baseUrl}${url}`, {}, "DELETE", params || {});

export const makeFormDataPostRequest = (url, data = {}, params = {}) =>
  makeFormDataHttpRequest(`${baseUrl}${url}`, data, "POST", params || {});
