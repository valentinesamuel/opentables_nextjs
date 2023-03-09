/* eslint-disable react/no-unescaped-entities */
import Header from "./components/Header";
import SearchSideBar from "./components/SearchSideBar";
import RestaurantCard from "./components/RestaurantCard";

const Search = () => {
  return (
    <>
      <SearchSideBar />
      <div className="w-5/6">
        <RestaurantCard />
      </div>
    </>
  );
};

export default Search;
