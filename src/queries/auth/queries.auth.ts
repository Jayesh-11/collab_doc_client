import { gql } from "@apollo/client";

export const GET_USER_BY_PK = gql`
query getUserByPk($firebaseUserid: String = "") {
  users_by_pk(firebaseUserid: $firebaseUserid) {
    firebaseUserid
    name
  }
}
`