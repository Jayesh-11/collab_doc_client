import { Button, Dialog } from '@mui/material'
import styles from "./FriendSearchDialog.module.css"
import { useQuery } from '@apollo/client'
import { GET_PEOPLE_LIST } from '../../../../queries/homepage/friendsSearchDialog/queries.friendsSearchDialog'
import { useMemo, useState } from 'react'
import { useAppSelector } from '../../../../redux/hooks'
import { FriendsList } from '../../../../redux/slices/homepage/homepage.slice'
import { useAuth } from '../../../../auth/Auth'
import Fuse from 'fuse.js'

interface UsersList {
  isFriend: boolean,
  firebaseUserid: string,
  name: string
}
const FriendSearchDialog = ({ findFriendDialogState, setFindFriendDialogState }: { findFriendDialogState: boolean, setFindFriendDialogState: any }) => {
  const { fbUser } = useAuth()
  const [usersList, setUsersList] = useState<Array<UsersList>>([])
  const [filteredUsersList, setFilteredUsersList] = useState<Array<UsersList>>([])
  const friendsList = useAppSelector(state => state.home.friendsList)
  const options = {
    includeScore: true,
    includeMatches: true,
    threshold: 0.2,
    keys: ["isFriend", "firebaseUserid", "name"],
  }
  const fuse = useMemo(() => {
    if (usersList.length) {
      return new Fuse(usersList, options);
    }
  }, [usersList])

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

  const handleSearch = (e: any) => {
    if (e.target.value.length === 0) {
      setFilteredUsersList(usersList);
      return;
    }

    const results = fuse?.search(e.target.value);
    const items = results?.map((result) => result.item);
    setFilteredUsersList(items ?? []);
  };

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
      <input
        type="text"
        placeholder="Search by name or email"
        onChange={handleSearch}
      />
      <div>
        {filteredUsersList.map((user) => {
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