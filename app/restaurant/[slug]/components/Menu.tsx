import { Item } from "@prisma/client";
import React from "react";
import MenuCard from "./MenuCard";

function Menu({ menu }: { menu: Item[] }) {
  return (
    <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        {menu.length < 1 ? (
          <div className="flex flex-wrap justify-between">
            {menu.map((item) => {
              return <MenuCard key={item.id} item={item} />;
            })}
          </div>
        ) : (
          <div className="flex flex-wrap justify-between">
           <p>No menu for this restaurant</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default Menu;
