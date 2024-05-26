import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useSwipeable } from "react-swipeable";

//icons
import { TbMickeyFilled } from "react-icons/tb";
import { HiMiniFire } from "react-icons/hi2";
import { FaBookOpen } from "react-icons/fa6";
import { BsRobot } from "react-icons/bs";
import { FaGun } from "react-icons/fa6";
import { FaGhost } from "react-icons/fa";
import { PiMaskHappy } from "react-icons/pi";
import { GiMagicBroom } from "react-icons/gi";

const baseUrl = import.meta.env.VITE_BASEURL;

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const movieWrapperRef = useRef(null);
  const movieSectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/movies`);
        setMovies(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchMovies();

    const handleMouseMove = (event) => {
      const clientX = event.clientX;
      const clientY = event.clientY;
      const innerWidth = window.innerWidth;

      if (movieSectionRef.current) {
        const rect = movieSectionRef.current.getBoundingClientRect();
        const inMovieSection = clientY >= rect.top && clientY <= rect.bottom;

        if (inMovieSection) {
          if (clientX > innerWidth - 100) {
            if (movieWrapperRef.current) {
              gsap.to(movieWrapperRef.current, 
                { scrollLeft: movieWrapperRef.current.scrollLeft + 50, 
                  duration: 0.5
                }
              )
            }
          } else if (clientX < 100) {
            if (movieWrapperRef.current) {
              gsap.to(movieWrapperRef.current, 
                { scrollLeft: movieWrapperRef.current.scrollLeft - 50, 
                  duration: 0.5 
                }
              );
            }
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };

  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (movieWrapperRef.current) {
        movieWrapperRef.current.scrollLeft += 200; 
      }
    },
    onSwipedRight: () => {
      if (movieWrapperRef.current) {
        movieWrapperRef.current.scrollLeft -= 200;
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <div className="home page">

      <div className="hero-section">
        <div className="hero-box hero1">
          <h2>Let the geeks guide<br/> you to your next<br/> binge-worthy show</h2>
          <img src="/hero1.png" alt="hero1"/>
        </div>
        <div className="hero-box hero2">
          <h2>Share your reviews with<br/> millions of fellow<br/> binge-watchers!</h2>
          <img src="/hero2.png" alt="hero2"/>
          <button className="joinTheGeeks-btn">Join the Geeks</button>
        </div>
      </div>

      <div className="category-section">
        <div className="category-wrapper">
          <ul>
            <li><HiMiniFire /><p>Trending</p></li>
            <li><FaBookOpen /><p>Drama</p></li>
            <li><BsRobot /><p>S.Fiction</p></li>
            <li><FaGun /><p>Crime</p></li>
            <li><FaGhost /><p>Horror</p></li>
            <li><PiMaskHappy /><p>Comedy</p></li>
            <li><GiMagicBroom /><p>Fantasy</p></li>
            <li><TbMickeyFilled /><p>Animation</p></li>
          </ul>
        </div>
      </div>
      
      <div className="movie-container" {...handlers}>
        <div className="movie-section" ref={movieSectionRef}>
          <div className="movie-wrapper" ref={movieWrapperRef}>
              {movies.map((movie, index) => (
                <div className="movie-box" key={movie.id}>
                  <img 
                    src={movie.image_url} 
                    alt={movie.title} 
                    onClick={() => navigate(`/${movie.id}`)}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
