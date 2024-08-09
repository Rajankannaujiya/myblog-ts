import Appbar from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import useBlogs from "../hooks";

function Blogs() {

  const {loading,blogs,error} = useBlogs();

  if(loading){
    return(
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="max-w-xl">
          {blogs?
          blogs.map(post=>
            <BlogCard 
            id={post.id.toString()}
            authorName={post.author.username}
            title={post.title}
            content={post.content}
            publishedDate={post.publishedDate}
            />)
           : <div className="max-w-xl">{error}</div>
        }
      
      </div>
      </div>
    </div>
  );
}

export default Blogs;
