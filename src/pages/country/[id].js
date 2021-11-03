import { useState, useEffect } from "react"
import Layout from "../../components/Layout"
import Link from "next/link"

const getBorders = async (id) => {
  const response = await fetch(`https://restcountries.com/v2/alpha/${id}`)
  const country = await response.json()
  return country
}

const Country = ({ country }) => {
  const [borders, setBorders] = useState([])

  const getAllBorders = (country) =>
    Promise.all(
      country.borders ? country.borders.map((border) => getBorders(border)) : []
    ).then((res) => setBorders(res))

  useEffect(() => {
    getAllBorders(country)
  }, [])

  useEffect(() => {
    getAllBorders(country)
  }, [country])

  const detailRows = [
    { name: "Capital", value: country.capital },
    { name: "Gini", value: country.gini },
    { name: "Native Name", value: country.nativeName },
    {
      name: "Currencies",
      value: country.currencies
        .map((cur) => `${cur.name} ( ${cur.symbol} )`)
        .join(", "),
    },
    {
      name: "Languages",
      value: country.languages.map((lan) => lan.name).join(", "),
    },
  ]

  return (
    <Layout title={country.name}>
      <div className="lg:flex mt-5">
        <div className="flex justify center items-center mx-auto flex-col lg:w-1/2 mb-5">
          <img
            src={country.flag}
            alt={country.name}
            className="rounded-sm lg:w-full"
          />
          <div className="flex justify-center gap-x-[100px]">
            <div>
              <h2 className="font-bold text-center text-sm md:text-2xl ">
                Name
              </h2>
              <h4 className="text-md text-center">{country.name}</h4>
            </div>
            <div>
              <h2 className="font-bold text-sm md:text-2xl ">Population</h2>
              <h4 className="text-md text-center">{country.population}</h4>
            </div>
          </div>
        </div>

        <div className="lg:w-3/4 mx-auto md:px-3">
          <div className="bg-white rounded-md p-3 dark:bg-gray-200 dark:bg-opacity-80 dark:text-white">
            <h3 className="text-2xl text-blue-500 ">Details</h3>
            {detailRows.map((item) => (
              <div
                className="flex justify-between items-center py-2 border-b-2"
                key={item.name}
              >
                <span className="text-sm md:text-2xl">{item.name}</span>
                <span className="text-sm md:text-2xl">{item.value || "-"}</span>
              </div>
            ))}
          </div>

          {!!borders.length && (
            <div className="bg-black bg-opacity-10 mt-4 rounded-md p-3 dark:bg-gray-200 dark:bg-opacity-80">
              <h1 className="text-xl text-blue-500">Neighboring Countries</h1>
              <div className="flex flex-wrap gap-5 mt-3">
                {borders.map((border) => (
                  <Link
                    key={border.name}
                    passHref
                    href={`/country/${border.alpha2Code}`}
                  >
                    <div className="group relative w-[calc(25%-20px)] cursor-pointer">
                      <img src={border.flag} alt={border.name} />
                      <span className="w-auto h-7 px-3 py-1 font-bold rounded-md bg-black hidden absolute left-1/2 -top-8 -translate-x-1/2 whitespace-nowrap group-hover:block  ">
                        {border.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async ({ params }) => {
  const country = await getBorders(params.id)
  return {
    props: {
      country,
    },
  }
}

export default Country
