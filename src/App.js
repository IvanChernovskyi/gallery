import { useState, useEffect, useCallback } from 'react';
import API from './services';

import { Gallery } from './container';

const App = () => {
  const [images, setImages] = useState([]);

  const getData = useCallback(async () => {
    const data = await API.getImages();
    setImages(data);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="App">
      <Gallery images={images} />
    </div>
  );
};

export default App;
