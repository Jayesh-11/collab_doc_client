import { Button } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { setRightDrawerVisible } from "../../../redux/slices/homepage/homepage.slice"
import SettingsIcon from '@mui/icons-material/Settings';
import KitesurfingIcon from '@mui/icons-material/Kitesurfing';
import styles from "./TopNav.module.css"
import { useSocket } from "../../../socket/Socket";
import { useAuth } from "../../../auth/Auth";

const TopNav = () => {
  const dispatch = useAppDispatch()
  const { logOut } = useAuth()
  const { clientSocket } = useSocket()
  const currentRoomId = useAppSelector(state => state.chat.roomId)
  const rightDrawerVisible = useAppSelector(state => state.home.rightDrawerVisible)

  const onSettingsButtonClick = () => {
    dispatch(setRightDrawerVisible(!rightDrawerVisible))
    currentRoomId && clientSocket && clientSocket.emit('join_workspace', { roomId: currentRoomId })
  }

  return (
    <div className={styles.primaryContainer}>
      <Button>
        <KitesurfingIcon onClick={logOut} />
      </Button>
      <Button onClick={onSettingsButtonClick}>
        <SettingsIcon />
      </Button>
    </div>
  )
}

export default TopNav