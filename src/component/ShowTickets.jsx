import { useEffect, useState } from "react";

const ShowTickets = () => {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    const storedTickets = localStorage.getItem("userTickets");
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    }
  }, []);
  return (
    <div className="flex flex-wrap gap-4 m-4">
      {tickets.length > 0 ? (
        tickets.map((ticket, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg w-80">
            <h1 className="text-teal-600">Ticket#{`${index + 1}`}</h1>
            <article className="text-white">
              <div>
                <strong>Show Name: </strong> {ticket.showName}
              </div>
              <div>
                <strong>Name: </strong> {ticket.name}
              </div>
              <div>
                <strong>Email: </strong> {ticket.email}
              </div>
              <div>
                <strong>Number of Person: </strong> {ticket.person}
              </div>
            </article>
          </div>
        ))
      ) : (
        <div className="min-h-lvh flex items-center justify-center text-3xl text-white font-semibold">
          No tickets Found
        </div>
      )}
    </div>
  );
};

export default ShowTickets;
