import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PLACEHOLDER_IMAGE } from '../../constants';

import styles from './styles';



export const CoverImage = ({ isbnCode, coverImgUri, title }) => {
  const requestedImg = isbnCode ? coverImgUri : PLACEHOLDER_IMAGE
  const [imgSrc, setImgSrc] = useState(requestedImg);

  const handleImageLoaded = ({ target: img }) => {
    if (img.naturalWidth < 10) {
      setImgSrc(PLACEHOLDER_IMAGE);
    }
  }

  const handleImageErrored = () => {
    setImgSrc(PLACEHOLDER_IMAGE);
  }

  return (
    <img
      style={styles.coverImage}
      alt={title}
      src={imgSrc}
      onLoad={handleImageLoaded}
      onError={handleImageErrored}
    />
  );

}

CoverImage.propTypes = {
  title: PropTypes.string.isRequired,
  isbnCode: PropTypes.string,
  coverImgUri: PropTypes.string.isRequired,
}

CoverImage.defaultProps = {
  isbnCode: null,
}

export default CoverImage;