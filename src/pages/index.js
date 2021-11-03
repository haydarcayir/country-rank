import React, { useState } from "react"
import Layout from "../components/Layout"
import Search from "../components/Search"
import CountriesTable from "../components/CountriesTable"

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("")

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(keyword)
  )

  return (
    <div>
      <Layout>
        <Search
          placeholder="Search country"
          onChange={(e) => setKeyword(e.target.value.toLowerCase())}
        />
        <CountriesTable countries={filteredCountries} />
      </Layout>
    </div>
  )
}

export const getServerSideProps = async () => {
  const response = await fetch("https://restcountries.com/v2/all")
  const countries = await response.json()
  return {
    props: {
      countries,
    },
  }
}
