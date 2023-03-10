import { useState, useEffect, useDeferredValue, useRef } from "react";
import {useNavigate } from "react-router-dom";
import {db} from "../../firebase-config";
import { collection, getDocs, updateDoc, doc, arrayUnion } from "firebase/firestore";
import "./style.css";
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";
import LineChart from "./LineChart";

const Dashboard = () => {
  const [user, setUser] = useState({ email: "", name: "", excercises:[], dogName:"", id:"", calorieGoal:0,caloriesBurned:0});
  const navigate = useNavigate();
  const userCollectionRef = collection(db, "users");
  const [users, setUsers] = useState([]);
  const [goal, setsGoal] = useState({calorieGoal:0});
  const [modal, setModal] = useState(false);
  const [goalModal, setGoalModal] = useState(false);
  const [exercise, setExercise] = useState({exerciseName:"", intensityLevel:1, caloriesBurned:0, date:""});
  


  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
      return;
    } else {
      user.id = userId;
    }
    
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    if(users.length === 0){
      console.log("in getUsers");
      getUsers();

    }
  }, [navigate, userCollectionRef]);

  useEffect(() => {
    console.log("in findUser");
    users.map((u) => {
      console.log(u.id);
      console.log(user.id);
      if(u.id === user.id){
        console.log("User Found");
        var totalBurned = 0;
        u.excercises.map((e) => {
          totalBurned += e.caloriesBurned;
        });
        
        setUser({
          email: u.email,
          name: u.name,
          excercises: u.excercises,
          dogName: u.dogName,
          id: u.id,
          calorieGoal: u.calorieGoal,
          caloriesBurned: totalBurned
        });
        


      }
    });
  }, [users]);
  

  const logout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  }

  const setGoal = async (e) => {
    const userDoc = doc(db, "users", user.id);
    const newFields = {calorieGoal: goal.calorieGoal};
    user.calorieGoal = goal.calorieGoal;
    await updateDoc(userDoc, newFields);
    setGoalModal(false);
  }
  
  const handleProfileChange = (event) => {
    setsGoal({ ...user, [event.target.name]: event.target.value });
  };

  const handleExerciseChange = (event) => {
    setExercise({ ...exercise, [event.target.name]: event.target.value });
  };

  const createExercise = async (e) => {
    e.preventDefault();
    user.excercises.push(exercise);
    setUser(
      {
        ...user,
        caloriesBurned: user.caloriesBurned+exercise.intensityLevel*20,

      }
    )
    const userRef = doc(db, "users", user.id);
    const newExercise = {exerciseName: exercise.exerciseName, intensityLevel: exercise.intensityLevel, caloriesBurned: exercise.intensityLevel*20, date: exercise.date};
    await updateDoc(userRef, {excercises: arrayUnion(newExercise)});
    setModal(false);
    setExercise({exerciseName:"", intensityLevel:1, caloriesBurned:0, date:""});
  }
  return(
    <section /*style={{display:"flex"}}*/>
      <h1 style={{textAlign:"center"}}>Welcome {user.name} and {user.dogName}! </h1>
      <Modal show={goalModal} onHide={()=>setGoalModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Set Calorie Loss Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label>Calories to Lose:</label>
            <input type="text" name="calorieGoal" onChange={handleProfileChange} />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={()=>setGoalModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={setGoal}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={modal} onHide={()=>setModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Exercise</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div style={{width:"100%"}}>
              <label>Exercise Name:</label>
              <input type="text" name="exerciseName" onChange={handleExerciseChange}/>
            </div>
            <div style={{width:"100%",marginTop:"10px"}}>
              <label>Intensity Level:</label>
              <select name="intensityLevel" onChange={handleExerciseChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div style={{width:"100%",marginTop:"10px"}}>
              <label>Date</label>
              <input type="date" name="date" onChange={handleExerciseChange}/>
            </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={()=>setModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={createExercise}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="button-container">
        <Button className="dashboard-button" onClick={()=>setModal(true)}>
          + Create Exercise
        </Button>
        <Button className="dashboard-button" onClick={logout} variant="danger">
          Log Out
        </Button>
        <Button className="dashboard-button" onClick={()=>{setGoalModal(true)}} variant="success">
          Set Goal
        </Button>
      </div>
      
      <div style={{width:"100%"}}>
        
        
        <h1 style={{fontWeight:"bold",width:"300px",margin:"auto"}}>Exercise Stats</h1>
        <div style={{display:"flex",marginTop:"1%"}}>
          <div style={{width:"33%"}}>
            <h2 style={{width:"20px",margin:"auto"}}>{user.excercises.length}</h2>
            <h2 style={{width:"300px",marginLeft:"33%"}}># of Exercises</h2>
          </div>
          <div style={{width:"33%"}}>
            <h2 style={{width:"20px",margin:"auto"}}>{user.caloriesBurned}</h2>
            <h2 style={{width:"350px",marginLeft:"25%"}}>Total Calories Burned</h2>
          </div>
          <div style={{width:"33%"}}>
            <h2 style={{width:"20px",margin:"auto"}}>{(user.calorieGoal-user.caloriesBurned)}</h2>
            <h2 style={{width:"300px",marginLeft:"33%"}}>Calories Left</h2>
          </div>

        </div>
      </div>


      <div>
        <h1 style={{fontWeight:"bold",width:"300px",margin:"auto"}}>Exercise Log</h1>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
          {user.excercises.map((e) => {
            return(
              <div style={{width:"300px",height:"300px",margin:"10px",border:"1px solid black",borderRadius:"10px",padding:"10px"}}>
                <h2 style={{fontWeight:"bold"}}>{e.exerciseName}</h2>
                <h2>Intensity Level: {e.intensityLevel}</h2>
                <h2>Calories Burned: {e.caloriesBurned}</h2>
                <h2>Date: {e.date}</h2>
              </div>
            )
          })}
          </div>
      </div>

      {user.excercises.length > 1 && <LineChart exercises={user.excercises} calorieGoal={user.calorieGoal}></LineChart>}

    </section>
  )
}

export default Dashboard;
