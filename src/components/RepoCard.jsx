import { NavLink } from "react-router-dom";

export default function RepoCard({ repo }) {
  return (
    <section className="bg-primary text-primary repoCard flex justify-start shadow-lg lg:min-h-[192px] lg:max-h-[192px] rounded">
      <NavLink to={`/${repo.userId.username || repo.username}/${repo._id}`}>
        <div className="min-w-[256px]">
          {repo.image && (
            <img
              className="w-256 lg:rounded-l"
              src={`${repo.image.slice(
                0,
                49
              )}/f_auto,q_90,c_fill,h_192,w_256/${repo.image.slice(62)}`}
              alt=""
            />
          )}
        </div>
      </NavLink>
      <div className="flex flex-col w-full px-4 p-2">
        <NavLink to={`/${repo.userId.username || repo.username}/${repo._id}`}>
          <div className="">
            <h5 className="text-center font-bold mt-2">{repo.title}</h5>
            <div className="mt-4">
              {repo.description.length > 0 && (
                <span className="">
                  {repo.description.slice(0, 128) + "..."}
                </span>
              )}
            </div>
          </div>
        </NavLink>
        <div className="flex mt-auto items-end justify-between text-sm">
          {repo.tags && (
            <div>
              {repo.tags.length > 0 && <span> More tagged with: </span>}
              {repo.tags.map((tag, i) => (
                <NavLink
                  to={`/search?query=${tag}`}
                  key={`tag${i}`}
                  className="text-primary hover:text-accent cursor:pointer"
                >
                  <span key={`tagspan${i}`}>{tag} </span>
                </NavLink>
              ))}
            </div>
          )}
          <NavLink to={`/${repo.userId.username || repo.username}`}>
            <span className="">
              More from {repo.userId.username || repo.username}
            </span>
          </NavLink>
        </div>
      </div>
      {/* <!-- <p className="text-brBlack text-xs">=repo.creationDate</p> --> */}
    </section>
  );
}
