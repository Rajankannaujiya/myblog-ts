import { Avatar } from "./BlogCard"

function Appbar() {
  return (
    <div className="border-b flex justify-between px-10 py-5">
      <div className="flex flex-col justify-center cursor-pointer">
        MyBlog
      </div>

      <div>
        <Avatar size="big" name="rajan"/>
      </div>
    </div>
  )
}

export default Appbar