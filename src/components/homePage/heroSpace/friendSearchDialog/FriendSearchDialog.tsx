import { Box, Dialog, Tab, Tabs, TextField } from '@mui/material'
import styles from "./FriendSearchDialog.module.css"
import { useQuery } from '@apollo/client'
import { GET_PEOPLE_LIST } from '../../../../queries/homepage/friendsSearchDialog/queries.friendsSearchDialog'
import { useCallback, useMemo, useState } from 'react'
import { useAppSelector } from '../../../../redux/hooks'
import { FriendsList } from '../../../../redux/slices/homepage/homepage.slice'
import { useAuth } from '../../../../auth/Auth'
import Fuse from 'fuse.js'
import { pending } from '../../../../constants/constants'
import { RequestReceiverPending, UsersListItem } from '../../Homepage.types'
import FriendListItem from './FriendListItem'
import PendingRequestSection from './PendingRequestSection'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}


function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}


const FriendSearchDialog = ({ findFriendDialogState, setFindFriendDialogState }: { findFriendDialogState: boolean, setFindFriendDialogState: any }) => {
  const { fbUser } = useAuth()
  const [usersList, setUsersList] = useState<Array<UsersListItem>>([])
  const [filteredUsersList, setFilteredUsersList] = useState<Array<UsersListItem>>([])
  const friendsList = useAppSelector(state => state.home.friendsList)
  const [tabIndex, setTabIndex] = useState<number>(0);

  const options = {
    includeScore: true,
    includeMatches: true,
    threshold: 0.2,
    keys: ["isFriend", "firebaseUserid", "name"],
    shouldSort: true
  }
  const fuse = useMemo(() => {
    if (usersList.length) {
      return new Fuse(usersList, options);
    }
  }, [usersList])

  const { refetch: refetchUserList } = useQuery(GET_PEOPLE_LIST, {
    variables: {
      _neq: fbUser?.uid,
      _eq: fbUser?.uid
    },
    onCompleted: (data) => {

      const friendFilteredUsersList = data.users.map((user: UsersListItem) => {
        return {
          isFriend: friendsList.some((friend: FriendsList) => {
            return friend.friendFirebaseUserId === user.firebaseUserid
          }) ? true : data.friendRequestTable.some((friendRequestReceiverData: RequestReceiverPending) => {
            return friendRequestReceiverData.receiverUser === user.firebaseUserid
          }) ? pending : false,
          requestId: data.friendRequestTable.find((friendRequestReceiverData: RequestReceiverPending) => {
            return friendRequestReceiverData.receiverUser === user.firebaseUserid
          })?.id,
          name: user.name,
          firebaseUserid: user.firebaseUserid,
        }
      })

      setUsersList(friendFilteredUsersList)
    }
  })

  const handleSearch = useCallback((e: any) => {
    console.log(filteredUsersList, e.target.value, e.target.value.length)

    if (e.target.value.length === 0) {
      setFilteredUsersList(usersList);
      return;
    }

    const results = fuse?.search(e.target.value);
    const items = results?.map((result) => result.item);
    setFilteredUsersList(items ?? []);
  }, [usersList]);

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Dialog
      open={findFriendDialogState}
      onClose={() => setFindFriendDialogState(false)}
      PaperProps={{
        style: {
          height: '75vh',
          width: '25rem'
        }
      }}
    >
      <Tabs value={tabIndex} onChange={handleChange}>
        <Tab label="Find" {...a11yProps(0)} />
        <Tab label="Pending" {...a11yProps(1)} />
      </Tabs>
      <CustomTabPanel value={tabIndex} index={0}>

        <TextField
          type="text"
          placeholder="Search by name or email"
          onFocus={handleSearch}
          onChange={handleSearch}
        />
        <div>
          {filteredUsersList.map((user) => {
            return <FriendListItem key={user.firebaseUserid} user={user} refetchUserList={refetchUserList} />
          })}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={1}>
        <PendingRequestSection refetchUserList={refetchUserList} />
      </CustomTabPanel>
    </Dialog>
  )
}

export default FriendSearchDialog