import React from "react";
import { Popover, PopoverContent ,PopoverTrigger} from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const {user} = useSelector(store=>store.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const logoutHandler=async()=>{
      try {
        const res=await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});
        if(res.data.success){
          dispatch(setUser(null));
          navigate("/");
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
  }
  return (
    <div className="bg-[#4682B4]">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Job<span className="text-black">ify</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-centre gap-5 text-white">
            {
              user && user.role === 'recruiter' ? (
                <>
                  <li><Link to="/admin/companies">Companies</Link></li>
                  <li><Link to="/admin/jobs">Jobs</Link></li>
                </>
              ) : (
                <>
                   <li><Link to="/">Home</Link></li>
                   <li><Link to="/jobs">Jobs</Link></li>
                   <li><Link to="/browse">Browse</Link></li>
                </>
              )
            }   
          </ul>
          {
            !user ? (
              <div className="flex items-center gap-2">
                <Link to="/login"> <Button variant="outline">Login</Button></Link>
                <Link to="/signup"> <Button>Sign Up</Button></Link>
              </div>
            ) : (
          <Popover>
            <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div>
                <div className="flex gap-2 space-y-2">
                 <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                </Avatar>
                <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                </div>
                </div>
                <div className="flex flex-col text-gray-600 my-2">
                  {
                    user && user.role === 'student' && (
                         <div className="flex w-fit items-center gap-2 cursor-pointer">
                              <User2 />
                              <Button variant="link" className="h-auto focus-visible:ring-0 focus-visible:ring-offset-0"><Link to="/profile">Profile</Link></Button>
                         </div>
                    )
                  }
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                     <Button onClick={logoutHandler} variant="link">LogOut</Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
            )
          }

        </div>
      </div>
    </div>
  );
};

export default Navbar;
