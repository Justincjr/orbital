import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import gk from "../../images/generalknowledge.png";
import bottle from "../../../game/components/glass.bottlepng.jpeg"
const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("username");
		window.location.reload();
	};
	const username = localStorage.getItem("username");
	return (
		<div className={styles.main_container}>
		  <nav className={styles.navbar}>
			<h1>YadiYadi</h1>
			{username && <p className={styles.username}>Welcome, {username}!</p>}
			<button className={styles.white_btn} onClick={handleLogout}>
			  Logout
			</button>
		  </nav>
		  <div className={styles.button_container}>
			<Link to="/quiz" className={styles.button}>
			  <img src={gk} alt="Route 1" className={styles.button_image} />
			  
			</Link>
			<Link to="/game" className={styles.button}>
			  <img src={bottle} alt="Route 2" className={styles.button_image} />
			</Link>
		  </div>
		</div>
	);
};

export default Main;
