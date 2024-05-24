import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios";
import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";

const baseUrl = import.meta.env.VITE_BASEURL;

const SingleMovie = () => {
    const navigate= useNavigate();
    const {id} = useParams();
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState("");
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const fetchMovie = axios.get(`${baseUrl}/movies/${id}`)
        const fetchReview = axios.get(`${baseUrl}/reviews`)
        const fetchUser = axios.get(`${baseUrl}/users`)

        axios.all([fetchMovie, fetchReview, fetchUser])
        .then(axios.spread((...responses) => {
            const movieResponse = responses[0]
            const reviewResponse = responses[1]
            const userResponse = responses[2]
            setMovie(movieResponse.data)

            const filteredReviews = reviewResponse.data.filter(review => review.movie_id === movieResponse.data.id);

            const reviewsWithUserNames = filteredReviews.map(review => {
                const user = userResponse.data.find(user => user.id === review.user_id);
                const reviewWithUserName = {
                    ...review,
                    userName: user ? user.username : "Unknown"
                };
                return reviewWithUserName;
            });
            setReviews(reviewsWithUserNames);
            setLoading(false)
        }))
        .catch((err) => {
            console.log(err);
            setLoading(false)
        })
    },[id])

    if (!movie) {
        return <div>Loading...</div>;  
    }

    const getStars = (rating) => {
        const fullStars = Math.floor(rating); 
        const hasHalfStar = rating - fullStars > 0.3;                                        
        const fullStarsArray = Array(fullStars).fill(null).map((_, index) => <FaStar key={`full-${index}`} />);
        const halfStar = hasHalfStar ? <FaRegStarHalfStroke key="half" /> : null;
        
        return [...fullStarsArray, halfStar].filter(Boolean);
    };

    const avgRating = reviews.length > 0 
        ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
        : "No reviews";


  return (
    <div className="single-page">

      <div className="movie-poster">
        <div className="singleMovie-image">
            <img src={movie.image_url} alt={movie.title} />
        </div>
        <div className="singleMovie-text">
            <h2>{movie.title}</h2>
            <div className="movie-rating">
                <p>Avg Rating</p>
                <div className="rating-stars">
                    {avgRating !== "No reviews" ? getStars(avgRating) : "No reviews"}
                </div>
            </div>
        </div>
      </div>

      <div className="movie-details">
        <div className="genre details">
            <h4 className="detail-title">Genre</h4>
            <p className="detail-contents">{movie.genre}</p>
        </div>
        <div className="director details">
            <h4 className="detail-title">Director</h4>
            <p className="detail-contents">{movie.director}</p>
        </div>
        <div className="synopsis details">
            <h4 className="detail-title">Synopsis</h4>
            <p className="detail-contents">{movie.description}</p>
        </div>
      </div>

      <div className="movie-reviews">
        <h4>Reviews</h4>
        
        {reviews.length > 0 ? (
            reviews.map(review => (
                <div key={review.id}>
                    <p>{review.userName}</p>
                    <p>{getStars(review.rating)}</p>
                    <p>{review.review}</p>
                </div>
            ))
        ) : (
            <p>No reviews for this movie.</p>
        )}
      </div>

    </div>
  )
}

export default SingleMovie