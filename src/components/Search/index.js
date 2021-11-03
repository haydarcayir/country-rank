import React from "react"
import { BsSearch } from "react-icons/bs"

const Search = ({ className, ...rest }) => {
  return (
    <div className="flex items-center bg-gray-400 text-gray-300 w-full h-5 p-5 rounded-lg my-4 md:my-5">
      <BsSearch className="mr-3" />
      <input
        {...rest}
        className="placeholder-gray-300 bg-transparent outline-none"
      />
    </div>
  )
}

export default Search
