import { Button, Dialog } from '@mui/material'
import styles from "./FriendSearchDialog.module.css"
import { useQuery } from '@apollo/client'
import { GET_PEOPLE_LIST } from '../../../../queries/homepage/friendsSearchDialog/queries.friendsSearchDialog'
import { useState } from 'react'
import { useAppSelector } from '../../../../redux/hooks'
import { FriendsList } from '../../../../redux/slices/homepage/homepage.slice'
import { useAuth } from '../../../../auth/Auth'

interface UsersList {
  isFriend: boolean,
  firebaseUserid: string,
  name: string
}
const FriendSearchDialog = ({ findFriendDialogState, setFindFriendDialogState }: { findFriendDialogState: boolean, setFindFriendDialogState: any }) => {
  const { fbUser } = useAuth()
  const [usersList, setUsersList] = useState<Array<UsersList>>([])
  const friendsList = useAppSelector(state => state.home.friendsList)
  useQuery(GET_PEOPLE_LIST, {
    variables: {
      _neq: fbUser?.uid
    },
    onCompleted: (data) => {

      const friendFilteredUsersList = data.users.map((user: UsersList) => {
        return {
          isFriend: friendsList.some((friend: FriendsList) => {
            return friend.friendFirebaseUserId === user.firebaseUserid
          }),
          name: user.name,
          firebaseUserid: user.firebaseUserid,
        }
      })

      setUsersList(friendFilteredUsersList)
    }
  })

  return (
    <Dialog
      open={findFriendDialogState}
      onClose={() => setFindFriendDialogState(false)}
      PaperProps={{
        style: {
          height: '75vh',
          width: '15rem'
        }
      }}
    >
      <div>
        {usersList.map((user) => {
          if (user.isFriend) {
            return <Button key={user.firebaseUserid}>{user.name}</Button>
          }
          return <Button key={user.firebaseUserid}>{user.name}</Button>
        })}
      </div>
    </Dialog>
  )
}

export default FriendSearchDialog