import React, { useEffect, useState } from "react";
import { Card, FormField, Loader } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0)
    return data.map((post) => <Card key={post._id} {...post} />);
  return (
    <h2 className="mt-5  font-bold float-right  text-[#486E52] text-xl uppercase">
      {title}
    </h2>
  );
};
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [search, setSearch] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);
  useEffect(() => {
    console.log(import.meta.env.BASE_URL);
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://192.168.1.12:8080/api/v1/post", {
          method: "GET",
          headers: { "Content-type": "application/json" },
        });
        if (res.ok) {
          const result = await res.json();
          setAllPosts(result.data.reverse());
        }
      } catch (e) {
        alert(e);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearch(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto ">
      <div className="w-full  justify-end text-right  flex">
        <h1 className=" float-right text-[#222328] text-[56px] max-sm:text-[40px]">
          ملتقطات من المخيم الصيفي<br className="max-md:hidden"></br> 2023
        </h1>
      </div>
      <div className="mb-24 mt-10">
        <FormField
          LabelName={"ابحث عن احد المنشورات"}
          type={"text"}
          name={"text"}
          placeholder={"البحث"}
          value={search}
          handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            {" "}
            <Loader />
          </div>
        ) : (
          <>
            {search && (
              <div className="flex flex-col text-right justify-end">
              <h2 className="font-medium  float-right text-[#666e75] text-xl mb-3">
                يتم اضهار نتائج البحث ل{" "}
                <span className="text-[#222328] float-left mx-2">
                  {" "}
                  {search}{" "}
                </span>
              </h2>
              <hr className=""></hr>
              </div>
            )}
            <div
              className="grid lg:grid-cols-4 auto-rows-auto sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3"
              style={{ direction: "rtl" }}
            >
              {search ? (
                <RenderCards
                  data={searchedResults}
                  title={"لم يتم العثور على اي نتائج بحث"}
                />
              ) : (
                <RenderCards
                  data={allPosts}
                  title="لم يتم العثور على اي منشورات"
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
