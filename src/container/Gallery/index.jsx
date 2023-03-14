import { useSlider } from '../../hooks/useSlider';
import { Container } from '../../components';
import { List } from '../../components';
import { ListItem } from '../../components';
import { Image } from '../../components';
import { Button } from '../../components';
import { Typography } from '../../components';
import { Loader } from '../../components';

import s from './style.module.css';

const Gallery = ({ images }) => {
  const {
    handleClickNext,
    handleClickPrevious,
    transformFirstArg,
    currentSlide,
    data,
  } = useSlider({ images });

  const renderSilder = () => (
    <>
      <Typography>{data[currentSlide].name}</Typography>

      <div className={s.flex}>
        {data?.map(({ name, images }, idx) => (
          <div
            key={name}
            style={transformFirstArg(idx)}
            className={currentSlide === idx ? s.relative : s.absolute}
          >
            <List>
              {images.map(({ id, largeImageURL, tags }) => (
                <ListItem key={id}>
                  <Image src={largeImageURL} alt={tags} />
                </ListItem>
              ))}
            </List>
          </div>
        ))}
      </div>

      <p className={s.text}>
        {currentSlide + 1} / {data.length}
      </p>
      {currentSlide >= 1 && (
        <Button text="Prev" className={s.prev} onClick={handleClickPrevious} />
      )}
      {data.length !== currentSlide + 1 && (
        <Button className={s.next} text="Next" onClick={handleClickNext} />
      )}
    </>
  );

  return <Container>{data?.length ? renderSilder() : <Loader />}</Container>;
};

export default Gallery;
