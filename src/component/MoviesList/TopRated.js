import React, { useState } from "react";
import useHttp from "../../hook/use-http";

import MovieDetail from "../MovieDetail/MovieDetail";
import AliceCarousel from "react-alice-carousel";

import "react-alice-carousel/lib/alice-carousel.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "./Original.css";

function TopRated(prpos) {
  //khai báo các state và gán giá trị ban đầu
  const [display, setDisplay] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [overview, setOverview] = useState("");
  const [vote_average, setVote_average] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [backdrop_path, setBackdrop_path] = useState("");
  const { isLoading, httpError, data } = useHttp({
    url: `https://api.themoviedb.org/3${prpos.dataTopRated.fetchTopRated}`,
  });
  if (isLoading) {
    return (
      <section>
        <p className="bannerLoading">Loading .....</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section>
        <p className="bannerError">{httpError}</p>
      </section>
    );
  }

  const dataTopRated = data.results;
  //khai báo biến để truyền qua props
  const dataClick = {
    id: id,
    display: display,
    name: name,
    date: date,
    overview: overview,
    vote_average,
    backdrop_path,
  };

  const clickHandler = (ele) => {
    console.log("test");
    setId(ele.id);

    setName(ele.name);
    setOverview(ele.overview);
    setDate(ele.release_date);
    setVote_average(ele.vote_average);
    setDisplay(true);
    setBackdrop_path(ele.backdrop_path);
    if (currentId === ele.id) {
      setDisplay(false);
    }
    setCurrentId(ele.id);
    console.log(id);
  };
  const handleDragStart = (e) => e.preventDefault();
  const responsive = {
    0: { items: 1 },
    51.2: { items: 2 },
    102.4: { items: 3 },
    153.6: { items: 4 },
    204.8: { items: 5 },
    256: { items: 6 },
    307.2: { items: 7 },
    358.4: { items: 8 },
    409.6: { items: 9 },
    512: { items: 10 },
  };
  const items = dataTopRated.map((ele, i) => {
    return (
      <div className="item" data-value={i + 1}>
        <img
          // bắt sự kiện onclick
          onClick={() => clickHandler(ele)}
          src={`https://image.tmdb.org/t/p/w500/${ele.backdrop_path}`}
          alt="Error Img"
          onDragStart={handleDragStart}
          role="presentation"
        />
      </div>
    );
  });
  return (
    <div className="borderOriginal">
      <p>Xếp hạng cao</p>
      <div className="container-fluid">
        <AliceCarousel
          mouseTracking
          items={items}
          responsive={responsive}
          controlsStrategy="alternate"
          disableDotsControls
        />
        <MovieDetail dataMoviesDetail={dataClick} />
      </div>
    </div>
  );
}

export default TopRated;
