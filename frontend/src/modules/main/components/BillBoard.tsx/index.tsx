// {
//     "adult": false,
//     "backdrop_path": "/rkB4LyZHo1NHXFEDHl9vSD9r1lI.jpg",
//     "genre_ids": [
//       16,
//       10765,
//       10759
//     ],
//     "id": 94605,
//     "origin_country": [
//       "US"
//     ],
//     "original_language": "en",
//     "original_name": "Arcane",
//     "overview": "Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and clashing convictions.",
//     "popularity": 121.687,
//     "poster_path": "/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",
//     "first_air_date": "2021-11-06",
//     "name": "Arcane",
//     "vote_average": 8.748,
//     "vote_count": 3937
//   }

import styles from "./index.module.scss"
function BillBoard() {
    return (
        <div>
            <iframe 
            className={styles.video}
            src="https://www.youtube-nocookie.com/embed/bXocSEhAQ2M?autoplay=1&mute=1"
            frameBorder='no'
            allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            >
            </iframe>
        </div>
    )
}

export default BillBoard