import { GoogleAuthProvider, User, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { auth } from "./firebase";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_BY_PK } from "../queries/auth/queries.auth";
import { INSERT_ONE_USER } from "../mutations/auth/mutations.auth";

type DbUserDataType = {
  firebaseUserid: string,
  name: string
}

type FireBaseAuthContextType = {
  fbUser: User | null,
  authLoading: boolean,
  login: () => void,
  logOut: () => void,
  dbUserData: DbUserDataType | null
};

export const FireBaseAuthContext = createContext<FireBaseAuthContextType>({ fbUser: null, authLoading: true, login: () => { }, logOut: () => { }, dbUserData: null })

const Auth = ({ children }: { children: ReactNode }) => {

  const [fbUser, setFbUser] = useState<User | null>(null);//fix type
  const [authLoading, setAuthLoading] = useState<boolean>(true)
  const [dbUserData, setDbUserData] = useState<DbUserDataType | null>(null)
  const [insertOneUser] = useMutation(INSERT_ONE_USER)

  const authStateCallBack = (fbUser: any) => {
    if (fbUser) {
      setFbUser(fbUser)
    }
  }

  useQuery(GET_USER_BY_PK, {//needs better execution this is bad
    skip: !fbUser?.uid,
    variables: {
      firebaseUserid: fbUser?.uid
    },
    onCompleted: (data) => {

      if (fbUser?.uid) {
        if (data.users_by_pk) {
          setDbUserData(data.users_by_pk)
          setAuthLoading(false)
        } else {
          insertOneUser({
            variables: {
              firebaseUserid: fbUser?.uid,
              name: fbUser?.displayName
            }
          }).then((res) => {
            setDbUserData(res.data.insert_users_one)
            setAuthLoading(false)
          })
        }
      }

    }
  })

  const login = async () => {//fix type
    const auth = getAuth();
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken;
        // const user = result.user;
      }).catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // const email = error.customData.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error)
      });
  }

  const logOut = async () => {
    const auth = getAuth();
    await signOut(auth).then(() => {
      setFbUser(null)
    }).catch((error) => {
      console.log(error)
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, authStateCallBack)
  }, [])
  return (
    <FireBaseAuthContext.Provider value={{ fbUser, authLoading, login, logOut, dbUserData }}>
      {children}
    </FireBaseAuthContext.Provider>
  )
}
export const useAuth = () => {
  return useContext(FireBaseAuthContext)
}
export default Auth