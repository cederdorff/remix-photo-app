import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { mapFirebaseDocument } from "../helpers/firebaseDataMapper";
import { useState } from "react";

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
    const [image, setImage] = useState(photo.image);

    return (
        <div className="page">
            <Form method="post">
                <input
                    name="caption"
                    type="text"
                    defaultValue={photo.caption}
                    aria-label="caption"
                    placeholder="Write a caption"
                />
                <input name="uid" type="text" defaultValue={photo.uid} hidden />
                <input name="image" type="url" onChange={e => setImage(e.target.value)} defaultValue={photo.image} />
                <img className="image-preview" src={image} alt="Choose" />
                <button>Update</button>
            </Form>
        </div>
    );
}

export async function action({ request, params }) {
    const formData = await request.formData();
    const photo = Object.fromEntries(formData);
    console.log("params:", params);
    console.log("updates:", photo);

    const photoObj = {
        fields: {
            caption: { stringValue: photo.caption },
            image: { stringValue: photo.image },
            uid: { stringValue: photo.uid }
        }
    };

    const response = await fetch(
        `https://firestore.googleapis.com/v1/projects/race-photo-app/databases/(default)/documents/photos/${params.photoId}`,
        {
            method: "PATCH",
            body: JSON.stringify(photoObj)
        }
    );
    if (response.ok) {
        return redirect(`/photos/${params.photoId}`);
    } else {
        return json({ message: "Something went wrong" }, { status: 500 });
    }
}
