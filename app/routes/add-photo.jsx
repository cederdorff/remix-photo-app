import { redirect } from "@remix-run/node";
import { Form, useNavigate } from "@remix-run/react";
import { useState } from "react";

export const meta = () => {
    return [{ title: "Remix Photo App - Add New Photo" }];
};
export default function AddPhoto() {
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    function handleCancel() {
        navigate(-1);
    }

    return (
        <div className="page">
            <h1>Add a Photo</h1>
            <Form id="photo-form" method="post">
                <label htmlFor="caption">Caption</label>
                <input id="caption" name="caption" type="text" aria-label="caption" placeholder="Write a caption..." />

                <label htmlFor="image">Image URL</label>
                <input
                    name="image"
                    type="url"
                    onChange={e => setImage(e.target.value)}
                    placeholder="Paste an image URL..."
                />

                {image && (
                    <>
                        <label htmlFor="image-preview">Image Preview</label>
                        <img id="image-preview" className="image-preview" src={image} alt="Choose" />
                    </>
                )}

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
