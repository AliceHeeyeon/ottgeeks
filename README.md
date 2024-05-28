# ![mockup1](./frontend/public/favicon.png) OTTGEEKS
>
> Project Description

A platform for sharing reviews of content series available on OTT services like Netflix, Disney+, and Coupang Play.

> Key Features

- Movies, reviews, and user data are managed via MySQL and stored within an AWS EC2 instance.
- Sign up, login, and user authentication for creating a review.
- Display reviews on the individual movie pages using the movie ID.
- Movie posters move when the cursor is close to the edge of the screen.

> Code Snippet

Retrieve all movies and fetch details of a specific movie from the database.
```javascript
export async function getMovies(req, res) {
    try {
        const [rows] = await pool.query("SELECT * FROM Movies");
        res.json(rows);
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function getMovie(req, res) {
    const { id } = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM Movies WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
```

Retrieve and display movie, review, and user data on an individual movie page in the frontend.

```javascript
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
            setTimeout(() => { setLoading(false) }, 500);
        }))
        .catch((err) => {
            console.log(err);
            setLoading(false)
        })
    },[id])
```

> Project Mockups

![mockup1](./frontend/public/mockup1.png)
![mockup2](./frontend/public/mockup2.png)
![mockup3](./frontend/public/mockup-desktop.png)



