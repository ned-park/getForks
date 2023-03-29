import aboutImage from "../assets/about.jpg";
import "../about.css";

export default function About() {
  return (
    <main className="bg-secondary text-secondary mx-auto pt-12 px-4 lg:px-20 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <section className="flex flex-col gap-8">
          <div className="about--intro">
            <h1 className="font-bold text-2xl mb-4">How it started</h1>
            <p>
              getForks was born out of a desire to improve the state of recipe
              sharing and development on the web. Traditional methods of recipe
              sharing online leave a lot to be desired. With getForks, it's
              possible to create, update, share, copy, and modify recipes while
              keeping past and original versions readily accessible all in one
              convenient place.
            </p>
          </div>
          <div className="about--img">
            <img
              src={aboutImage}
              alt="A Banh mi sandwich"
              className="rounded"
            />
          </div>
        </section>
        <section className="flex flex-col gap-8">
          <div className="about--approach">
            <h1 className="font-bold text-2xl mb-4">
              An improved approach to recipe sharing
            </h1>
            <p>
              getForks leverages the power of version control tools used during
              software development to make creating, sharing, and finding
              recipes easier. Traditional version control systems tools do much
              more than is required for recipe development, so getForks provides
              an simple interface with the relevant subset features so everyone
              can access the benefits without the fuss.
            </p>
          </div>
          <div className="about--list">
            <ol className="flex flex-col gap-8">
              <li>
                <h3 className="font-bold text-lg">
                  Leverage the power of source control
                </h3>
                <p>
                  Source control is powerful, but getForks uses a subset of
                  features, which includes easy forking and version history.
                </p>
              </li>
              <li>
                <h3 className="font-bold text-lg">
                  Easily fork recipes to save and modify
                </h3>
                <p>
                  Simply click the Fork button on a recipe to clone the
                  repository enabling you to save, find, and modify it as
                  desired later on. This copy remains there, even if the
                  original is changed or deleted later on.
                </p>
              </li>
              <li>
                <h3 className="font-bold text-lg">Easy editing</h3>
                <p>
                  getForks uses a simple markdown editor for formatting and
                  developing recipes. This allows users to customize the
                  appearance of recipes without the complexity of html or the
                  rigidity of predefined styles. You're free to follow the
                  template provided or switch it up if you're already
                  comfortable with markdown.
                </p>
              </li>
            </ol>
          </div>
        </section>
      </div>
    </main>
  );
}
