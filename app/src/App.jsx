import { useEffect, useState } from "react";
import styled from "styled-components"
import SearchResult from "./Components/SearchResult/SearchResult";
export const BASE_URL = "http://localhost:9000";

const App = () => {


  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedButton, setSelectedButton] = useState("all");


  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        setLoading(true);

        const response = await fetch(BASE_URL);

        const json = await response.json();
        // console.log(json);

        setData(json);
        setFilteredData(json);
        setLoading(false);
      }

      catch (error) {
        setError("Unable to fetch data.");
      }
    }
    fetchFoodData()
  }, [])


  const searchFood = (e) => {
    const searchValue = e.target.value;

    if (searchValue === "") {
      setFilteredData(null);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };


  const filterFood = (type)=> {

    if(type === "all") {
      setFilteredData(data);
      setSelectedButton("all");
      return ;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedButton(type); 

  }

  const filterBtns = [{
      name : "All",
      type : "all"
    },
    {
      name : "Breakfast",
      type : "breakfast"
    },
    {
      name : "Lunch",
      type : "lunch"
    },
    {
      name : "Dinner",
      type : "dinner"
    },
  ]

  if (error) {
    return <div>{error}</div>
  }

  if (loading) {
    return <div>Loading....</div>
  }

  return (
    <>
      <MainContainer>
        <TopContainer>
          <div className="logo">
            <img src="/public/Foody Zone.svg" alt="logo" />
          </div>

          <div className="search">
            <input onChange={searchFood} type="text" placeholder="Search Food..." />
          </div>


        </TopContainer>


        <FilterButton>
          {filterBtns.map((value) => (
            <Button
              isSelected={selectedButton === value.type}
              key={value.name}
              onClick={() => filterFood(value.type)}
            >
              {value.name}
            </Button>
          ))}
        </FilterButton>
      </MainContainer>
      <SearchResult data={filteredData} />
    </>
  )
};

export default App;



export const MainContainer = styled.main`
  max-width: 1280px;
  margin: 0 auto;
`

const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  align-items: center;

    .search {
      input {
        border: 1px solid red;
        border-radius: 5px;
        color: white;
        text-decoration: white;
        height: 40px;
        padding: 0 10px;
        font-size: 16px;
        background-color: transparent;

        &::after {
          border: 1px solid red;
        }

        &::placeholder {
          color: white;
        }
      }
    }

    @media (0 < width < 600px) {
      flex-direction: column;
      height: 120px;
    }

`

const FilterButton = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  gap: 12px;
  padding-bottom: 40px;
`

export const Button = styled.div`
  background: ${({isSelected})=>  (isSelected ?  "green" : "#c02727" )};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 6px 12px;
  cursor: pointer;
  max-width: fit-content;

  &:hover {
    background-color: green;
  }


`
