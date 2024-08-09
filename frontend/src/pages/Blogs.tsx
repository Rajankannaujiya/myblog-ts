import Appbar from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import useBlogs from "../hooks";

function Blogs() {

  const {loading,blogs,error} = useBlogs();
  console.log("this is blog",blogs)

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
            pulishedDate={post.pulishedDate}
            />)
           : <div className="max-w-xl">{error}</div>
        }
      
      </div>
      </div>
    </div>
  );
}

export default Blogs;
