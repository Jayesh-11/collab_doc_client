import { Button } from "@mui/material"
import { useAppSelector } from "../../../redux/hooks"
import { FriendsList } from "../../../redux/slices/homepage/homepage.slice"
import styles from "./HeroSpace.module.css"
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useEffect, useState } from "react";
import FriendSearchDialog from "./friendSearchDialog/FriendSearchDialog";

const HeroSpace = () => {
  const friendsList = useAppSelector(state => state.home.friendsList)
  const [findFriendDialogState, setFindFriendDialogState] = useState<boolean>(false)

  useEffect(() => {
    return () => {
      setFindFriendDialogState(false)
    }
  }, [])


  return (
    <div className={styles.primaryBox}>
      <div className={styles.friendsListSection}>
        <div className={styles.friendListDisplay}>
          {friendsList.map((friendData: FriendsList) => {
            return <Button key={friendData.friendFirebaseUserId}>{friendData.name}</Button>
          })}
        </div>
        <Button className={styles.addFriendSection} onClick={() => { setFindFriendDialogState(true) }}>
          <PersonAddIcon />
        </Button>
      </div>
      <div className={styles.editingSection}>

      </div>
      <FriendSearchDialog findFriendDialogState={findFriendDialogState} setFindFriendDialogState={setFindFriendDialogState} />
    </div>
  )
}

export default HeroSpace