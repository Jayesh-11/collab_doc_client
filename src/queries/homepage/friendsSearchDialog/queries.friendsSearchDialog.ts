import { gql } from "@apollo/client";


export const GET_PEOPLE_LIST = gql`
query getAllUsers($_neq: String = "") {
  users(where: {firebaseUserid: {_neq: $_neq}}) {
    firebaseUserid
    name
  }
}
`