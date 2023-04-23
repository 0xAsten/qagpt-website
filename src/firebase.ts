import { initializeApp } from 'firebase/app'
import { GithubAuthProvider, getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCjUMTry1l0cmdzualM5TSVjKrURCYCIQI',
  authDomain: 'milvus-testing-nonprod-384210.firebaseapp.com',
  projectId: 'milvus-testing-nonprod-384210',
  storageBucket: 'milvus-testing-nonprod-384210.appspot.com',
  messagingSenderId: '833170680897',
  appId: '1:833170680897:web:2394c6e96d462cf79ceac0',
  measurementId: 'G-C433M6LXC0',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth()
export const githubProvider = new GithubAuthProvider()
