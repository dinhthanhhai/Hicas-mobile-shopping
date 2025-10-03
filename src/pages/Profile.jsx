import { getUserProfileThunk } from "../redux/features/user/userThunk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, isLogined } = useSelector((state) => state.user);

  const getUserProfile = async () => {
    dispatch(getUserProfileThunk());
  };

  useEffect(() => {
    if (!isLogined) {
      toast.error("Vui lòng đăng nhập!");
      navigate("/login");
    } else if (!profile || profile == null) {
      getUserProfile();
    }
  }, []);

  return (
    <div className="bg-white p-5">
      <h1 className="text-2xl font-semibold">My Profile</h1>
      <div className="p-8">
        <div className="flex xs:flex-row flex-col gap-8 items-center">
          <div className="flex-shrink-0 w-32">
            <img src={profile?.image} className="w-32 h-32 rounded-full" />
          </div>
          <div className="flex flex-col gap-5">
            <span className="flex gap-1 font-semibold text-3xl">
              {profile?.gender === "female" ? "Ms." : "Mr."}
              {profile?.firstName}
            </span>
            <span className="text-xl break-all">Email: {profile?.email}</span>
          </div>
        </div>
        <div className="w-full mt-5 flex flex-col gap-5">
          <div className="flex gap-5">
            <span className="w-1/4">Date of birth:</span>
            <div className="flex-1 flex gap-2 items-center">
              <span>{profile?.birthDate}</span>
              <CalendarDays className="w-6 h-6 text-slate-600" />
            </div>
          </div>
          <div className="flex gap-5">
            <span className="w-1/4">Sex:</span>
            <select defaultValue={profile?.gender}>
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
            </select>
          </div>
          <div className="flex gap-5">
            <span className="w-1/4">Address Company:</span>
            <p className="underline underline-offset-2">{`${profile?.company?.address?.address}, ${profile?.company?.address?.city}`}</p>
          </div>
          <div className="flex gap-5">
            <span className="w-1/4">Address Home:</span>
            <p className="underline underline-offset-2">{`${profile?.address?.address}, ${profile?.address?.city}`}</p>
          </div>
          <button className="px-3 py-1 border rounded-md m-auto mt-5">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
