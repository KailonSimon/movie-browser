import { useState, SyntheticEvent } from "react";
import { TextInput } from "@mantine/core";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setInput("");
    navigate(`search/${input}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full md:w-fit">
      <TextInput
        classNames={{
          wrapper: "flex",
          input:
            "bg-transparent border-base-300 focus:border-neutral-content rounded-lg text-white",
        }}
        placeholder="Search"
        rightSection={
          <button
            className="h-full aspect-square flex justify-center items-center bg-neutral-content disabled:opacity-50 rounded-r-lg"
            type="submit"
            disabled={!input}
          >
            <AiOutlineSearch size={20} className="text-base-200" />
          </button>
        }
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
      />
    </form>
  );
}

export default SearchBar;
