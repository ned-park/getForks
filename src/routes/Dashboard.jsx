import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import RepoCard from "../components/RepoCard";

export default function Dashboard() {
  let [repos, setRepos] = useState([]);
  let [loaded, setLoaded] = useState(false);

  const { userId } = useParams();
  const { user, username } = useAuthContext();

  useEffect(() => {
    const fetchRepo = async () => {
      const res = await fetch(`/api/${userId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      setRepos([...data.repos]);
    };

    if (user && user.user) {
      fetchRepo();
    }
  }, [user, userId]);

  return (
    <main className="bg-secondary text-secondary mx-auto pt-12 px-4 lg:px-8 pb-20">
      <section className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-center lg:text-left">
          {`${userId}'s`} Recipes
        </h1>
        {user && user.user && (
          <NavLink
            to={`/${user.user.username}/create`}
            className="bg-tertiary text-tertiary rounded px-5 py-2 shadow shadow-gray-400"
          >
            New Recipe
          </NavLink>
        )}
      </section>
      <section className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 md:grid-flow-row lg:grid-cols-3">
        {repos.map((repo) => (
          <RepoCard repo={repo} key={repo._id} />
        ))}
      </section>
    </main>
  );
}
