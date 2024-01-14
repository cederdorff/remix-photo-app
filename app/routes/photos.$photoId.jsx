import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { mapFirebaseDocument } from "../helpers/firebaseDataMapper";

export const meta = () => {
    return [{ title: "Remix Photo App" }];
};

export async function loader({ params }) {
    const response = await fetch(
        `https://firestore.googleapis.com/v1/projects/race-photo-app/databases/(default)/documents/photos/${params.photoId}`
    );
    const docs = await response.json();
    const photo = mapFirebaseDocument(docs);
    return json({ photo });
}

export default function Photo() {
    const { photo } = useLoaderData();
    console.log(photo);
    return (
        <div className="page">
            <h1>Photo Placeholder page</h1>
            <p>Photo id: {photo.id}</p>
            <p>Photo caption: {photo.caption}</p>
            <img src={photo.image} alt={photo.caption} />
        </div>
    );
}
