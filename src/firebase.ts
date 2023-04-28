import { initializeApp } from 'firebase/app'
import { GithubAuthProvider, getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAcxXPMCR8qMJA5WruBzSJ2jn8bq8Ei21Y',
  authDomain: 'qagpt-384709.firebaseapp.com',
  projectId: 'qagpt-384709',
  storageBucket: 'qagpt-384709.appspot.com',
  messagingSenderId: '695100102216',
  appId: '1:695100102216:web:a74a5ec35fdcb35f8dea7d',
  measurementId: 'G-M8K7F5RKM1',
}

initializeApp(firebaseConfig)

export const auth = getAuth()
export const githubProvider = new GithubAuthProvider()
