import { Button } from '@mui/material'
import styles from './NavBar.module.css'
import HomeIcon from '@mui/icons-material/Home';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

const NavBar = () => {
  return (
    <div className={styles.primaryContainer}>
      <Button>
        <HomeIcon />
      </Button>
      <Button>
        <ChatBubbleIcon />
      </Button>
      <Button>
        <EmojiPeopleIcon />
      </Button>
    </div>
  )
}

export default NavBar