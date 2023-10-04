import NavBar from "./navBar/NavBar"
import RightDrawerHomePage from "./rightDrawerHomePage/RightDrawerHomePage"
import HeroSpace from "./heroSpace/HeroSpace"
import TopNav from "./topNav/TopNav"
import useAppInitiatorData from "../../hooks/useAppInitiatorData"

const HomePage = () => {
  const { appInitiatorLoading } = useAppInitiatorData()

  return (
    <div>
      <TopNav />
      <RightDrawerHomePage />
      <HeroSpace />
      <NavBar />
    </div>
  )
}

export default HomePage