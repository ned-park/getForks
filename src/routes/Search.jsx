import { useEffect, useState } from "react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import RepoCard from "../components/RepoCard";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [repos, setRepos] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const { user } = useAuthContext();

  useEffect(() => {
    const url = `/api/search?${searchParams}`;
    const fetchRepo = async () => {
      const res = await fetch(url);
      const data = await res.json();
      setRepos([...data.repos]);
    };

    fetchRepo();
  }, [searchParams]);

  return (
    <main>
      <section>
        <h1>Your search results</h1>
        {user && user.user && (
          <NavLink to={`/${user.user.username}/create`} className="btn">
            New Recipe
          </NavLink>
        )}
      </section>
      <section>
        {repos.length < 1 && <p>No results found for your query.</p>}
        {repos.map((repo) => (
          <RepoCard repo={repo} key={repo._id} />
        ))}
      </section>
    </main>
  );
}
