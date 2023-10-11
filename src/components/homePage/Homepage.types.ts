export interface UsersListItem {
  isFriend: boolean | 'pending', //better alternative
  firebaseUserid: string,
  name: string,
  requestId?: string
}

export interface RequestReceiverPending {
  id: string,
  receiverUser: string
}