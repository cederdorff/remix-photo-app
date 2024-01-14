import UserAvatar from "./UserAvatar";
import { useNavigate } from "@remix-run/react";

export default function PhotoCard({ photo }) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/photos/${photo.id}`);
    }

    return (
        <article onClick={handleClick}>
            <UserAvatar uid={photo.uid} />
            <img src={photo.image} alt={photo.caption} />
            <h3>{photo.caption}</h3>
        </article>
    );
}
