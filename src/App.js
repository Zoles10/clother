import React, { useState } from "react";
import Product from "./Product";
import Filter from "./Filter";
// import itemDataFile from './itemsData'
import { Slider } from "@mui/material";

export default function App() {
  const [itemsData, setItemsData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [whatToFilter, setWhatToFilter] = useState([]);
  const [sliderValue, setSliderValue] = useState(1000);
  const [searchValue, setSearchValue] = useState("");

  React.useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setItemsData(data.map((item) => ({ ...item, filtered: false })));
        const array = [];
        // for(var i = 0; i<data.length; i++ ){
        //     if(array.indexOf(data[i].category)===-1){
        //         console.log(data[i].category)
        //         array.push(data[i].category)
        //     }
        // }
        data.forEach((element) => {
          array.includes(element.category) || array.push(element.category);
        });
        setWhatToFilter(array);
        console.log(whatToFilter);
      });
  }, []);

  const filter = (string) => {
    setItemsData((prevState) =>
      prevState.map((item) =>
        item.category === string
          ? { ...item, filtered: !item.filtered }
          : { ...item }
      )
    );
  };

  const handleSliderChange = (event) => {
    console.log(sliderValue);
    setSliderValue(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    console.log(searchValue);
  };

  React.useEffect(() => {
    itemsData.every((item) => item.filtered === false)
      ? setIsFiltered(false)
      : setIsFiltered(true);
  }, [itemsData]);

  const array = isFiltered
    ? itemsData
        .filter(
          (item) =>
            item.filtered === true &&
            item.price < sliderValue &&
            item.title.includes(searchValue)
        )
        .map((item) => <Product itemsData={item} key={item.id} />)
    : itemsData
        .filter(
          (item) => item.price < sliderValue && item.title.includes(searchValue)
        )
        .map((item) => <Product itemsData={item} key={item.id} />);

  const filtersArray = whatToFilter.map((filterName) => (
    <Filter string={filterName} filter={filter} />
  ));

  return (
    <div className="app">
      <span className="header">
        <h1 className="title"> clother.shop</h1>
      </span>

      
      <span className="app--header--under">
        <input
            className="app--header--under--search"
            placeholder="Search"
            value={searchValue}
            onChange={handleSearchChange}
        ></input>

        <h3 className="app--header--under--title">Filters:</h3>
      </span>


      <span className="filters">
        {filtersArray}

        <h3 style={{ marginRight: "20px" }}>Price:</h3>
        <Slider
          defaultValue={1000}
          aria-label="Default"
          valueLabelDisplay="auto"
          value={sliderValue}
          onChange={handleSliderChange}
          style={{ width: "10%" }}
          sx={{ color: "aqua" }}
          min={0}
          max={1000}
        />
      </span>

      <span className="app--items">{array}</span>
    </div>
  );
}
