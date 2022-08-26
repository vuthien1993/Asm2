import React from "react";
import useHttpId from "../../hook/use-httpid";
import "./MovieDetail.css";
import YouTube from "react-youtube";
import "bootstrap/dist/css/bootstrap.css";

function MovieDetail(props) {
  //khai bao dinh nghia thuoc tinh opts ht video youtube
  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };
  //su dung custom hook call api
  const { data } = useHttpId({
    url: `https://api.themoviedb.org/3/movie/${props.dataMoviesDetail.id}/videos?api_key=522dfba9d04a6622db8e00a4a63e9dfb&language=en-US`,
  });
  // loc phan tu phu hop trong mang
  const dataFilter = data.results.filter(
    (ele) =>
      ele.site === "YouTube" &&
      (ele.type === "Trailer" || ele.type === "Teaser")
  );
  const item = dataFilter[0];
  console.log(data);
  return (
    <div className="container-fluid">
      {props.dataMoviesDetail.display && (
        <div className="borderDetail row">
          <div className="col-md-6">
            {data.results.length !== 0 ? (
              <h3>{data.results[0].name}</h3>
            ) : (
              <h3>{props.dataMoviesDetail.name}</h3>
            )}
            {data.results.length === 1 ? <p></p> : <hr />}
            {data.results.length === 1 ? (
              <p></p>
            ) : (
              <p className="indam">
                Release_date: {props.dataMoviesDetail.date}
              </p>
            )}

            {data.results.length === 1 ? (
              <p></p>
            ) : (
              <p className="indam">
                Vote: {props.dataMoviesDetail.vote_average}/10
              </p>
            )}
            <p className="textAlign">{props.dataMoviesDetail.overview}</p>
          </div>
          <div className="col-md-6">
            {dataFilter.length === 0 ? (
              <div>
                <img
                  style={{ height: "auto" }}
                  src={`https://image.tmdb.org/t/p/w500/${props.dataMoviesDetail.backdrop_path}`}
                  alt="No Img"
                />
              </div>
            ) : (
              <div key={item.id}>
                <YouTube videoId={item.key} opts={opts} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetail;
