import { useNavigate } from 'react-router'
import { useCreateGame } from '../../api/gamesApi';
import { useError } from '../../hooks/useError';

export default function GamesCreate() {
    const navigate = useNavigate();
    const { error, setError } = useError();
    const { create } = useCreateGame();

    const createGameAction = async (formData) => {
        const gameData = Object.fromEntries(formData);

        if (!Object.values(gameData).every(value => !!value)) {
            return setError('All fields must be filled!');
        }

        try {
            await create(gameData);
            navigate('/games');
        } catch (err) {
            console.error("Error creating game:", err.message);
            setError(err.message || "Failed to create game. Please try again.");
        }
    };

    return (
        <section id="create-page" className="auth">
            <form id="create" action={createGameAction}>
                <div className="container">
                    <h1>Create Game</h1>

                    <label htmlFor="leg-title">Legendary title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter game title..."
                    />
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        placeholder="Enter game category..."
                    />
                    <label htmlFor="levels">MaxLevel:</label>
                    <input
                        type="number"
                        id="maxLevel"
                        name="maxLevel"
                        min={1}
                        placeholder={1}
                    />
                    <label htmlFor="game-img">Image:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        placeholder="Upload a photo..."
                    />
                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" defaultValue={""} />
                    <input
                        className="btn submit"
                        type="submit"
                        defaultValue="Create Game"
                    />
                </div>
                {/* Display error message if there is an error */}
                {error && <p className="error">{error}</p>}
            </form>
        </section>
    );
}