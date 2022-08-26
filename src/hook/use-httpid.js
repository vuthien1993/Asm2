import { useState, useEffect } from "react";

const useHttpId = (requestConfig) => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [data, setData] = useState({
    results: [
      {
        iso_639_1: "",
        iso_3166_1: "",
        name: "",
        key: "",
        site: "",
        size: "",
        type: "",
        official: false,
        published_at: "",
        id: "",
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
        throw new Error("Error");
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
  return {
    isLoading,
    httpError,
    data,
  };
};
export default useHttpId;
