import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import RepoCard from "../components/RepoCard";

export default function Index() {
  let [repos, setRepos] = useState([]);
  let [loaded, setLoaded] = useState(false);

  const { user, username } = useAuthContext();

  useEffect(() => {
    const fetchRepo = async () => {
      const res = await fetch(`/api/`);
      const data = await res.json();
      setRepos(data.repos);
    };

    fetchRepo();
  }, []);

  return (
    <main className="bg-secondary text-secondary mx-auto pt-12 px-4 lg:px-8 pb-20">
      <section className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-center lg:text-left">
          All Recipes
        </h1>
        {user && user.user && (
          <NavLink
            to={`/${user.user.username}/create`}
            className="bg-tertiary text-tertiary rounded px-5 py-2 shadow shadow-gray-500 border border-gray-200"
          >
            New Recipe
          </NavLink>
        )}
      </section>
      <section className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 md:grid-flow-row lg:grid-cols-3">
        {repos.map((repo) => (
          <RepoCard repo={repo} key={repo.id} />
        ))}
      </section>
    </main>
  );
}
