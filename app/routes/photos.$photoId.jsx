import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { mapFirebaseDocument } from "../helpers/firebaseDataMapper";

export function meta({ data }) {
    return [
        {
            title: `Remix Photo App - ${data.photo.caption || "Photo"}`
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

export default function Photo() {
    const { photo } = useLoaderData();
    const navigate = useNavigate();

    function handleUpdateClicked() {
        navigate(`/photos/${photo.id}/update`);
    }

    return (
        <div className="page">
            <h1>{photo.caption}</h1>
            <img src={photo.image} alt={photo.caption} />
            <div>
                <button type="button" onClick={handleUpdateClicked}>
                    Update
                </button>
                <button>Delete</button>
            </div>
        </div>
    );
}
