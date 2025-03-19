import { useParams } from "react-router";
import { create } from "../../services/commentService";

export default function CommentsCreate({
    email,
    setComments
}) {
    const {gameId} = useParams();

    const createCommentAction = async (formData) => {
        const { comment } = Object.fromEntries(formData);
        const newComment = await create(comment, gameId, email);

        setComments(comments => [...comments, newComment]);
    }

    return (
        <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form" action={createCommentAction}>
                <textarea
                    name="comment"
                    placeholder="Comment......"
                    defaultValue={""}
                />
                <input
                    className="btn submit"
                    type="submit"
                    defaultValue="Add Comment"
                />
            </form>
        </article>
    );
}