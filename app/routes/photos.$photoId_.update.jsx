import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form, useNavigate } from "@remix-run/react";
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
  const navigate = useNavigate();

  function handleCancel() {
    navigate(-1);
  }

  return (
    <div className="page">
      <h1>Update Photo</h1>
      <Form id="photo-form" method="post">
        <label htmlFor="caption">Caption</label>
        <input
          id="caption"
          defaultValue={photo.caption}
          name="caption"
          type="text"
          aria-label="caption"
          placeholder="Write a caption..."
        />
        <label htmlFor="image">Image URL</label>
        <input
          name="image"
          defaultValue={photo.image}
          type="url"
          onChange={e => setImage(e.target.value)}
          placeholder="Paste an image URL..."
        />

        <label htmlFor="image-preview">Image Preview</label>
        <img
          id="image-preview"
          className="image-preview"
          src={image ? image : "https://placehold.co/600x400?text=Paste+an+image+URL"}
          alt="Choose"
          onError={e => (e.target.src = "https://placehold.co/600x400?text=Error+loading+image")}
        />

        <input name="uid" type="text" defaultValue={photo.uid} hidden />
        <div className="btns">
          <button>Save</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
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
  }
}
