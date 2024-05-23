import { useState, useEffect } from "react";
import axios from 'axios';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import $ from "jquery";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  markers: false
});

const baseUrl = import.meta.env.VITE_BASEURL;

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

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
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const movieWrapper = $(".movie-wrapper");
      const movie = $(".movie");

      const movieBoxWidth = $(".movie-box").outerWidth(true);
      const movieWidth = movieBoxWidth * movies.length;
      movie.css("width", movieWidth);

      const tl = gsap.timeline();
      tl.to(movie, {
        x: `-${movieWidth - movieWrapper.width()}`,
        scrollTrigger: {
          trigger: movieWrapper,
          start: 'top top',
          end: `+=${movieWidth - movieWrapper.width()}`,
          pin: true,
          scrub: 0.5
        }
      });
    }
  }, [movies]);

  return (
    <div className="home page">

      <div className="hero-section">
        <div className="hero1">
          <h2>Let the geeks guide you to your next binge-worthy show</h2>
          <img src="/hero1.png" alt="hero1"/>
        </div>
        <div className="hero2">
          <h2>Share your reviews with millions of fellow binge-watchers!</h2>
          <img src="/hero2.png" alt="hero2"/>
        </div>
      </div>

      <div className="category-section">
        <div className="category-wrapper">
          <ul>
            <li>Trending</li>
            <li>Drama</li>
            <li>S.Fiction</li>
            <li>Crime</li>
            <li>Horror</li>
            <li>Comedy</li>
            <li>Fantasy</li>
            <li>Animation</li>
          </ul>
        </div>
      </div>
      
      <div className="contents">
        <div className="movie-wrapper">
          <div className="movie">
            {movies.map((movie, index) => (
              <div className="movie-box" key={movie.id}>
                <img src={movie.image_url} alt={movie.title} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
