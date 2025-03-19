import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router'

import { deleteGame, getOne } from '../../services/gameService';
import CommentsDetails from '../comments-details/CommentsDetails';
import CommentsCreate from '../comments-create/CommentsCreate';
import { getAll } from '../../services/commentService';

export default function GamesDetails({
    email
}) {
    const { gameId } = useParams();
    const navigate = useNavigate();

    const [game, setGame] = useState({})
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getOne(gameId)
        .then(setGame)

        getAll()
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
                <CommentsDetails comments={comments}/> 

                {/* Edit/Delete buttons ( Only for creator of this game )  */}
                <div className="buttons">
                    <Link to={`/games/${gameId}/edit`} className="button">
                        Edit
                    </Link>
                    <a onClick={deleteClickHandler} className="button">
                        Delete
                    </a>
                </div>
            </div>

            {/* Bonus */}
            {/* Add Comment ( Only for logged-in users, which is not creators of the current game ) */}
            {email && <CommentsCreate email={email} setComments={setComments} />}

        </section>
    );
}