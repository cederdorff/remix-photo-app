import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { mapFirebaseDocument } from "../helpers/firebaseDataMapper";

export function meta() {
    return [
        {
            title: "Remix Photo App - Update"
        }
    ];
}

export async function loader({ params }) {
    const response = await fetch(
        `https://firestore.googleapis.com/v1/projects/race-photo-app/databases/(default)/documents/photos/${params.photoId}`
    );
    const docs = await response.json();
    const photo = mapFirebaseDocument(docs);
    return json({ photo });
}

export default function UpdatePhoto() {
    const { photo } = useLoaderData();
    return (
        <div className="page">
            <h1>Update: {photo.caption}</h1>
            <img src={photo.image} alt={photo.caption} />
        </div>
    );
}
