import { gql } from "@apollo/client";

export const INSERT_ONE_USER = gql`
mutation insertOneUser($firebaseUserid: String = "", $name: String = "") {
  insert_users_one(object: {firebaseUserid: $firebaseUserid, name: $name}) {
    firebaseUserid
    name
  }
}
`