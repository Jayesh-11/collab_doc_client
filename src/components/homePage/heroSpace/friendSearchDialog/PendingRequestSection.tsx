import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import { GET_PENDING_REQUESTS } from "../../../../queries/homepage/friendsSearchDialog/queries.friendsSearchDialog"
import { useAuth } from "../../../../auth/Auth"
import { Button, CircularProgress } from "@mui/material"
import styles from "./PendingRequestSection.module.css"
import { DELETE_PENDING_REQUEST, DELETE_PENDING_REQUEST_AND_INSERT_NEW_ROOM, INSERTING_USER_FRIEND } from "../../../../mutations/homepage/friendListItem/mutations.friendListItem"

interface pendingRequest {
  id: string,
  receiverUser: string,
  senderUser: string,
  user: {
    name: string
  }
}

interface pendingUserData {
  requestId: string,
  receiverUser: string,
  senderUser: string,
  userName: string
}

const PendingRequestSection = ({ refetchUserList }: { refetchUserList: any }) => {
  const { fbUser } = useAuth()
  const [gettingPendingList, setGettingPendingList] = useState(true)
  const [pendingListOfUsers, setPendingListOfUsers] = useState([])
  const [removeRequestId, { loading: removingPendingRequest }] = useMutation(DELETE_PENDING_REQUEST)
  const [removeRequestIdAndInsertNewRoom, { loading: removingRequestIdAndInsertingNewRoom }] = useMutation(DELETE_PENDING_REQUEST_AND_INSERT_NEW_ROOM)
  const [insertUserFriend, { loading: insertingUserFriend }] = useMutation(INSERTING_USER_FRIEND)
  useQuery(GET_PENDING_REQUESTS, {
    variables: {
      _eq: fbUser?.uid
    },
    onCompleted: (data) => {
      setPendingListOfUsers(data.friendRequestTable.map((request: pendingRequest) => {
        return {
          requestId: request.id,
          receiverUser: request.receiverUser,
          senderUser: request.senderUser,
          userName: request.user.name
        }
      }))
      setGettingPendingList(false)
    },
    onError: (err) => {
      console.log(err)
      setGettingPendingList(false)
    }
  })

  const pendingRequestDeleteHandler = async (requestId: string) => {
    await removeRequestId({
      variables: {
        id: requestId
      }
    })
    await refetchUserList({
      _neq: fbUser?.uid,
      _eq: fbUser?.uid
    })
  }

  const pendingRequestAcceptHandler = async (user: pendingUserData) => {
    const roomDataRes = await removeRequestIdAndInsertNewRoom({
      variables: {
        id: user.requestId,
        metadata: {}
      }
    })

    await insertUserFriend({
      variables: {
        objects: [{
          friendRoomId: roomDataRes.data.insert_rooms_one.id,
          guestFirebaseId: user.receiverUser,
          hostFirebaseUserId: user.senderUser,
        }, {
          friendRoomId: roomDataRes.data.insert_rooms_one.id,
          guestFirebaseId: user.senderUser,
          hostFirebaseUserId: user.receiverUser,
        }]
      }
    })

    await refetchUserList({
      _neq: fbUser?.uid,
      _eq: fbUser?.uid
    })
  }

  return (
    <div>
      {gettingPendingList ? <CircularProgress /> : pendingListOfUsers.map((user: pendingUserData) => {
        return (
          <div className={styles.requestsListItem}>
            <div className={styles.userNameTextBox}>
              {user.userName}
            </div>
            {removingPendingRequest || removingRequestIdAndInsertingNewRoom || insertingUserFriend ? <CircularProgress /> : <div className={styles.requestActionButtons}>
              <Button variant="contained" onClick={() => pendingRequestAcceptHandler(user)}>
                Accept
              </Button>
              <Button variant="outlined" onClick={() => pendingRequestDeleteHandler(user.requestId)}>
                Reject
              </Button>
            </div>}
          </div>
        )
      })}
    </div>
  )
}

export default PendingRequestSection