import Appbar from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import BlogSkeletton from "../components/BlogSkeletton";
import useBlogs from "../hooks";

function Blogs() {

  const {loading,blogs,error} = useBlogs();
  console.log("this is blog",blogs)

  if(loading){
    return(
      <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="max-w-xl">
        <BlogSkeletton />
        <BlogSkeletton />
        <BlogSkeletton />
        <BlogSkeletton />
        <BlogSkeletton />
        <BlogSkeletton />

        </div>
      </div>
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
            <BlogCard key={post.id.toString()}
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
