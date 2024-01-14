export const meta = () => {
    return [{ title: "Remix Photo App - Add New Photo" }];
};
export default function AddPhoto() {
    return (
        <div className="page">
            <h1>Add a Photo</h1>
            <p>
                This is a simple photo app built with <a href="https://remix.run">Remix</a>.
            </p>
        </div>
    );
}
