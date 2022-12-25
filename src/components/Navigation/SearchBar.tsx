import { TextInput } from "@mantine/core";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  return (
    <form onSubmit={() => navigate(`/search/${input}`)}>
      <TextInput
        classNames={{
          wrapper: "hidden md:flex",
          input:
            "bg-transparent border-base-300 focus:border-neutral-content rounded-full text-white",
        }}
        placeholder="Search"
        icon={<AiOutlineSearch size={16} className="fill-neutral-content" />}
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
      />
    </form>
  );
}

export default SearchBar;
