import { Link } from "react-router-dom";
import { Credit } from "../shared/interfaces/credit.interface";
import { Person } from "../shared/interfaces/person.interface";

function PersonCard({ person }: { person: Credit | Person }) {
  return (
    <Link
      to={`/person/${person.id}`}
      className="inline-flex flex-col w-[140px] h-[255px] noSelect"
    >
      {person.profile_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w185/${person.profile_path}`}
          alt={person.name}
          style={{ width: 138, height: 175, objectFit: "cover" }}
          className="rounded-lg"
        />
      ) : (
        <div className="w-[138px] h-[175px] bg-base-200 rounded-lg flex justify-center items-center">
          <span className="text-neutral-content">No Image</span>
        </div>
      )}

      <div className="w-full h-[25%] flex flex-col p-2 gap-1 leading-4">
        {" "}
        <p className="font-bold hover:opacity-80 ">{person.name}</p>
        {"character" in person && (
          <p className="text-[14px]">{person.character}</p>
        )}
      </div>
    </Link>
  );
}

export default PersonCard;
