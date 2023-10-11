import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { UsersListItem } from '../../Homepage.types';
import styles from './FriendListItem.module.css'
import { Button } from '@mui/material';
import { pending } from '../../../../constants/constants';
import { useMutation } from '@apollo/client';
import { DELETE_ROOM_BETWEEN_TWO_USERS, DELETE_SENT_FRIEND_REQUEST, INSERT_FRIEND_REQUEST_FROM_HOST, REMOVE_FRIENDSHIP_BETWEEN_TWO_USERS } from '../../../../mutations/homepage/friendListItem/mutations.friendListItem';
import { useAuth } from '../../../../auth/Auth';

const FriendListItem = ({ user, refetchUserList }: { user: UsersListItem, refetchUserList: any }) => {
  const { fbUser } = useAuth()
  const [removeSentRequest, { loading: removingRequest }] = useMutation(DELETE_SENT_FRIEND_REQUEST)
  const [removeFriend, { loading: removingFriend }] = useMutation(REMOVE_FRIENDSHIP_BETWEEN_TWO_USERS)
  const [removeRoom, { loading: removingRoom }] = useMutation(DELETE_ROOM_BETWEEN_TWO_USERS)
  const [addFriendRequest, { loading: addingFriendRequest }] = useMutation(INSERT_FRIEND_REQUEST_FROM_HOST)
  const friendButtonHandler = async (isFriend: boolean | 'pending') => {
    if (isFriend === 'pending') {
      await removeSentRequest({
        variables: {
          id: user.requestId
        }
      })
      await refetchUserList({
        _neq: fbUser?.uid,
        _eq: fbUser?.uid
      })
    } else if (isFriend === true) {
      await removeRoom({
        variables: {
          hostUserId: fbUser?.uid,
          guestUserId: user.firebaseUserid,
        }
      })
      await removeFriend({
        variables: {
          hostUserId: fbUser?.uid,
          guestUserId: user.firebaseUserid,
        }
      })
      await refetchUserList({
        _neq: fbUser?.uid,
        _eq: fbUser?.uid
      })
    } else {
      await addFriendRequest({
        variables: {
          receiverUser: user.firebaseUserid,
          senderUser: fbUser?.uid
        }
      })

      await refetchUserList({
        _neq: fbUser?.uid,
        _eq: fbUser?.uid
      })
    }
  }
  return <div className={styles.listItemBox}>
    <p className={styles.listItemText}>{user.name}</p>
    <Button disabled={removingRequest || removingFriend || removingRoom || addingFriendRequest} className={styles.listItemButton} onClick={() => friendButtonHandler(user.isFriend)}> {user.isFriend === pending ? <MarkEmailReadIcon /> : user.isFriend === true ? <CheckIcon /> : <AddIcon />}</Button>
  </div>
}

export default FriendListItem