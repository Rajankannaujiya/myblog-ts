import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import Appbar from "../components/Appbar"
import Input from "../components/Input"
import { ChangeEvent, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"


function Publish() {

    const navigate =useNavigate()

    const [title,setTitle] =useState('');
    const [content,setContent]=useState('');
    const [isClick, setisClick] =useState(false)

  return (
    <div >
        <div>
            <Appbar />
        </div>
    <div className="flex justify-center pt-4">
        <div className="max-w-screen-lg w-full">
       <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
           <div className="px-4 py-2 bg-white rounded-b-lg">

               
               <div className="p-3 m-2">
               <Input label="Title" placeholder="Enter the title" type="text" onChange={(e)=>{
                setTitle(e.target.value)
               }} />
               </div>

               <div className="p-1 m-2">
                <TextArea label="Content" onChange={(e)=>{
                    setContent(e.target.value)
                }} />
               </div>

           </div>
           </div>
              <Button type="submit" buttonFor="Publish" colour="green" onClick={async()=>{
              try {
                setisClick(true);
                  const res= await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                      title,
                      content
                  },
                  {
                    headers:{
                        Authorization:localStorage.getItem("token")
                    }
                  }
                )

                  if(res){
                    navigate('/blogs');

                  }
            
              } catch (error) {
                console.log("an error has been occured while publishing");
                navigate('/publish')
              }
              finally{
                setisClick(false)
              }
       }} isClicked={isClick}/>
       </div>

    
    </div>
    </div>
  )
}

export default Publish

interface TextAreaProps {
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    label: string;
}

function TextArea({onChange,label}:TextAreaProps){
    return(
        <div>

<label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>

<textarea onChange={onChange} rows={8} className="block w-full px-0 text-sm text-gray-800 bg-white border border-gray-300 " placeholder="Write an blog..." required ></textarea>
        </div>
    )
}