const baseSampleMovies = [
  {
    id: 299534,
    title: 'Avengers: Endgame',
    overview:
      'The remaining heroes assemble for one final mission after the events of Infinity War.',
    release_date: '2019-04-24',
    vote_average: 8.3,
    genre_ids: [28, 12, 878],
    genres: [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 878, name: 'Science Fiction' },
    ],
    poster_path: '/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    backdrop_path: '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
    runtime: 181,
    trailerKey: 'TcMBFSGVi1c',
  },
  {
    id: 550,
    title: 'Fight Club',
    overview:
      'An office worker and a soap maker form an underground club that grows into something dangerous.',
    release_date: '1999-10-15',
    vote_average: 8.4,
    genre_ids: [18],
    genres: [{ id: 18, name: 'Drama' }],
    poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    backdrop_path: '/hZkgoQYus5vegHoetLkCJzb17zJ.jpg',
    runtime: 139,
    trailerKey: 'SUXWAEX2jlg',
  },
  {
    id: 157336,
    title: 'Interstellar',
    overview:
      'A group of explorers travel through a wormhole in search of a future for humanity.',
    release_date: '2014-11-05',
    vote_average: 8.5,
    genre_ids: [12, 18, 878],
    genres: [
      { id: 12, name: 'Adventure' },
      { id: 18, name: 'Drama' },
      { id: 878, name: 'Science Fiction' },
    ],
    poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdrop_path: '/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
    runtime: 169,
    trailerKey: 'zSWdZVtXT7E',
  },
  {
    id: 872585,
    title: 'Oppenheimer',
    overview:
      'The story of J. Robert Oppenheimer and the creation of the atomic bomb.',
    release_date: '2023-07-19',
    vote_average: 8.1,
    genre_ids: [18, 36],
    genres: [
      { id: 18, name: 'Drama' },
      { id: 36, name: 'History' },
    ],
    poster_path: '/ptpr0kGAckfQkJeJIt8st5dglvd.jpg',
    backdrop_path: '/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg',
    runtime: 181,
    trailerKey: 'uYPbbksJxIg',
  },
  {
    id: 502356,
    title: 'The Super Mario Bros. Movie',
    overview:
      'Two plumber brothers are transported to a colorful kingdom and begin a wild adventure.',
    release_date: '2023-04-05',
    vote_average: 7.6,
    genre_ids: [16, 12, 35],
    genres: [
      { id: 16, name: 'Animation' },
      { id: 12, name: 'Adventure' },
      { id: 35, name: 'Comedy' },
    ],
    poster_path: '/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg',
    backdrop_path: '/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg',
    runtime: 92,
    trailerKey: 'TnGl01FkMMo',
  },
  {
    id: 346698,
    title: 'Barbie',
    overview:
      'Barbie leaves Barbieland and discovers unexpected questions in the real world.',
    release_date: '2023-07-19',
    vote_average: 7.0,
    genre_ids: [35, 12],
    genres: [
      { id: 35, name: 'Comedy' },
      { id: 12, name: 'Adventure' },
    ],
    poster_path: '/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
    backdrop_path: '/nHf61UzkfFno5X1ofIhugCPus2R.jpg',
    runtime: 114,
    trailerKey: 'pBk4NYhWNMM',
  },
  {
    id: 569094,
    title: 'Spider-Man: Across the Spider-Verse',
    overview:
      'Miles Morales travels across the multiverse and faces a difficult choice about his own story.',
    release_date: '2023-05-31',
    vote_average: 8.4,
    genre_ids: [16, 28, 12],
    genres: [
      { id: 16, name: 'Animation' },
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
    ],
    poster_path: '/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    backdrop_path: '/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg',
    runtime: 140,
    trailerKey: 'cqGjhVJWtEg',
  },
  {
    id: 603,
    title: 'The Matrix',
    overview:
      'A programmer discovers that reality is a simulated system and begins to awaken.',
    release_date: '1999-03-31',
    vote_average: 8.2,
    genre_ids: [28, 878],
    genres: [
      { id: 28, name: 'Action' },
      { id: 878, name: 'Science Fiction' },
    ],
    poster_path: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    backdrop_path: '/icmmSD4vTTDKOq2vvdulafOGw93.jpg',
    runtime: 136,
    trailerKey: 'vKQi3bBA1y8',
  },
];

export const sampleMovies = Array.from({ length: 13 }, (_, collectionIndex) =>
  baseSampleMovies.map((movie, movieIndex) => {
    const collectionNumber = collectionIndex + 1;
    const adjustedRating = Math.max(
      6.5,
      movie.vote_average - collectionIndex * 0.08 + (movieIndex % 3) * 0.04,
    );

    return {
      ...movie,
      id: Number(`${collectionNumber}${String(movie.id).padStart(6, '0')}`),
      title:
        collectionIndex === 0
          ? movie.title
          : `${movie.title}: Collection ${collectionNumber}`,
      overview:
        collectionIndex === 0
          ? movie.overview
          : `${movie.overview} This is a fallback sample item for demo collection ${collectionNumber}.`,
      vote_average: Number(adjustedRating.toFixed(1)),
    };
  }),
).flat();
