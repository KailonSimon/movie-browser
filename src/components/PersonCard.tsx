import React from "react";
import { Link } from "react-router-dom";

function PersonCard({ person }: any) {
  return (
    <Link to={`/person/${person.id}`}>
      <div className="relative w-[140px] h-[255px]">
        {person.profile_path ? (
          <img
            src={`http://image.tmdb.org/t/p/w185/${person.profile_path}`}
            alt={person.name}
            style={{ width: 138, height: 175, objectFit: "cover" }}
            className="rounded-lg"
          />
        ) : (
          <div className="w-[138px] h-[175px] bg-base-200 rounded-lg flex justify-center items-center">
            <span className="text-neutral-content">No Image</span>
          </div>
        )}

        <div className="w-full h-[25%] flex flex-col p-2">
          {" "}
          <p className="font-bold hover:opacity-80">{person.name}</p>
          <p className="text-[14px]">{person.character}</p>
        </div>
      </div>
    </Link>
  );
}

export default PersonCard;
