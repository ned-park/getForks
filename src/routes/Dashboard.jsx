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
  }, [user]);

  return (
    <main>
      <section>
        <h1>{`${userId}'s`} Recipes</h1>
        {user && user.user && (
          <NavLink to={`/${user.user.username}/create`} className="btn">
            New Recipe
          </NavLink>
        )}
      </section>
      <section>
        {repos.map((repo) => (
          <RepoCard repo={repo} key={repo._id} />
        ))}
      </section>
    </main>
  );
}
