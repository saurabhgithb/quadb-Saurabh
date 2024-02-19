import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

const TicketForm = () => {
  const [show, setShow] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [person, setPerson] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [tickets, setTickets] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function getShow() {
      try {
        const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        if (response.status == 404) {
          setNotFound(true);
        }
        setShow(response.data);
        setNotFound(false);
      } catch (error) {
        setNotFound(true);
        console.log(error);
      }
    }
    getShow();
  }, [id]);

  useEffect(() => {
    const storedTickets = localStorage.getItem("userTickets");
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    }
  }, []);

  function handleBook(e) {
    e.preventDefault();

    setSuccess("");

    if (name == "" || email == "") {
      setError("All fields are mandatory!");
      return;
    }

    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email.match(validRegex)) {
      setError("Invalid Email Address!");
      return;
    }

    if (person <= 0) {
      setError("number of person cannot be zero or negative!");
      return;
    }

    setTickets([
      ...tickets,
      { name, email, person, showName: show.name, showId: show.id },
    ]);
    localStorage.setItem(
      "userTickets",
      JSON.stringify([
        ...tickets,
        { name, email, person, showName: show.name, showId: show.id },
      ])
    );
    setSuccess("Ticket Booked Successfully ✨");
    setName("");
    setEmail("");
    setPerson(0);
    setError("");
  }

  if (notFound) {
    return <NotFound />;
  }

  return (
    <>
      {show && (
        <section className="mt-10 flex flex-col md:flex-row justify-between max-w-6xl w-[90%] mx-auto gap-10">
          <div className="bg-gray-700 p-4 rounded-lg flex-1">
            <h1 className="text-3xl text-teal-600">Show Info</h1>
            <article className="text-white mt-4">
              {show && (
                <>
                  <div>
                    <strong>Show Name: </strong> {show.name}
                  </div>
                  <div>
                    <strong>Show Type: </strong> {show.type}
                  </div>
                  <div>
                    <strong>Language: </strong> {show.language}
                  </div>
                  <div>
                    <strong>Genres: </strong>{" "}
                    {show.genres.map((genre) => `${genre} `)}
                  </div>
                  <div>
                    <strong>Schedule: </strong> {show.schedule.days[0]} at{" "}
                    {show.schedule.time} ({show.runtime} mins)
                  </div>
                </>
              )}
            </article>
          </div>
          <form className="text-white flex-1">
            <h1 className="text-3xl font-semibold text-center md:text-left">
              Enter your details
            </h1>
            <section className="mt-6">
              <label className="inline-block w-28 text-right" htmlFor="name">
                Show Name:
              </label>
              <input
                className="rounded-md px-1 ml-4 text-black"
                type="text"
                placeholder="Enter your name"
                value={show.name}
                readOnly
              />
            </section>
            <section className="mt-6">
              <label
                className="inline-block w-28 text-right outline-none border-transparent focus:border-transparent active:outline-none focus:outline-none focus:ring-0 focus:border-none"
                htmlFor="name"
              >
                Name:
              </label>
              <input
                className="rounded-md px-1 ml-4 text-black"
                type="text"
                placeholder="Enter your name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              />
            </section>
            <section className="mt-4">
              <label className="inline-block w-28 text-right" htmlFor="email">
                Email:
              </label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="rounded-md px-1 ml-4 text-black"
                type="email"
                placeholder="Enter your email."
              />
            </section>
            <section className="mt-4">
              <label className="inline-block w-28 text-right" htmlFor="person">
                No. of person:
              </label>
              <input
                value={person}
                onChange={(e) => {
                  setPerson(e.target.value);
                }}
                className="text-black ml-4 px-1 rounded-md"
                type="number"
              />
            </section>
            <section className="mt-4">
              <button
                onClick={handleBook}
                className="ml-32 flex w-fit items-center text-teal-600 bg-none border border-teal-600 focus:outline-none hover:bg-teal-600 hover:text-white focus:ring-4 focus:ring-teal-100 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Book Now
              </button>
            </section>
            <section className="mt-4 text-right">
              {error && <div className="text-red-700 text-sm">{error}</div>}
              {success && (
                <div className="text-green-700 font-semibold">{success}</div>
              )}
            </section>
          </form>
        </section>
      )}
    </>
  );
};

export default TicketForm;
