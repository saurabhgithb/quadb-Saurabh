import React from "react";
import { Link } from "react-router-dom";

// displays the list of shows in form of grid
const ShowList = ({ shows }) => {
  return (
    <>
      <div className="min-h-lvh bg-slate-900 text-white">
        <div className="max-w-7xl flex flex-wrap gap-x-10 gap-y-20 items-center justify-center mx-auto pt-10 pb-5">
          {shows.map((i) => (
            <Link key={i.show.id} to={`/details/${i.show.id}`}>
              <div className="text-center rounded-xl duration-500 hover:scale-105 hover:cursor-pointer">
                <div className="w-56 h-80 bg-gray-700 text-white font-medium rounded-xl flex justify-center items-center">
                  {i.show.image ? (
                    <img
                      className="w-full h-full rounded-xl object-cover object-bottom"
                      src={i.show.image.original}
                      alt=""
                    />
                  ) : (
                    <img
                      className="w-full h-full rounded-xl object-cover object-bottom"
                      src="/src/assets/no-image.jpg"
                      alt=""
                    />
                  )}
                </div>

                <div>
                  <h1 className="text-lg font-bold font-caproila">
                    {i.show.name}
                  </h1>
                  <div className=" text-sm flex items-center justify-center">
                    <div className="">
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
                    <div className="text-center">
                      {i.show.rating.average != null
                        ? i.show.rating.average
                        : "No ratings"}{" "}
                      {(i.show.premiered &&
                        `| ${i.show?.premiered?.split("-")[0]}`) ||
                        ""}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowList;
