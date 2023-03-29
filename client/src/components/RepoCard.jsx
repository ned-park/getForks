import { NavLink } from "react-router-dom";
import placeholder from "../assets/lukas-blazek-f-TWhXOrLiU-unsplash.jpg";
import { useAuthContext } from "../hooks/useAuthContext";

export default function RepoCard({ repo }) {
  const { user, username } = useAuthContext();

  return (
    <section className="bg-primary text-primary flex flex-col rounded-lg max-w-[726px] shadow-xl">
      <NavLink
        to={
          user
            ? `/${repo.userId.username || repo.username}/${repo._id || repo.id}`
            : `/login`
        }
      >
        {" "}
        <img
          className="object-fill w-full rounded-t-lg"
          /* prettier-ignore */
          src={repo.image? `${repo.image.slice(0,49)}/f_auto,q_90,c_fill,h_600,w_750/${repo.image.slice(62)}` : placeholder}
          alt={`${repo.description}`}
        />
      </NavLink>
      <div className="flex flex-col justify-between p-4 flex-start">
        <NavLink
          to={
            user
              ? `/${repo.userId.username || repo.username}/${
                  repo._id || repo.id
                }`
              : `/login`
          }
        >
          <div className="">
            <h5 className="text-center font-bold mt-2 text-2xl">
              {repo.title}
            </h5>
            <div className="mt-4 mb-auto">
              {repo.description.length > 0 && (
                <span className="text-sm">
                  {repo.description.slice(0, 128) + "..."}
                </span>
              )}
            </div>
          </div>
        </NavLink>
      </div>
      <div className="pl-4 pb-4 mt-auto text-xs md:text-sm justify-self-end">
        <NavLink
          to={
            user
              ? `/${repo.userId.username || repo.username}/${
                  repo._id || repo.id
                }`
              : `/login`
          }
        >
          <span className="">By {repo.userId.username || repo.username}</span>
        </NavLink>
      </div>
    </section>
  );
}
