import { useEffect, useState } from "react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import RepoCard from "../components/RepoCard";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [repos, setRepos] = useState([]);
  let [page, setPage] = useState(1);
  let [limit, setLimit] = useState(1);
  let [query, setQuery] = useState("");

  const { user } = useAuthContext();

  useEffect(() => {
    const url = `/api/search?${searchParams}`;

    const fetchRepo = async () => {
      const res = await fetch(url);
      const data = await res.json();
      setRepos([...data.repos]);
      setPage(+data.page);
      setLimit(/*+data.limit*/ 1);
      setQuery(data.query);
    };

    fetchRepo();
  }, [searchParams]);

  const updateQueryParams = (num) => {
    let newQueryParameters = new URLSearchParams();
    newQueryParameters.append("query", query);
    newQueryParameters.append("page", Math.max(page + num, 0));
    newQueryParameters.append("limit", limit);

    setSearchParams(newQueryParameters);
  };

  console.log(searchParams);

  return (
    <main className="bg-secondary text-secondary mx-auto pt-12 px-4 lg:px-8 pb-20">
      <section>
        <h1 className="text-xl font-bold text-center lg:text-left pb-8">
          Your search results
        </h1>
        {user && user.user && (
          <NavLink to={`/${user.user.username}/create`} className="btn">
            New Recipe
          </NavLink>
        )}
      </section>
      <section className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 md:grid-flow-row lg:grid-cols-3">
        {repos.length < 1 && <p>No results found for your query.</p>}
        {repos.map((repo) => (
          <RepoCard repo={repo} key={repo._id} />
        ))}
      </section>
      {
        <section className="mt-8 flex justify-between w-full">
          <button
            to={`/search?query=${query}&page=${Math.max(
              0,
              page - 1
            )}&limit=${limit}`}
            onClick={() => updateQueryParams(-1)}
            className="bg-tertiary text-tertiary rounded px-5 py-2 shadow shadow-gray-500"
          >
            Prev
          </button>
          <button
            to={`/search?query=${query}&page=${page + 1}&limit=${limit}`}
            onClick={() => updateQueryParams(1)}
            className="ml-auto justify-self-end bg-tertiary text-tertiary rounded px-5 py-2 shadow shadow-gray-500"
          >
            Next
          </button>
        </section>
      }
    </main>
  );
}
