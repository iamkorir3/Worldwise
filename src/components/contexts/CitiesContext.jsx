import { createContext } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  console.log(CitiesContext);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchcities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("error loading");
      } finally {
        setIsLoading(false);
      }
    }

    fetchcities();
  }, []);
}

// export { CitiesProvider };
export { CitiesProvider };
