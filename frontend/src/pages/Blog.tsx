
import { useParams } from 'react-router-dom';
import {FullBlog} from '../components/FullBlog';
import { useBlog } from '../hooks'
import type { Blog } from '../hooks';

import Appbar from '../components/Appbar';
import FullBlogSkelleton from '../components/FullBlogSkelleton';



// here you can use the atomFamilies/SelectorsFamilies Perfect use
function Blog() {

  const {id} = useParams()

  const {loading,blog} = useBlog({id:id || ""});

  if(loading){
    return (
      <div>
        <Appbar />
      
          <FullBlogSkelleton />
        </div>
       
    )
  }

  return (
    <div>
      <FullBlog blog={blog as Blog} />
    </div>
  )
}

export default Blog