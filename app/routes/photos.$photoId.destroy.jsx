import { redirect } from "@remix-run/node";

export async function action({ params }) {
    const response = await fetch(
        `https://firestore.googleapis.com/v1/projects/race-photo-app/databases/(default)/documents/photos/${params.photoId}`,
        {
            method: "DELETE"
        }
    );
    if (response.ok) {
        return redirect("/photos");
    }
}
