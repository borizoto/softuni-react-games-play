import GameCatalogItem from "./game-catalog-item/GameCatalogItem";
import { useGames } from "../../api/gamesApi";

export default function GamesCatalog() {

    const { games, error } = useGames();

    return (
        <section id="catalog-page">
            <h1>All Games</h1>

            {/* Show error message if there was an error */}
            {error && <p className="error">{error}</p>}

            {/* Display div: with information about every game (if any) */}
            {!error && (
                games.length > 0
                    ? games.map(game => <GameCatalogItem key={game._id} {...game} />)
                    : <h3 className="no-articles">No articles yet</h3>
            )}
        </section>
    );
}