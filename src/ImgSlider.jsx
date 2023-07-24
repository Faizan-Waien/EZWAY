import { useState } from 'react';
import './imgSlider.css';

const photos = [
  {
    id: 'p1',
    url: '/src/assets/1.jpg',
  },
  {
    id: 'p2',
    url: '/src/assets/2.jpg',
  },
  {
    id: 'p3',
    url: '/src/assets/3.jpg',
  },
  {
    id: 'p4',
    url: '/src/assets/4.jpg',
  },
];

function ImgSlider({ currentIndex, setCurrentIndex }) {
  // show the photo with this index
  //   const [currentIndex, setCurrentIndex] = useState(0);

  // move to the next photo
  // if we are at the end, go to the first photo
  const next = () => {
    setCurrentIndex((currentIndex + 1) % photos.length);
  };

  // move to the previous photo
  // if we are at the beginning, go to the last photo
  const prev = () => {
    setCurrentIndex((currentIndex - 1 + photos.length) % photos.length);
  };

  return (
    <>
      {/* Render the carousel */}
      <div className='slider-container'>
        {photos.map((photo) => (
          <div
            key={photo.id}

            // if the photo is the current photo, show it
            className={
              photos[currentIndex].id === photo.id ? 'fade' : 'slide fade'
            }
          >
            <img className='photo' src={photo.url} alt={photo.id} />
          </div>
        ))}

        {/* Previous button */}
        <button onClick={prev} className='prev'>
          &lt;
        </button>

        {/* Next button */}
        <button onClick={next} className='next'>
          &gt;
        </button>

        {/* Render dots indicator */}
        <div className='dots'>
          {photos.map((photo) => (
            <span
              key={photo.id}
              // highlight the dot that corresponds to the current photo
              className={
                photos[currentIndex].id === photo.id ? 'dot active' : 'dot'
              }
              // when the user clicks on a dot, go to the corresponding photo
              onClick={() => setCurrentIndex(photos.indexOf(photo))}
            ></span>
          ))}

        </div>

      </div>
    </>
  );
}

export default ImgSlider;