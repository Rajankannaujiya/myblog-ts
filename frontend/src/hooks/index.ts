import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";


export interface Blog {
  "content": string;
  "title": string;
  "id": number;
  "publishedDate":string;
  "author": {
      "username": string
  }

  
}


export function useBlogs() {

  const [loading, setLoading]= useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] =useState('')

  useEffect(()=>{
    try {
     axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
      headers:{
        Authorization:localStorage.getItem("token")
      }
     }).then(response=>{
      setBlogs(response.data.posts);
      setLoading(false);
     })
    } catch (error) {
      console.log("An error occured while fetching the blogs");
      setError("failed to load Blogs");

    }
  },[])
  return (
    {
      loading,blogs,error
    }
  )
}

export default useBlogs