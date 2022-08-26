import React from "react";
import useHttpId from "../../hook/use-httpid";
import YouTube from "react-youtube";
import "bootstrap/dist/css/bootstrap.css";
function DetailSearch(props) {
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
    url: `https://api.themoviedb.org/3/movie/${props.dataDetailSearch.id}/videos?api_key=522dfba9d04a6622db8e00a4a63e9dfb&language=en-US`,
  });
  // loc phan tu phu hop trong mang
  const dataFilter = data.results.filter(
    (ele) =>
      ele.site === "YouTube" &&
      (ele.type === "Trailer" || ele.type === "Teaser")
  );
  const item = dataFilter[0];
  console.log(dataFilter);
  console.log(data);
  return (
    <div>
      <div className="container-fluid">
        {props.dataDetailSearch.display && (
          <div className="borderDetail row">
            <div className="col-md-6">
              {data.results.length !== 0 ? (
                <h3>{data.results[0].name}</h3>
              ) : (
                <h3>{props.dataDetailSearch.name}</h3>
              )}
              {data.results.length === 0 ? <p></p> : <hr />}
              {data.results.length === 1 ? (
                <p></p>
              ) : (
                <p className="indam">
                  Release_date: {props.dataDetailSearch.date}
                </p>
              )}

              {data.results.length === 1 ? (
                <p></p>
              ) : (
                <p className="indam">
                  Vote: {props.dataDetailSearch.vote_average}/10
                </p>
              )}
              <p className="textAlign">{props.dataDetailSearch.overview}</p>
            </div>
            <div className="col-md-6">
              {dataFilter.length === 0 ? (
                <div>
                  <img
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                    src={`https://image.tmdb.org/t/p/w500/${props.dataDetailSearch.backdrop_path}`}
                    alt="No IMG"
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
    </div>
  );
}

export default DetailSearch;
