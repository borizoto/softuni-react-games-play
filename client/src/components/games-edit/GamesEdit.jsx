import { Navigate, useNavigate, useParams } from "react-router";
import { useEditGame, useGame } from "../../api/gamesApi";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function GamesEdit() {
    const { gameId } = useParams();
    const { editGame } = useEditGame();
    const { _id } = useContext(UserContext);
    const navigate = useNavigate();
    const { game } = useGame(gameId)

    const editGameAction = async (formData) => {
        const gameData = Object.fromEntries(formData);

        await editGame(gameId, { ...gameData, _id: gameId });

        navigate(`/games/${gameId}/details`);
    }

    const isOwner = _id === game._ownerId;

    if (!isOwner) {
        return <Navigate to='/games' />
    }

    return (
        <section id="edit-page" className="auth">
            <form id="edit" action={editGameAction}>
                <div className="container">
                    <h1>Edit Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" defaultValue={game.title} />
                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" defaultValue={game.category} />
                    <label htmlFor="levels">MaxLevel:</label>
                    <input
                        type="number"
                        id="maxLevel"
                        name="maxLevel"
                        min={1}
                        defaultValue={game.maxLevel}
                    />
                    <label htmlFor="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" defaultValue={game.imageUrl} />
                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" defaultValue={game.summary} />
                    <input className="btn submit" type="submit" defaultValue="Edit Game" />
                </div>
            </form>
        </section>
    );
}