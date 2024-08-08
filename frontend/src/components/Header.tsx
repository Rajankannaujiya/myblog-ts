import { Link } from "react-router-dom";

interface HeaderProps{
  headerText?:string;
  directto:string;
  linkto:string
}

function Header({headerText,directto,linkto}:HeaderProps) {
  return (
    <div>
      <div className="text-3xl font-extrabold">Create an account</div>
      <div className="text-slate-500">
        {headerText}
        <Link
          className="pl-2 underline"
          to={"/" +linkto}
        >
          {directto}
        </Link>
      </div>
    </div>
  );
}

export default Header;
