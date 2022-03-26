import { ref, get, child, onValue } from "firebase/database";

export async function createListenersOnLogs(db,setLogs) {
    await onValue(ref(db, '/logs/'), (snapshot) => {
        setLogs(snapshot.val());
    })
}



