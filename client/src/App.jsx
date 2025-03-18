import GamesCatalog from "./components/games-catalog/GamesCatalog"
import GamesCreate from "./components/games-create/GamesCreate"
import GamesDetails from "./components/games-details/GamesDetails"
import GamesEdit from "./components/games-edit/GamesEdit"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Login from "./components/login/Login"
import Register from "./components/register/Register"

function App() {
	return (
		<div id="box">
			{/* Header */}
			<Header />

			{/* Main Content */}
			<main id="main-content">
				{/* Home Page */}
				<Home />

				{/* Login Page ( Only for Guest users ) */}
				<Login />

				{/* Register Page ( Only for Guest users ) */}
				<Register />

				{/* Create Page ( Only for logged-in users ) */}
				<GamesCreate />

				{/* Edit Page ( Only for the creator )*/}
				<GamesEdit />

				{/*Details Page*/}
				<GamesDetails />	

				{/* Catalogue */}
				<GamesCatalog />

			</main>
		</div>

	)
}

export default App
