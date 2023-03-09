import Header from "./components/Header";

export const metadata = {
  title: "Milestone Grill OpenTable",
};

const RestaurantDetailsLayout = ({
  children,
  params
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  return (
    <main>
      <Header name={params.slug } />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        {children}
      </div>
    </main>
  );
};

export default RestaurantDetailsLayout;
