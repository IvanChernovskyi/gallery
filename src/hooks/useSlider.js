import { useState, useEffect, useCallback } from 'react';

import { KeyCode, imagesOnSlide } from '../constants';

export const useSlider = ({ images }) => {
  const [imagesList, setImagesList] = useState([]);
  const [throttle, setThrottle] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const splitToArrayOfIamges = useCallback(
    (arr, size) => {
      const res = [];
      let blockCount = 1;

      for (let i = 0; i < arr.length; i += size) {
        const getRandomImg = images[Math.floor(Math.random() * images.length)];

        const randomImg = {
          ...getRandomImg,
          id: getRandomImg.id + Math.random() + 'randomImg',
        };

        const arrOfimages = arr.slice(i, i + size);
        arrOfimages.splice(0, 1, randomImg);

        res.push({
          name: `Block ${blockCount}`,
          images: arrOfimages,
        });
        blockCount += 1;
      }

      return setImagesList(res);
    },
    [images],
  );

  useEffect(() => {
    if (images.length) {
      splitToArrayOfIamges(images, imagesOnSlide);
    }
  }, [images, splitToArrayOfIamges]);

  const transformFirstArg = (index) => {
    const totalSlides = imagesList.length - 1;
    const baseTranslateX = -100 * currentSlide;

    let translateX = baseTranslateX + index * 100;

    if (images.length >= 5) {
      if (currentSlide === 0 && index === totalSlides) {
        // make the last slide the slide before the first
        translateX = -100;
      } else if (currentSlide === totalSlides && index === 0) {
        // make the first slide the slide after the last
        translateX = 100;
      }
    }

    return {
      transform: `translateX(${translateX}%)`,
      transition: 'all 1200ms ease-out 0s',
    };
  };

  const throttleFn = () => {
    setThrottle(true);

    const timeout = setTimeout(() => {
      setThrottle(false);
    }, KeyCode.throttleDuration);

    return () => clearTimeout(timeout);
  };

  const handleClickNext = useCallback(() => {
    if (throttle) {
      return;
    }

    if (currentSlide + 1 !== imagesList.length) {
      setCurrentSlide(currentSlide + 1);
    }
  }, [throttle, currentSlide, imagesList.length]);

  const handleClickPrevious = useCallback(() => {
    if (throttle) {
      return;
    }

    if (currentSlide !== 0) {
      setCurrentSlide(currentSlide - 1);
    }
  }, [throttle, currentSlide]);

  const handleKeyPressed = useCallback(
    (event) => {
      switch (event.keyCode) {
        case KeyCode.leftKeyCode:
          handleClickPrevious();
          break;

        case KeyCode.rightKeyCode:
          handleClickNext();
          break;

        default:
          break;
      }
    },
    [handleClickNext, handleClickPrevious],
  );

  useEffect(() => {
    throttleFn();
  }, [currentSlide]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPressed);

    return () => document.removeEventListener('keydown', handleKeyPressed);
  }, [handleKeyPressed]);

  return {
    handleClickNext,
    handleClickPrevious,
    transformFirstArg,
    currentSlide,
    data: imagesList,
  };
};
