import React, { useState } from "react";
import data from "./data.json";
import Fuse from "fuse.js";
import Item from "./item";

const SettingsPage = () => {
  const [searchData, setSearchData] = useState(data);
  const searchItem = (query) => {
    if (!query) {
      setSearchData(data);
      return;
    }
    const fuse = new Fuse(data, {
      keys: ["name", "tags"]
    });
    const result = fuse.search(query);
    const finalResult = [];
    if (result.length) {
      result.forEach((item) => {
        finalResult.push(item.item);
      });
      setSearchData(finalResult);
    } else {
      setSearchData([]);
    }
  };
  return (
    <div>
      <p className="title"> Technologies</p>
      <div className="search-container">
        <input
          type="search"
          onChange={(e) => searchItem(e.target.value)}
          placeholder="Search Technologies"
        />
      </div>

      <div className="item-container">
        {searchData.map((item) => (
          <Item {...item} key={item.name} />
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
