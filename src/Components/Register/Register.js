import React, { useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import styles from './styles.module.css';
import {db} from '../../firebase-config';
import {collection, getDocs, addDoc} from 'firebase/firestore';
import {Base64} from 'js-base64';

const Register = () => {
    const [data, setData] = useState({
		name: "",
		email: "",
		password: "",
        dogName:""
	});
    const [InUse, setInUse] = useState(false);
    const [users, setUsers] = useState([]);
	const [error, setError] = useState("");
	const navigate = useNavigate();
    const usersCollectionRef = collection(db, "users");


	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

    const createUser = async (e)=>{
        e.preventDefault();
        users.map((user)=>{
           if(user.email===data.email.toLowerCase()){
               InUse = true;
           }
        });
        if(data.email!=="" && data.password!=="" && data.name!=="" && InUse===false && data.dogName!==""){
            await addDoc(usersCollectionRef, {name:data.name, email:data.email.toLowerCase(), password:Base64.encode(data.password), excercises:[], dogName:data.dogName, calorieGoal:0,dateGoal:0});
            navigate("/login");
        }
    }

    useEffect(() => {
        const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
        }
        getUsers();
    },[]);
    return (
        <section>
            <div className={styles.signup_container}>
                <div className={styles.signup_form_container}>
                    <div className={styles.left}>
                        <h1 style={{marginBottom:"10%",fontWeight:"bold"}}>Registered?</h1>
                        <Link to="/login">
                            <button type="button" className={styles.white_btn}>
                                Sign in
                            </button>
                        </Link>
                    </div>
                    <div className={styles.right}>
                        <form className={styles.form_container} onSubmit={createUser}>
                            <h1 style={{marginBottom:"10%", fontWeight:"bolder"}}>Register Account</h1>
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                onChange={handleChange}
                                value={data.name}
                                required
                                className={styles.input}
                                style={{marginBottom:"5%"}}
                            />
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
                                type="text"
                                placeholder="Dog Name"
                                name="dogName"
                                onChange={handleChange}
                                value={data.dogName}
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
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            
        </section>
    )
}

export default Register;