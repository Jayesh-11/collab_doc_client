import { useNavigate } from "react-router-dom"
import { useAuth } from "./Auth"
import LoadingLogin from "../components/loaders/LoadingLogin"
import HomePage from "../components/homePage/HomePage"

const PrivateRoute = () => {
  const { fbUser, authLoading } = useAuth()
  const navigate = useNavigate()
  if (authLoading) {
    return <LoadingLogin />
  }
  if (!fbUser) {
    navigate("/login")
  }
  return <HomePage />
}

export default PrivateRoute