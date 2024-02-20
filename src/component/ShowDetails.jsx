import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import noImage from "/no-image.jpg";

// show details about the selected show
const ShowDetails = () => {
  const [show, setShow] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    async function getShow() {
      try {
        const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        if (response.status == 404) {
          setNotFound(true);
          return;
        }
        setShow(response.data);
        setNotFound(false);
      } catch (error) {
        setNotFound(true);

        // Handle other errors if needed
        console.error("Error fetching show:", error);
      }
    }
    getShow();
  }, [id]);

  if (notFound) {
    return <NotFound />;
  }
  return (
    <>
      {show && (
        <div className="mt-4 md:mt-0 min-h-lvh max-w-6xl bg-slate-900 flex flex-col md:flex-row text-white items-center justify-center mx-auto w-[90%] gap-10 mb-6">
          {show && (
            <>
              <div className=" flex justify-end">
                {show.image ? (
                  <img
                    className="h-80 md:h-[28rem] w-auto rounded-b-xl md:rounded-xl"
                    src={show.image.original}
                    alt=""
                  />
                ) : (
                  <img
                    className="h-80 md:h-[28rem] w-auto rounded-b-xl md:rounded-xl"
                    src={noImage}
                    alt=""
                  />
                )}
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="text-5xl md:text-6xl font-bold font-caproila ">
                  {show.name}
                </div>
                <div className="flex md:hidden gap-2 mt-1 justify-center md:justify-start">
                  {show.genres.length > 0 &&
                    show.genres.map((genre, index) => (
                      <div
                        key={index}
                        className="text-sm p-1 text-gray-500 font-semibold"
                      >
                        {genre}
                      </div>
                    ))}
                </div>
                <div className="flex md:block items-center justify-around">
                  <div className="mt-4 text-sm flex items-center justify-center md:justify-start">
                    <div>
                      <svg
                        className="w-4 h-4 text-yellow-500 dark:text-yellow-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                      </svg>
                    </div>
                    <div className="text-base ml-1 text-gray-500">
                      {show.rating.average != null
                        ? show.rating.average
                        : "No ratings"}{" "}
                      {(show.premiered &&
                        `| ${show?.premiered?.split("-")[0]}`) ||
                        ""}
                    </div>
                  </div>
                  {show.runtime && (
                    <div className="mt-2 font-semibold text-gray-300">
                      {show.runtime} mins
                    </div>
                  )}
                </div>

                <div
                  className="mt-4 text-md text-gray-300"
                  dangerouslySetInnerHTML={{ __html: show.summary }}
                ></div>
                <div className=" hidden md:flex gap-2 mt-8 justify-center md:justify-start">
                  {show.genres.length > 0 &&
                    show.genres.map((genre, index) => (
                      <div
                        key={index}
                        className="text-sm bg-gray-500 p-1 rounded-md text-gray-300"
                      >
                        {genre}
                      </div>
                    ))}
                </div>
                <div className="mt-8 flex justify-center md:justify-start gap-8">
                  <a
                    href={show.url}
                    className="flex w-fit items-center text-teal-600 bg-none border border-teal-600 focus:outline-none hover:bg-teal-600 hover:text-white focus:ring-4 focus:ring-teal-100 font-medium rounded-lg text-md px-5 py-2.5"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-2">Watch Now</span>
                  </a>
                  <Link to={`/ticket/${id}`}>
                    <button className="flex w-fit items-center text-teal-600 bg-none border border-teal-600 focus:outline-none hover:bg-teal-600 hover:text-white focus:ring-4 focus:ring-teal-100 font-medium rounded-lg text-md px-5 py-2.5">
                      Book Ticket
                    </button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ShowDetails;
