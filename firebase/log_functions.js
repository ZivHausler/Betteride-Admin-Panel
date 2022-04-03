import { ref, get, child, onValue } from "firebase/database";

export async function createListenersOnLogs(db,setLogs) {
    await onValue(ref(db, '/logs/'), (snapshot) => {
        setLogs(snapshot.val()[getCurrentDate()]);
    })
}
const getCurrentDate = () => {
    const currentdate = new Date();
    return currentdate.getDate() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getFullYear();
  }


