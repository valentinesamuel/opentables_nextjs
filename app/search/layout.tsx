
export const metadata = {
  title: "Search OpenTable",
};

const SearchLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        {children}
      </div>
    </main>
  );
};

export default SearchLayout;
