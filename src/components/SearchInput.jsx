import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import classNames from "classnames";
import useDebounce from "@/hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

function SearchInput({ active, toggleActive }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");

  const handleChange = useDebounce((e) => {
    setQuery(e.target.value.trim());
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      query: e.target.value.trim(),
      page: 1,
    });
  }, 500);

  return (
    <div className={classNames("search", { active })}>
      <input
        className="search-input"
        type="text"
        placeholder="Search for an article by title or text..."
        onChange={handleChange}
        defaultValue={query}
      />
      <IconButton onClick={toggleActive}>
        <CloseIcon />
      </IconButton>
    </div>
  );
}

export default SearchInput;
