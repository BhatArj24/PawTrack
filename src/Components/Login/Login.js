import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import {db} from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import {Base64} from "js-base64";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [validUser, setValidUser] = useState(false);
	const navigate = useNavigate();
	const userCollectionRef = collection(db, "users");
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
	const [users, setUsers] = useState([]);
	useEffect(() => {
		const getUsers = async () => {
			const data = await getDocs(userCollectionRef);
			setUsers(data.docs.map((doc) => ({...doc.data(),id:doc.id})));
		}
		getUsers();
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setValidUser(false);
		users.map((user) => {
			var decoded = Base64.decode(user.password);
			// var decoded = user.password;
			if (user.email === data.email.toLowerCase() && decoded === data.password) {
				localStorage.setItem("userId",user.id);
				console.log(user.id)
				console.log("Login Successfull");
				setValidUser(true);
				navigate("/dashboard");
			}
		});
		if(!validUser){
			window.alert("Invalid Credentials");
		}
	};
    return(
        
        <section>
            <div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1 style={{marginBottom:"10%",fontWeight:"bold"}}>Sign In</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
                            style={{marginBottom:"5%"}}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
                            style={{marginBottom:"5%"}}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign In
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1 style={{marginBottom:"10%",fontWeight:"bold"}}>New Here?</h1>
					<Link to="/register">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
        </section>
    )
}
export default Login;