import { Link } from "react-router-dom";
import PageNavigation from "../components/PageNavigation";
import AppLayout from "./AppLayout";

function Homepage() {
  return (
    <div>
      <PageNavigation />
      <h1>WorldWise</h1>
      <Link to="app" element={<AppLayout />}>
        Go to App
      </Link>
    </div>
  );
}

export default Homepage;
