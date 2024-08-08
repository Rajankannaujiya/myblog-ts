import { Quote } from "../components/Quote"
import SigninComp from "../components/SigninComp"



function Signin() {
  return (
   <div>
    <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
            <SigninComp />
        </div>
        <div className="hidden lg:block">
            <Quote />
        </div>
    </div>
</div>
  )
}

export default Signin