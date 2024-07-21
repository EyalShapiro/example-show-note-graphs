import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="btm-nav fixed left-0 top-0 z-10 w-full bg-gray-800 p-4 text-white">
      <Link to="/">
        <button className=" link-info btn">Back to Home</button>
      </Link>
    </div>
  );
}
