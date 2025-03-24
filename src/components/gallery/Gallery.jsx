import React, { useEffect, useRef, useState } from 'react';

const artworks = [
  {
    id: 1,
    image: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/damayanti-raja-ravi-varma.jpg",
    artist: "Raja Ravi Varma",
    description: "An oleograph depicting Damayanti, a character from the Mahabharata, shown in a moment of longing and reflection."
  },
  {
    id: 2,
    image: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/hamsa-and-damayanti-ravi-varma.jpg",
    artist: "Raja Ravi Varma",
    description: "This painting illustrates the tale of Damayanti and the royal swan (Hamsa) from the Mahabharata, symbolizing communication and love."
  },
  {
    id: 3,
    image: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/damayanti-talking-to-the-celestial-swan-about-nala-raja-ravi-varma.jpg",
    artist: "Raja Ravi Varma",
    description: "Depicts Damayanti conversing with the celestial swan about Nala, capturing a pivotal moment from the Mahabharata."
  },
  {
    id: 4,
    image: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/1-hamsa-damayanti-raja-ravi-varma.jpg",
    artist: "Raja Ravi Varma",
    description: "A renowned painting showcasing Damayanti listening to the swan's message about Nala's love."
  },
  {
    id: 5,
    image: "https://www.artisera.com/cdn/shop/products/P-288.01_1024x1024.jpg?v=1632390209",
    artist: "Raja Ravi Varma",
    description: "A canvas print of 'Hamsa Damayanti' depicting the intricate details and vibrant colors of the original masterpiece."
  }
];

export default function Carousel() {
  const listRef = useRef(null);
  const loaderRef = useRef(null);
  const autoPlayRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [isSliding, setIsSliding] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      loaderRef.current.classList.add('hidden');
    }, 1000);

    startAutoPlay();

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      stopAutoPlay();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const startAutoPlay = () => {
    autoPlayRef.current = setInterval(() => {
      handleNext();
    }, 5000);
  };

  const stopAutoPlay = () => {
    clearInterval(autoPlayRef.current);
  };

  const updateActiveStatus = () => {
    const items = listRef.current.children;
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('active');
      items[i].style.animation = 'none';
      items[i].style.transform = 'scale(0.9)';
    }
    items[0].classList.add('active');
    items[0].style.animation = 'pulse 2s infinite';
    items[0].style.transform = 'scale(1.2)';

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  };

  const handleNext = () => {
    if (isSliding) return;
    setIsSliding(true);
    const listEl = listRef.current;
    listEl.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
    listEl.style.transform = 'translateX(-320px)';
    setTimeout(() => {
      listEl.style.transition = 'none';
      listEl.style.transform = 'translateX(0)';
      listEl.appendChild(listEl.firstElementChild);
      setCurrentIndex((prev) => (prev + 1) % artworks.length);
      updateActiveStatus();
      setTimeout(() => setIsSliding(false), 50);
    }, 800);
  };

  const handlePrev = () => {
    if (isSliding) return;
    setIsSliding(true);
    const listEl = listRef.current;
    listEl.style.transition = 'none';
    listEl.insertBefore(listEl.lastElementChild, listEl.firstElementChild);
    listEl.style.transform = 'translateX(-320px)';
    setTimeout(() => {
      listEl.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
      listEl.style.transform = 'translateX(0)';
      setCurrentIndex((prev) => (prev - 1 + artworks.length) % artworks.length);
      updateActiveStatus();
      setTimeout(() => setIsSliding(false), 800);
    }, 50);
  };

  const handleDotClick = (index) => {
    if (isSliding || index === currentIndex) return;
    if (index > currentIndex) {
      for (let i = currentIndex; i < index; i++) {
        setTimeout(() => handleNext(), 300 * (i - currentIndex));
      }
    } else {
      for (let i = currentIndex; i > index; i--) {
        setTimeout(() => handlePrev(), 300 * (currentIndex - i));
      }
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchEndX.current < touchStartX.current - 50) {
      handleNext();
    } else if (touchEndX.current > touchStartX.current + 50) {
      handlePrev();
    }
  };

  return (
    <div className="carousel-wrapper">
      <div ref={loaderRef} className="loader"></div>
      <div
        className="carousel"
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="carousel-inner">
          <div ref={listRef} className="list">
            {artworks.map((art, index) => (
              <div key={art.id} className={`item ${index === 0 ? 'active' : ''}`}>
                <img src={art.image} alt={`Artwork ${art.id}`} />
                <div className="info">
                  <h3>Artist: {art.artist}</h3>
                  <p>{art.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="controls">
        <button id="prev" onClick={handlePrev}>←</button>
        <button id="next" onClick={handleNext}>→</button>
      </div>
      <div className="dots">
        {artworks.map((_, idx) => (
          <div
            key={idx}
            className={`dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(idx)}
          ></div>
        ))}
      </div>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: white;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
transition: opacity 0.5s, visibility 0.5s;
        }
        .loader.hidden {
          opacity: 0;
          visibility: hidden;
        }
        .loader:after {
          content: '';
          width: 50px;
          height: 50px;
          border: 5px solid #f3f3f3;
          border-top: 5px solid black;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        .carousel-wrapper {
          height: 100vh;
          background: #f5f5f5;
          font-family: Arial, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
          position: relative;
        }
        .carousel {
          width: 80%;
          margin: 0 auto;
        }
        .carousel-inner {
          overflow: hidden;
          padding: 40px 0;
        }
        .list {
          display: flex;
          transition: transform 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55);
          align-items: center;
        }
        .item {
          min-width: 300px;
          margin: 10px;
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
          transition: all 0.5s ease-in-out;
          transform: scale(0.9);
          opacity: 0.8;
        }
        .item.active {
          transform: scale(1.2);
          opacity: 1;
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
          z-index: 10;
        }
        .item img {
          width: 100%;
          display: block;
          border-radius: 16px;
          transition: transform 0.7s;
        }
        .item:hover img {
          transform: scale(1.05);
        }
        .info {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 20px;
          transform: translateY(100%);
          transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border-bottom-left-radius: 16px;
          border-bottom-right-radius: 16px;
        }
        .item:hover .info {
          transform: translateY(0);
        }
        .controls {
          width: 80%;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          position: relative;
          z-index: 20;
          margin-top: -50px;
        }
        button {
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border: none;
          padding: 15px 25px;
          cursor: pointer;
          border-radius: 50px;
          font-size: 18px;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        button:hover {
          background: black;
          transform: scale(1.1);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .dots {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }
        .dot {
          width: 12px;
          height: 12px;
          background: rgba(0,0,0,0.3);
          border-radius: 50%;
          margin: 0 5px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .dot.active {
          background: black;
          transform: scale(1.3);
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        h3 {
          margin-top: 0;
          animation: fadeIn 0.5s forwards;
        }
        p {
          animation: fadeIn 0.5s 0.2s both;
        }
      `}</style>
    </div>
  );
}