import { useState, useEffect } from "react";

const useHttp = (requestConfig) => {
  //khai báo và gán giá trị ban đầu cho các state
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [data, setData] = useState({
    page: "",
    results: [
      {
        id: "",
        backdrop_path: "",
        name: "",
        overview: "",
        first_air_date: "",
        poster_path: "",
        vote_average: "",
        release_date: "",
      },
    ],
  });

  useEffect(() => {
    //khai bao ham dung async
    const sendRequest = async () => {
      //gui lenh lay data tu api
      const reponse = await fetch(requestConfig.url);

      //nen loi khi xu ly ko thanh cong
      if (!reponse.ok) {
        throw new Error("no data");
      }
      const data = await reponse.json();
      setData(data);
      setIsLoading(false);

      //set lai data vao state
    };
    //bao loi
    sendRequest().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [requestConfig.url]);
  //trả về obj chứa các giá trị cần dùng
  return {
    isLoading,
    httpError,
    data,
  };
};
export default useHttp;
