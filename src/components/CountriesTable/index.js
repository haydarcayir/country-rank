import { useState, useEffect } from "react"
import Link from "next/link"
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi"

const Chevron = ({ direction }) => {
  if (!direction) return null
  if (direction === "asc") return <HiOutlineChevronDown />
  else return <HiOutlineChevronUp />
}

const Button = ({ name, direction, onClick }) => {
  return (
    <button
      className="outline-none flex items-center justify-center"
      onClick={() => onClick(name)}
    >
      <span>{name[0].toUpperCase() + name.slice(1)}</span>
      <Chevron direction={direction} />
    </button>
  )
}

const CountriesTable = ({ countries }) => {
  const [direction, setDirection] = useState()
  const [sortedCountries, setSortedCountries] = useState([...countries])

  useEffect(() => {
    setSortedCountries([...countries])
  }, [countries])

  const sortCountries = (countries, name, direction) => {
    if (direction === "asc")
      return countries.sort((a, b) => (a[name] > b[name] ? 1 : -1))
    else if (direction === "desc")
      return countries.sort((a, b) => (a[name] > b[name] ? -1 : 1))
  }

  const setDirectionAndSortedCountries = (name) => {
    if (!direction || direction === "desc") {
      setDirection("asc")
      const retVal = sortCountries([...countries], name, "asc")
      setSortedCountries(retVal)
    } else {
      setDirection("desc")
      const retVal = sortCountries([...countries], name, "desc")
      setSortedCountries(retVal)
    }
  }

  const buttons = ["name", "capital", "area", "population"]

  return (
    <div>
      <div className="hidden md:grid grid-cols-4 place-items-start pl-3">
        {buttons.map((button) => (
          <Button
            key={button}
            name={button}
            direction={direction}
            onClick={setDirectionAndSortedCountries}
          />
        ))}
      </div>
      {sortedCountries.map((country) => (
        <Link
          passHref
          href={`/country/${country.alpha2Code}`}
          key={country.name}
        >
          <div
            className="md:grid grid-cols-4 place-items-start px-3 text-gray-300 bg-gray-400 py-5 mb-5 
          shadow-xl transition-all rounded-md hover:translate-y-1 cursor-pointer hover:shadow-md"
          >
            <div className="flex justify-between">
              <span className="md:hidden">Name</span>
              <div className="flex items-center flex-row-reverse md:flex-row">
                <img src={country.flag} width={40} height={40} />
                <span className="mx-2">{country.name}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="md:hidden">Capital</span>
              <span>{country.capital}</span>
            </div>
            <div className="flex justify-between">
              <span className="md:hidden">Area</span>
              <span>{country.area}</span>
            </div>
            <div className="flex justify-between">
              <span className="md:hidden">Population</span>
              <span>{country.population}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default CountriesTable
