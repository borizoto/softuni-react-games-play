import { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router'

import CommentsDetails from '../comments-details/CommentsDetails';
import CommentsCreate from '../comments-create/CommentsCreate';
import { getAll } from '../../services/commentService';
import { UserContext } from '../../contexts/UserContext';
import { useDeleteGame, useGame } from '../../api/gamesApi';

export default function GamesDetails() {
    const navigate = useNavigate();
    const { gameId } = useParams();
    const { email, _id } = useContext(UserContext)
    const { game } = useGame(gameId);
    const [comments, setComments] = useState([]);
    const { deleteGame } = useDeleteGame();

    useEffect(() => {
        getAll(gameId)
            .then(setComments)
    }, [])

    const deleteClickHandler = async () => {
        const isConfirmed = confirm(`Are you sure you want to delete "${game.title}" game?`);

        if (!isConfirmed) {
            return;
        }

        await deleteGame(gameId);

        navigate('/games');
    }

    const isOwner = _id === game._ownerId;

    return (
        <section id="game-details">

            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>
                <p className="text">{game.summary}</p>

                {/* Bonus ( for Guests and Users ) */}
                <CommentsDetails comments={comments} />

                {/* Edit/Delete buttons ( Only for creator of this game )  */}
                {isOwner && (
                    <div className="buttons">
                        <Link to={`/games/${gameId}/edit`} className="button">
                            Edit
                        </Link>
                        <a onClick={deleteClickHandler} className="button">
                            Delete
                        </a>
                    </div>
                )}

            </div>

            {/* Bonus */}
            {/* Add Comment ( Only for logged-in users, which is not creators of the current game ) */}
            {email && <CommentsCreate email={email} setComments={setComments} />}

        </section>
    );
}