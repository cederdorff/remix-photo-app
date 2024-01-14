import { useEffect, useState } from "react";
import { mapFirebaseDocument } from "../helpers/firebaseDataMapper";

export default function UserAvatar({ uid }) {
    const [user, setUser] = useState({});
    useEffect(() => {
        async function getUser() {
            const url = `https://firestore.googleapis.com/v1/projects/race-photo-app/databases/(default)/documents/users/${uid}`;
            const response = await fetch(url);
            const userDoc = await response.json();

            setUser(mapFirebaseDocument(userDoc));
        }
        getUser();
    }, [uid]);

    return (
        <div className="avatar">
            <img src={user.image} alt={user.name} />
            <span>
                <h3>{user.name}</h3>
                <p>{user.title}</p>
            </span>
        </div>
    );
}
