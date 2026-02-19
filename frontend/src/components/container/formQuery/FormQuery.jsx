import { useContext, useState } from "react";
import "./form.css";
import ApiQuery from "../apiquery/ApiQuery";
import Results from "../../pure/results/Results";
import Presentation from "../../pure/presentation/Presentation";
import NoResults from "../../pure/noResults/NoResults";
import Logout from "../../pure/logout/Logout";
import { UserContext } from "../../useContext/UserContext";
import { CounterContext } from "../../useContext/CounterContext";

function FormQuery() {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [query, setQuery] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [inputValues, setInputValues] = useState(null);

  const { user } = useContext(UserContext);
  const { setStartIn } = useContext(CounterContext);

  const existUser = Object.values(user).some((value) => value.trim() !== "");

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonClicked(true);
    setStartIn(0);

    if (author.trim() === "" && title.trim() === "" && query.trim() === "") {
      setInputValues(null);
      return;
    }

    setInputValues({ author, title, query });
  };

  const renderBooksError = (error) => {
    const code = error?.code;

    let message = "Ha ocurrido un error al buscar libros. Inténtalo de nuevo.";

    if (code === 429) {
      message =
        "Ahora mismo se ha alcanzado el límite de búsquedas. Inténtalo de nuevo más tarde.";
    } else if (code === 403) {
      message =
        "No se puede acceder al servicio en este momento (permisos o configuración).";
    }

    return <div className="errorBox">{message}</div>;
  };

  return (
    <div className="mainFormContent">
      <div className="left-background"></div>
      <div className="right-background"></div>

      <div className="formContent">
        <form onSubmit={handleSubmit} className="form">
          <label>Autor/a:</label>
          <input
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            type="text"
            name="author"
            placeholder="Günter Grass"
          />

          <label>Título:</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            name="title"
            placeholder="El tambor de hojalata"
          />

          <label>Buscar por coincidencia:</label>
          <input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            type="text"
            name="query"
            placeholder="Historia de España"
          />

          <button type="submit" className="button">
            Buscar
          </button>
        </form>

        {/* Panel de resultados (zona "blanca") */}
        <div className="resultsArea">
          {buttonClicked ? (
            <ApiQuery inputValues={inputValues}>
              {(booksData, noData, error) => {
                if (error) return renderBooksError(error);
                if (noData || inputValues === null) return <NoResults />;
                return <Results booksData={booksData} />;
              }}
            </ApiQuery>
          ) : existUser ? (
            <Logout />
          ) : (
            <Presentation />
          )}
        </div>
      </div>
    </div>
  );
}

export default FormQuery;
