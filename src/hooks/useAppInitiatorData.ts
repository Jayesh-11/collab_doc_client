import { useQuery } from "@apollo/client"
import { useAuth } from "../auth/Auth"
import { GET_USER_FRIENDS_LIST } from "../queries/homepage/queries.homepage"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { setFriendsList } from "../redux/slices/homepage/homepage.slice"

interface RoomDataType {
  id: string,
  hostFirebaseUserId: string,
  guestFirebaseId: string,
  friendRoomId: string,
  userByGuestfirebaseid: {
    name: string,
    firebaseUserid: string,
  }
}



const useAppInitiatorData = () => {
  const { dbUserData } = useAuth()
  const dispatch = useAppDispatch()
  const friendsList = useAppSelector(state => state.home.friendsList)
  const [appInitiatorLoading, setAppInitiatorLoading] = useState<boolean>(true && !!friendsList.length)

  useQuery(GET_USER_FRIENDS_LIST, {
    skip: !dbUserData?.firebaseUserid && !!friendsList.length,
    variables: {
      firebaseUserid: dbUserData?.firebaseUserid
    },
    onCompleted: (data) => {
      const friendsListQL = data.users_by_pk.userFriends.map((roomData: RoomDataType) => {
        return {
          roomId: roomData.friendRoomId,
          name: roomData.userByGuestfirebaseid.name,
          friendFirebaseUserId: roomData.userByGuestfirebaseid.firebaseUserid
        }
      })
      dispatch(setFriendsList(friendsListQL))
      setAppInitiatorLoading(false)
    },
    onError: (err) => {
      console.log(err)
      setAppInitiatorLoading(false)
    }
  })

  return { appInitiatorLoading }
}

export default useAppInitiatorData