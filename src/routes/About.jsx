import "../about.css";

export default function About() {
  return (
    <main className="about">
      <div className="container about--grid">
        <div className="about--intro">
          <h1>How it started</h1>
          <p>
            getForks was born out of a desire to improve the state of recipe
            sharing and development on the web. Traditional methods of recipe
            sharing online leave a lot to be desired. Comment sections are
            filled with modifications and derivations and users have no easy way
            of keeping track of modifications they've made. By creating forks,
            all of your recipes original or modified are found in one easy,
            searchable place.
          </p>
        </div>
        <div className="about--img">
          <img
            src="https://placekitten.com/1280/800"
            alt="chickpeas, veggies, and couscous"
          />
        </div>
        <div className="about--approach">
          <h1>An improved approach to recipe sharing</h1>
          <p>
            getForks leverages the power of version control tools used during
            software development to make creating, sharing, and finding recipes
            easier. Those tools are complex, but getForks provides an intuitive
            easy to understand and use interface for a limited subset of those
            features so everyone benefits without needing to spend hours reading
            documentation.
          </p>
        </div>
        <div className="about--list">
          <ol>
            <li>
              <h3>Leverage the power of source control</h3>
              Source control is powerful, but getForks uses a subset of
              features, which includes easy forking and version history.
            </li>
            <li>
              <h3>Easily fork recipes to save and modify</h3>

              <p>
                Simply click the Ψ symbol on a recipe to clone the repository
                enabling you to save, find, and modify it as desired later on.
                This copy remains there, even if the original is changed or
                deleted later on.
              </p>
            </li>
            <li>
              <h3>Easy editing</h3>

              <p>
                getForks uses a simple markdown editor for formatting and
                developing recipes. This allows users to customize the
                appearance of recipes without the complexity of html or the
                rigidity of predefined styles. You're free to follow the
                template provided or switch it up if you're already comfortable
                with markdown.
              </p>
            </li>
          </ol>
        </div>
      </div>
    </main>
  );
}
