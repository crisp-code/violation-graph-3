import { useState, useEffect } from "react";

const ERROR_MESSAGES = {
  FETCH: '데이터를 불러오는데 실패했습니다',
  NOT_FOUND: 'CCTV 정보를 찾을 수 없습니다',
  SERVER: '서버 오류가 발생했습니다',
  INVALID_JSON: 'JSON 형식이 올바르지 않습니다'
};

function GetCCTVData({ cctvName }) {
  const [cctvData, setCctvData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCCTVData = async () => {
      if (!cctvName) return;
      
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:8080/api/data/${cctvName}`);
        
        if (!response.ok) {
          throw new Error(ERROR_MESSAGES.SERVER);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error(ERROR_MESSAGES.INVALID_JSON);
        }

        const data = await response.json();
        
        if (!data) {
          throw new Error(ERROR_MESSAGES.NOT_FOUND);
        }

        setCctvData(data);
      } catch (err) {
        setError(err.message || ERROR_MESSAGES.FETCH);
      } finally {
        setLoading(false);
      }
    };

    fetchCCTVData();
  }, [cctvName]);

  return { cctvData, loading, error };
}

export default GetCCTVData;
