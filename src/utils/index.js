import { OK } from '../constants';

export const getData = (response = {}) => {
  const {
    status,
    data: { hits },
  } = response;

  if (status === OK) {
    return hits;
  } else {
    throw response;
  }
};
