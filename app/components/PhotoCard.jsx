import { Link } from "@remix-run/react";
import UserAvatar from "./UserAvatar";

export default function PhotoCard({ photo }) {
    return (
        <Link to={`/photos/${photo.id}`}>
            <article className="photo-card">
                <UserAvatar uid={photo.uid} />
                <img src={photo.image} alt={photo.caption} />
                <h3>{photo.caption}</h3>
            </article>
        </Link>
    );
}
