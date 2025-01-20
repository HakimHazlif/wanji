import { useLists } from "../features/lists/useLists";

const Lists = () => {
  const { remainLists, watchlist, favoriteList } = useLists();
  console.log(remainLists);

  return (
    <main>
      <section>hfhghhhhh</section>
    </main>
  );
};

export default Lists;
