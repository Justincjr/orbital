import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./login/components/Main";
import Signup from "./login/components/Signup";
import Login from "./login/components/Login";
import EmailVerify from "./login/components/EmailVerify";
import ForgotPassword from "./login/components/ForgotPassword";
import PasswordReset from "./login/components/PasswordReset";
import QuizMain from "./quiz/components/Main";
import QuizQn from "./quiz/components/Quiz";
import QuizResult from "./quiz/components/Result";
import Game from "./game/components/game"; // Import the Game component

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/users/:id/verify/:token" element={<EmailVerify />} />
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/password-reset/:id/:token" element={<PasswordReset />} />
			<Route path="/quiz" exact element={<QuizMain />} />
			<Route path="/quiz/qn" exact element={<QuizQn />} />
			<Route path="/quiz/result" exact element={<QuizResult />} />
			<Route path="/game" element={user ? <Game /> : <Navigate replace to="/login" />} /> {/* Add the Game route */}
		</Routes>
	);
}

export default App;
