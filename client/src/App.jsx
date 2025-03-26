import { Routes, Route } from "react-router"
import { useState } from "react"

import { UserContext } from "./contexts/UserContext"

import GamesCatalog from "./components/games-catalog/GamesCatalog"
import GamesCreate from "./components/games-create/GamesCreate"
import GamesDetails from "./components/games-details/GamesDetails"
import GamesEdit from "./components/games-edit/GamesEdit"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import ScrollToTop from "./components/ScrollToTop"
import Logout from "./components/logout/Logout"

function App() {
	const [authData, setAuthData] = useState(null);

	const userLoginHandler = (resultData) => {
		setAuthData(resultData);
	}

	const userLogoutHandler = () => {
		setAuthData(null);
	}

	return (
		<UserContext.Provider value={{...authData, userLoginHandler, userLogoutHandler}}>
			<div id="box">
				{/* Header */}
				<Header />

				{/* Main Content */}
				<main id="main-content">
					<ScrollToTop />
					<Routes>
						{/* Home Page */}
						<Route path="/" element={<Home />} />

						{/* Login Page ( Only for Guest users ) */}
						<Route path="/login" element={<Login />} />

						{/* Register Page ( Only for Guest users ) */}
						<Route path="/register" element={<Register />} />

						{/* Logout ( Only for logged-in users ) */}
						<Route path="/logout" element={<Logout />} />

						{/* Create Page ( Only for logged-in users ) */}
						<Route path="/games/create" element={<GamesCreate />} />

						{/* Edit Page ( Only for the creator )*/}
						<Route path="/games/:gameId/edit" element={<GamesEdit />} />

						{/*Details Page*/}
						<Route path="/games/:gameId/details" element={<GamesDetails />} />

						{/* Catalogue */}
						<Route path="/games" element={<GamesCatalog />} />
					</Routes>
				</main>
			</div>
		</UserContext.Provider>
	)
}

export default App
