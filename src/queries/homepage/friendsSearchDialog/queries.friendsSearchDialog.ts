import { gql } from "@apollo/client";


export const GET_PEOPLE_LIST = gql`
query getAllUsers($_neq: String = "", $_eq: String = "") {
  users(where: {firebaseUserid: {_neq: $_neq}}) {
    firebaseUserid
    name
  }
  friendRequestTable(where: {senderUser: {_eq: $_eq}}) {
    id
    receiverUser
    senderUser
  }
}

`

export const GET_PENDING_REQUESTS = gql`
query getPendingRequests($_eq: String = "") {
  friendRequestTable(where: {receiverUser: {_eq: $_eq}}) {
    id
    receiverUser
    senderUser
    user {
      name
    }
  }
}

`