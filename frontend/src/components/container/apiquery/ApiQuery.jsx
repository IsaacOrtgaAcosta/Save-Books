import { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { CounterContext } from "../../useContext/CounterContext";

function ApiQuery({ inputValues, children }) {
  const [booksData, setBooksData] = useState([]);
  const [noData, setNoData] = useState(false);
  const [error, setError] = useState(null);
  const { startIn } = useContext(CounterContext);

  useEffect(() => {
    if (!inputValues) return;

    const author = inputValues.author?.trim() ?? "";
    const title = inputValues.title?.trim() ?? "";
    const query = inputValues.query?.trim() ?? "";

    if (!author && !title && !query) return;

    const controller = new AbortController();

    const getData = async () => {
      setError(null);

      const tokens = [];
      if (author) tokens.push(`inauthor:${author}`);
      if (title) tokens.push(`intitle:${title}`);
      if (query) tokens.push(query);

      const q = tokens.map(encodeURIComponent).join("+");
      const API_KEY = (import.meta.env.VITE_GOOGLE_BOOKS_KEY || "").trim();

console.log("API KEY loaded?", !!import.meta.env.VITE_GOOGLE_BOOKS_KEY);

      const baseUrl = "https://www.googleapis.com/books/v1/volumes";
      const params = new URLSearchParams({
        q, // ya es string
        maxResults: "10",
        startIndex: String(Number(startIn) || 0),
      });

      if (API_KEY) params.set("key", API_KEY);

      const url = `${baseUrl}?${params.toString()}`;

      try {
        const response = await fetch(url, { signal: controller.signal });
        const result = await response.json();

        if (!response.ok) {
          setBooksData([]);
          setNoData(false);
          setError(
            result?.error ?? {
              code: response.status,
              message: "Request failed",
            },
          );
          return;
        }

        const items = Array.isArray(result?.items) ? result.items : [];
        if (items.length === 0) {
          setBooksData([]);
          setNoData(true);
          return;
        }

        setNoData(false);
        setBooksData(items.map((el) => ({ ...el.volumeInfo })));
      } catch (err) {
        if (err.name === "AbortError") return;
        setBooksData([]);
        setNoData(false);
        setError({ message: err.message });
      }
    };

    getData();
    return () => controller.abort();
  }, [inputValues, startIn]);

  return children(booksData, noData, error);
}

ApiQuery.propTypes = {
  inputValues: PropTypes.shape({
    author: PropTypes.string,
    title: PropTypes.string,
    query: PropTypes.string,
  }),
};

export default ApiQuery;
