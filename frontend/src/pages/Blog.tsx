
import FullBlog from '../components/FullBlog';
import { useBlog } from '../hooks'


// here you can use the atomFamilies/SelectorsFamilies Perfect use
function Blog() {

  const {loading,blog,error} = useBlog();

  if(loading){
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      <FullBlog />
    </div>
  )
}

export default Blog