import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import Button from "./Button";

function Appbar() {

  return (
    <div className="border-b flex items-center justify-between m-0 px-4 py-4 pt-0 pb-0">
      <div className="flex items-center cursor-pointer">
        <Link to={'/blogs'} className="text-lg font-bold">
          MyBlog
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
      <Link to={'/publish'} className="mb-4">
          <Button type="button" buttonFor="Publish" colour="green"/>
        </Link>
        <Avatar size="big" name="rajan"/>
        
      </div>
    </div>
  );
}

export default Appbar;
