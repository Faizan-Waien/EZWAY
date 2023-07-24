import { useState } from 'react';
import './imgSlider.css';
import img1 from '/src/assets/1.jpg'
import img2 from '/src/assets/2.jpg'
import img3 from '/src/assets/3.jpg'
import img4 from '/src/assets/4.jpg'

const photos = [
  {
    id: 'p1',
    url: img1,
  },
  {
    id: 'p2',
    url: img2,
  },
  {
    id: 'p3',
    url: img3,
  },
  {
    id: 'p4',
    url: img4,
  },
];

function ImgSlider({ currentIndex, setCurrentIndex }) {

  const next = () => {
    setCurrentIndex((currentIndex + 1) % photos.length);
  };

  const prev = () => {
    setCurrentIndex((currentIndex - 1 + photos.length) % photos.length);
  };

  return (
    <>
      <div className='slider-container'>
        {photos.map((photo) => (
          <div
            key={photo.id}

            className={
              photos[currentIndex].id === photo.id ? 'fade' : 'slide fade'
            }
          >
            <img className='photo' src={photo.url} alt={photo.id} />
          </div>
        ))}

        <button onClick={prev} className='prev'>
          &lt;
        </button>

        <button onClick={next} className='next'>
          &gt;
        </button>

        <div className='dots'>
          {photos.map((photo) => (
            <span
              key={photo.id}

              className={
                photos[currentIndex].id === photo.id ? 'dot active' : 'dot'
              }

              onClick={() => setCurrentIndex(photos.indexOf(photo))}
            ></span>
          ))}

        </div>

      </div>
    </>
  );
}

export default ImgSlider;