import { gql } from "@apollo/client";

export const DELETE_SENT_FRIEND_REQUEST = gql`
mutation deleteSentFriendRequest($id: uuid = "") {
  delete_friendRequestTable_by_pk(id: $id) {
    id
  }
}
`

export const REMOVE_FRIENDSHIP_BETWEEN_TWO_USERS = gql`
mutation deleteRoomForFriends($hostUserId:String="",$guestUserId:String="") {
  delete_rooms(where: {userFriends: {_and: [{hostFirebaseUserId: {_eq: $hostUserId}}, {guestFirebaseId: {_eq: $guestUserId}}]}}){
    affected_rows
  }
}
`

export const DELETE_ROOM_BETWEEN_TWO_USERS = gql`
mutation deleteRoomForFriends($hostUserId:String="",$guestUserId:String="") {
  delete_rooms(where: {userFriends: {_and: [{hostFirebaseUserId: {_eq: $hostUserId}}, {guestFirebaseId: {_eq: $guestUserId}}]}}){
    affected_rows
  }
}
`

export const INSERT_FRIEND_REQUEST_FROM_HOST = gql`
mutation addFriendRequest($receiverUser: String = "", $senderUser: String = "") {
  insert_friendRequestTable_one(object: {receiverUser: $receiverUser, senderUser: $senderUser}) {
    id
  }
}
`

export const DELETE_PENDING_REQUEST = gql`
mutation deletingPendingRequest($id: uuid = "") {
  delete_friendRequestTable_by_pk(id: $id) {
    id
  }
}
`

export const DELETE_PENDING_REQUEST_AND_INSERT_NEW_ROOM = gql`
mutation removeRequestIdAndInsertNewRoom($id: uuid = "", $metadata: jsonb = "") {
  delete_friendRequestTable_by_pk(id: $id) {
    id
  }
  insert_rooms_one(object: {metadata: $metadata}) {
    id
  }
}
`

export const INSERTING_USER_FRIEND = gql`
mutation insertingUserFriend($objects: [userFriends_insert_input!] = {}) {
    insert_userFriends(objects: $objects) {
      affected_rows
    }
} 
`