import axiosClient from "./axiosClient";
import store from '../app/store';
import queryString from 'query-string';
import { saveAs } from 'file-saver';
const tokenConfig = (getState) => {

  /* Get token from Localstorage */
  const token = getState().auth.token;

  const config = {
      headers : {
          'Content-type': 'application/json'
      }
  }

  /* If token, add to headers */
  if(token){
      config.headers['access-token'] = token;
  }

  return config

}

const manageChidlrenSpecialCircumstancesApi = {
  getAll: () => {
    const url = `/tre-em-hoan-canh-dac-biet`;
    return axiosClient.get(
        url,
        tokenConfig(store.getState)
    );
  },

  getDataSearch: () => {
    const url = `/tre-em-hoan-canh-dac-biet/search`;
    return axiosClient.get(
        url,
        tokenConfig(store.getState)
    );
  },

  getDataSearchHavePagination: (params) => {
    const accessToken = store.getState().auth.token ? store.getState().auth.token : null;
    const url = `/tre-em-hoan-canh-dac-biet/search`;
    return axiosClient.get(
        url,
        {
          params,
          headers : {
            'access-token' : accessToken,
          }
        }
    );
  },
  downloadFileExcelHCDB: (params) => {
    const url = `/excel/download`;
    const accessToken = store.getState().auth.token ? store.getState().auth.token : null;
    return axiosClient.get(
        url,
        {
          params,
          responseType: 'blob',
          headers : {
            'access-token' : accessToken,
            'content-type': 'application/vnd.ms-excel;charset=UTF-8',
          }
        }
    );
  },
}

export default manageChidlrenSpecialCircumstancesApi;