import { useEffect, useState } from "react";

import { getAll } from "../../services/gameService";
import GameCatalogItem from "./game-catalog-item/GameCatalogItem";

export default function GamesCatalog() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        getAll()
        .then(setGames)
    }, [])

    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            {/* Display div: with information about every game (if any) */}
            {games.length > 0
                ? games.map(game => <GameCatalogItem key={game._id} {...game} />)
                : <h3 className="no-articles">No articles yet</h3>
            }
        </section>
    );
}