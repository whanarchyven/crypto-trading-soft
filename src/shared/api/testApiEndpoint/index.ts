import { API } from '../api';
import { axiosInstance } from '../axios';
import { ITypes } from './types';

interface IParams {}

export const getTestApiEndpoint = async (params?: IParams) => {
  try {
    const result = await axiosInstance.get<ITypes[]>(API.getTestApiEndpoint, {
      params,
    });

    return result.data;
  } catch (e: any) {
    console.log(e);
    throw e;
  }
};
