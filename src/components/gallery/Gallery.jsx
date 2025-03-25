import React, { useEffect } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const artworks = [
  {
    id: 1,
    image: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/damayanti-raja-ravi-varma.jpg",
    title: "Damayanti",
    artist: "Raja Ravi Varma",
    description: "An oleograph depicting Damayanti, a character from the Mahabharata, shown in a moment of deep emotion and contemplation."
  },
  {
    id: 2,
    image: "/images/gallery/7eeebd9cff4c8dc78b7601e2c069a4c3.jpg",
    title: "Lady With an Ermine",
    artist: "Leonardo da Vinci",
    description: "The famous lady holding a ferret painting Lady With an Ermine (1489-1491) by Leonardo da Vinci is one of his female portraits depicting beauty as well as mystery. This is the painting that we will be discussing in this article"
  },
  {
    id: 3,
    image: "/images/gallery/38732ecfcb84b6e29784b65dfaa4bd43 (1).jpg",
    title: "Starry Night",
    artist: "Van Gogh",
    description: "The Starry Night is one of Vincent van Gogh's most iconic and celebrated paintings, completed in 1889. It depicts a swirling night sky filled with bright stars and a glowing moon over a quiet village. The scene is believed to be inspired by the view from his room at the Saint-Paul-de-Mausole asylum in Saint-Rémy-de-Provence, France, where he stayed while struggling with mental health."
  },
  {
    id: 4,
    image: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/1-hamsa-damayanti-raja-ravi-varma.jpg",
    title: "Hamsa Damayanti Conversation",
    artist: "Raja Ravi Varma",
    description: "An intricate painting capturing Damayanti listening to the swan's message about Nala's love, showcasing delicate emotional nuances."
  },
  {
    id: 5,
    image: "/images/gallery/i8.jpg",
    title: "Mother and Child",
    artist: "Jamini Roy",
    description: "A canvas print celebrating the timeless tale of Hamsa and Damayanti, preserving the intricate details and vibrant colors of the original masterpiece."
  }
];

const Gallery = () => {
  useEffect(() => {
    const swiper = new Swiper(".swiper-container", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 20,
        stretch: 0,
        depth: 350,
        modifier: 1,
        slideShadows: true
      },
      pagination: {
        el: ".swiper-pagination"
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      }
    });

    return () => {
      swiper.destroy();
    };
  }, []);

  return (
    <div className="gallery-container">
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {artworks.map((artwork) => (
            <div key={artwork.id} className="swiper-slide">
              <div className="picture">
                <img src={artwork.image} alt={artwork.title} />
              </div>
              <div className="detail">
                <h3>{artwork.title}</h3>
                <span>{artwork.artist}</span>
              </div>
              <div className="hover-description">
                <h3>{artwork.title}</h3>
                <span>{artwork.artist}</span>
                <p>{artwork.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="swiper-pagination"></div>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>
      <style jsx>{`
        .gallery-container {
          width: 100%;
          padding: 50px 0;
        }
        .swiper-container {
          width: 100%;
          padding-top: 50px;
          padding-bottom: 50px;
          position: relative;
        }
        .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 320px;
          background-color: rgba(255,255,255,0.1);
          overflow: hidden;
          border-radius: 8px;
          position: relative;
          transition: all 0.3s ease;
        }
        .picture {
          width: 320px;
          height: 320px;
          overflow: hidden;
          position: relative;
        }
        .picture img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .detail {
          padding: 25px 20px;
          font-weight: 600;
          text-align: center;
          background: transparent;
        }
        .detail h3 {
          margin: 0;
          font-size: 20px;
          color: #000000;
        }
        .detail span {
          display: block;
          font-size: 16px;
          color: #f44336;
        }
        .swiper-slide .hover-description {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.8);
          color: #f0f0f0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          padding: 15px;
          box-sizing: border-box;
          text-align: center;
        }
        .swiper-slide:hover .hover-description {
          opacity: 1;
        }
        .swiper-slide:hover .picture img {
          transform: scale(1.1);
        }
        .swiper-pagination-bullet-active {
          background: #f44336 !important;
        }
        .swiper-button-next, 
        .swiper-button-prev {
          color: #f44336 !important;
          width: 44px;
          height: 44px;
          background: rgba(255,255,255,0.1);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .swiper-button-next:hover, 
        .swiper-button-prev:hover {
          background: rgba(255,255,255,0.2);
        }
      `}</style>
    </div>
  );
};

export default Gallery;