import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function LazyImage({ image }) {
  return (
    <LazyLoadImage
      alt={image.alt}
      height={image.height}
      src={image.src} // use normal <img> attributes as props
      width={image.width}
    />
  );
}

export default LazyImage;
