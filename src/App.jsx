import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowList from "./component/ShowList";
import ShowDetails from "./component/ShowDetails";
import TicketForm from "./component/TicketForm";
import ShowTickets from "./component/ShowTickets";
import Appbar from "./component/Appbar";

function App() {
  const [shows, setShows] = useState([]);
  useEffect(() => {
    async function getShows() {
      const data = await axios.get("https://api.tvmaze.com/search/shows?q=all");
      setShows(data.data);
    }
    getShows();
  }, []);
  return (
    <>
      <Router>
        <Appbar />
        <Routes>
          <Route path="/" element={<ShowList shows={shows} />} />
          <Route path="/details/:id" element={<ShowDetails />} />
          <Route path="/ticket/:id" element={<TicketForm />} />
          <Route path="/tickets" element={<ShowTickets />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
