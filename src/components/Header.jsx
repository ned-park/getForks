import Navbar from "./Navbar";

export default function Header({ setTheme }) {
  return (
    <header className="bg-primary p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl text-primary">getForks</h2>
        <Navbar setTheme={setTheme} />
      </div>
    </header>
  );
}
