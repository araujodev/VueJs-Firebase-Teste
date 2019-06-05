import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyCqhhfBNGjVEClTkztfC2ls20P2Fl_5Lwo',
  authDomain: 'vuejstest-e6068.firebaseapp.com',
  databaseURL: 'https://vuejstest-e6068.firebaseio.com',
  projectId: 'vuejstest-e6068',
  storageBucket: 'vuejstest-e6068.appspot.com',
  messagingSenderId: '710509129372',
  appId: '1:710509129372:web:53430b1b9d896e88'
}
const firebaseapp = firebase.initializeApp(config)
export default firebaseapp.firestore()
