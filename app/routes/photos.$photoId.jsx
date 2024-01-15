import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
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

    function confirmDelete(event) {
        const response = confirm("Please confirm you want to delete this photo.");
        if (!response) {
            event.preventDefault();
        }
    }

    return (
        <div className="page">
            <h1>{photo.caption}</h1>
            <img src={photo.image} alt={photo.caption} />
            <div className="btns">
                <Form action="update">
                    <button>Update</button>
                </Form>
                <Form action="destroy" method="post" onSubmit={confirmDelete}>
                    <button>Delete</button>
                </Form>
            </div>
        </div>
    );
}
