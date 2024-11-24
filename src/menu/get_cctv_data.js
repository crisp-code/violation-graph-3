import { useState, useEffect } from "react";

const ERROR_MESSAGES = {
  FETCH: '데이터를 불러오는데 실패했습니다',
  NOT_FOUND: 'CCTV 정보를 찾을 수 없습니다',
  SERVER: '서버 오류가 발생했습니다'
};

function GetCCTVData({ cctvName }) {
  const [cctvData, setCctvData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cctvName) return;

    const fetchCCTVData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/cctv/${cctvName}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(ERROR_MESSAGES.NOT_FOUND);
          }
          if (response.status >= 500) {
            throw new Error(ERROR_MESSAGES.SERVER);
          }
          throw new Error(ERROR_MESSAGES.FETCH);
        }

        const data = await response.json();
        setCctvData(data);
      } catch (err) {
        setError(err.message);
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCCTVData();
  }, [cctvName]);

  return { cctvData, loading, error };
}

export default GetCCTVData;
