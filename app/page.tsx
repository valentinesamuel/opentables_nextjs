/* eslint-disable react/no-unescaped-entities */
import { PrismaClient } from "@prisma/client";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";

const inter = Inter({ subsets: ["latin"] });
const prisma = new PrismaClient();

const fetchRestaurants = async () => {
  const restaurants = await prisma.restaurant.findMany();
  return restaurants;
};

export default async function Home() {
  const restaurants = await fetchRestaurants();
  console.log({ restaurants });

  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        <RestaurantCard />
      </div>
    </main>
  );
}

// MMM6NgtRvjviTb2Z
