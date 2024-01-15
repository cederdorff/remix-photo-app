import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";

export const meta = () => {
    return [{ title: "Remix Photo App - Add New Photo" }];
};
export default function AddPhoto() {
    const [image, setImage] = useState("");

    return (
        <div className="page">
            <h1>Add a Photo</h1>
            <Form id="contact-form" method="post">
                <p>
                    <span>Caption</span>
                    <input name="caption" type="text" aria-label="caption" placeholder="Write a caption..." />
                </p>
                <label>
                    <span>Image URL</span>
                    <input name="image" type="url" onChange={e => setImage(e.target.value)} />
                    {image && <img className="image-preview" src={image} alt="Choose" />}
                </label>
                <p>
                    <button type="submit">Save</button>
                    <button type="button">Cancel</button>
                </p>
            </Form>
        </div>
    );
}

export async function action({ request }) {
    const formData = await request.formData();
    const photo = Object.fromEntries(formData);

    console.log("photo:", photo);

    const photoObj = {
        fields: {
            caption: { stringValue: photo.caption },
            image: { stringValue: photo.image },
            uid: { stringValue: "IwlCsBmACaF4HOQCKdUB" }
        }
    };

    const url = "https://firestore.googleapis.com/v1/projects/race-photo-app/databases/(default)/documents/photos";
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(photoObj)
    });

    if (response.ok) {
        return redirect("/photos");
    }
}
