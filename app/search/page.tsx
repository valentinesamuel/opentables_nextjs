/* eslint-disable react/no-unescaped-entities */
import SearchSideBar from "./components/SearchSideBar";
import RestaurantCard from "./components/RestaurantCard";
import { PRICE, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
interface SearchParams {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}
const fetchRestaurantsByCity = (searchParams: SearchParams) => {
  const where: any = {};

  if (searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city.toLowerCase(),
      },
    };
    where.location = location;
  }
  if (searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase(),
      },
    };
    where.cuisine = cuisine;
  }
  if (searchParams.price) {
    const price = {
      equals: searchParams.price,
    };
    where.price = price;
  }
  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
  };
  return prisma.restaurant.findMany({
    where,
    select,
  });
};

const fetchLocations = async () => {
  const locations = prisma.location.findMany();
  return locations;
};
const fetchCuisines = async () => {
  const cuisines = prisma.cuisine.findMany();
  return cuisines;
};
const Search = async ({ searchParams }: { searchParams: SearchParams }) => {
  const restaurants = await fetchRestaurantsByCity(searchParams);
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  return (
    <>
      <SearchSideBar
        locations={locations}
        cuisines={cuisines}
        searchParams={searchParams}
      />
      <div className="w-5/6">
        {restaurants.length >= 1
          ? restaurants.map((restaurant) => {
              return (
                <RestaurantCard restaurant={restaurant} key={restaurant.id} />
              );
            })
          : "No restaurants found"}
      </div>
    </>
  );
};

export default Search;
