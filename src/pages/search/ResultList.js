import React, { useState } from "react";
import DetailSearch from "./DetailSearch";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./ResultList.css";
import useHttp from "../../hook/use-http";
function ResultList(props) {
  const [display, setDisplay] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [overview, setOverview] = useState("");
  const [vote_average, setVote_average] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [backdrop_path, setBackdrop_path] = useState("");
  const { isLoading, data } = useHttp({
    url: `https://api.themoviedb.org/3/search/movie?api_key=522dfba9d04a6622db8e00a4a63e9dfb&language=en-US&query=${props.query}&page=1&include_adult=false`,
  });
  const dataSearch = data.results;

  if (isLoading) {
    return (
      <section>
        <p className="bannerLoading">Loading .....</p>
      </section>
    );
  }

  //ham bat sk click
  const clickHandler = (ele) => {
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
  };
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
  const items = dataSearch.map((ele, i) => {
    return (
      <div className="item" data-value={i + 1}>
        <img
          // bắt sự kiện onclick
          onClick={() => clickHandler(ele)}
          src={`https://image.tmdb.org/t/p/w500/${ele.poster_path}`}
          alt="Error Img"
          onDragStart={handleDragStart}
          role="presentation"
        />
      </div>
    );
  });
  console.log(data);
  return (
    <div className="borderResults">
      <h4>Search Result</h4>
      <div>
        {dataSearch[0].id === "" ? (
          <div></div>
        ) : (
          <AliceCarousel
            mouseTracking
            items={items}
            responsive={responsive}
            controlsStrategy="alternate"
            disableDotsControls
          />
        )}

        <DetailSearch dataDetailSearch={dataClick} />
      </div>
    </div>
  );
}

export default ResultList;
