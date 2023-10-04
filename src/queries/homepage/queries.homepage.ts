import { gql } from "@apollo/client";

export const GET_USER_FRIENDS_LIST = gql`

query getUserFriendsList($firebaseUserid: String = "") {
  users_by_pk(firebaseUserid: $firebaseUserid) {
    firebaseUserid
    name
    userFriends {
      id
      hostFirebaseUserId
      guestFirebaseId
      friendRoomId
      userByGuestfirebaseid {
        name
        firebaseUserid
      }
    }
  }
}

`
