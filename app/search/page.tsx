/* eslint-disable react/no-unescaped-entities */
import SearchSideBar from "./components/SearchSideBar";
import RestaurantCard from "./components/RestaurantCard";
import { PrismaClient } from "@prisma/client";
import { usePathname } from "next/navigation";

const prisma = new PrismaClient();

const fetchRestaurantsByCity = (city: string) => {
  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
  };
  if (!city) return prisma.restaurant.findMany({ select });
  return prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: city.toLowerCase(),
        },
      },
    },
    select,
  });
};
const Search = async ({ searchParams }: { searchParams: { city: string } }) => {
  const restaurants = await fetchRestaurantsByCity(searchParams.city);

  return (
    <>
      <SearchSideBar />
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
