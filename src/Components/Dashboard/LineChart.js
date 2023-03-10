import React from "react";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory";

const LineChart = ({ exercises, calorieGoal }) => {
  // create an array to store the total calories burned for each exercise
  const totalCaloriesBurnedByExercise = [];
  exercises.forEach((exercise) => {
    const caloriesBurned = exercise.caloriesBurned;
    if (totalCaloriesBurnedByExercise.length === 0) {
      totalCaloriesBurnedByExercise.push(caloriesBurned);
    } else {
      const previousTotalCaloriesBurned = totalCaloriesBurnedByExercise[totalCaloriesBurnedByExercise.length - 1];
      totalCaloriesBurnedByExercise.push(previousTotalCaloriesBurned + caloriesBurned);
    }
  });

  // transform the array into an array of {x, y} data points for VictoryLine
  var data = totalCaloriesBurnedByExercise.map((caloriesBurned, index) => {
    return { x: index + 1, y: caloriesBurned };
  });

//   data = [...data, { x: exercises.length + 1, y: calorieGoal }]
//   const goalData = [{ x: 0, y: calorieGoal }, { x: exercises.length + 1, y: calorieGoal }];

  return (
    <VictoryChart>
      <VictoryAxis label={"Exercises"}/>

      <VictoryAxis dependentAxis/>
      <VictoryLine data={data} style={{data:{stroke:"green"}}} interpolation="natural" />
      {/* <VictoryLine data={goalData} style={{ data: { stroke: "green", strokeDasharray: 4 } }} /> */}
    </VictoryChart>
  );
};

export default LineChart;