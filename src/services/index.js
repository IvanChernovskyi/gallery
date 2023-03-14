import axios from 'axios';
import { KEY } from '../constants';
import { getData } from '../utils';

const API = {
  async getImages() {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=cat&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=20`,
      );

      return getData(response);
    } catch (error) {
      return error;
    }
  },
};

export default API;
