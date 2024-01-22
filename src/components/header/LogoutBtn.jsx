import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase/AuthService";
import { toast } from "react-toastify";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout()
    .then( () => {
      toast.success("Logout successfully.");
      dispatch(logout());
      navigate("/signin")

    })
    .catch(error => console.log("error >> logoutButton >> authServiceLogout : ", error))
  }
    return (<>
           <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={handleLogout}
            >
              Logout
            </button>
    </>);
}

export default LogoutBtn;