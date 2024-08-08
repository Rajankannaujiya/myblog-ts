import { Quote } from "../components/Quote"
import SignupComp from "../components/SignupComp"


function Signup() {
  return (
   <div>
    <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
            <SignupComp/>
        </div>
        <div className="hidden lg:block">
            <Quote />
        </div>
    </div>
</div>
  )
}

export default Signup