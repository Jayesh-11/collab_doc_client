import { Button } from "@mui/material"
import { useAppSelector } from "../../../redux/hooks"
import { FriendsList } from "../../../redux/slices/homepage/homepage.slice"
import styles from "./HeroSpace.module.css"
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const HeroSpace = () => {
  const friendsList = useAppSelector(state => state.home.friendsList)
  return (
    <div className={styles.primaryBox}>
      <div className={styles.friendsListSection}>
        <div className={styles.friendListDisplay}>
          {friendsList.map((friendData: FriendsList) => {
            return <Button key={friendData.friendFirebaseUserId}>{friendData.name}</Button>
          })}
        </div>
        <Button className={styles.addFriendSection}>
          <PersonAddIcon />
        </Button>
      </div>
      <div className={styles.editingSection}>

      </div>
    </div>
  )
}

export default HeroSpace