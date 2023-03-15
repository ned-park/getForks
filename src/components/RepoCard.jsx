import { NavLink } from "react-router-dom";

export default function RepoCard({ repo }) {
  return (
    <section className="bg-primary text-primary flex flex-col border border-gray-200 rounded-lg shadow max-w-[726px]">
      <NavLink to={`/${repo.userId.username || repo.username}/${repo._id}`}>
        {repo.image && (
          <img
            className="object-fill w-full rounded-t-lg"
            /* prettier-ignore */
            src={`${repo.image.slice(0,49)}/f_auto,q_90,c_fill,h_200,w_750/${repo.image.slice(62)}`}
            alt={`${repo.description}`}
          />
        )}
      </NavLink>
      <div className="flex flex-col justify-between p-4 flex-start">
        <NavLink to={`/${repo.userId.username || repo.username}/${repo._id}`}>
          <div className="">
            <h5 className="text-center font-bold mt-2">{repo.title}</h5>
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
        <NavLink to={`/${repo.userId.username || repo.username}`}>
          <span className="">By {repo.userId.username || repo.username}</span>
        </NavLink>
      </div>
    </section>
  );
}
