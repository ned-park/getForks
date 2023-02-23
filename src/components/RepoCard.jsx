import { useState } from "react"

export default function RepoCard({repo}) {
  return (
    <section className="repoCard">
      <div className="">
          <div className="">             
                {repo.image && <img className="" src={`${repo.image.slice(0,49)}/f_auto,q_90,w_256/${repo.image.slice(62)}`} alt="" />}
              <div className="">
                  <a href={`${repo.username}/${repo._id}`}>
                      <h5 className="">{repo.title}</h5>
                  </a>
                  <a href={`${repo.username}`} className="">
                    <span className="">More from {repo.username}</span>
                    </a>
                  <div className="">
                   {repo.description.length > 0 && 
                      <span className="">{repo.description.slice(0,128) + '...'}</span>
                   }
                  </div>
                  {repo.tags && (
                    <div className="">
                      {repo.tags.map((tag, i) => (<a href={`/search?query=${tag}`} key={`tag${i}`} className="hover:text-blue cursor:pointer"><span key={`tagspan${i}`}>{tag} </span></a>) )}
                    </div>
                  )}
                  {/* <!-- <p className="text-brBlack text-xs">=repo.creationDate</p> --> */}
              </div>
          </div>
        </div>
    </section>

  )
}