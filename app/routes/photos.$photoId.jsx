import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta = () => {
    return [{ title: "Remix Photo App" }];
};

export async function loader({ params }) {
    console.log(params);
    return json({ photoId: params.photoId });
}

export default function Photo() {
    const { photoId } = useLoaderData();
    console.log(photoId);
    return (
        <div className="page">
            <h1>Photo Placeholder page</h1>
            <p>Photo id: {photoId}</p>
        </div>
    );
}
