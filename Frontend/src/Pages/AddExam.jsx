import React from "react";
import axios from "axios";
import { useEffect } from "react";
const AddExam = () => {
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchAIQuestions = async () => {
      try {
        console.log("inside try fetchQuestions");
        const subject = "Mern Stack";
        const topic = "React";
        const count = 4;
        const difficulty = "easy";
        const res = await axios.post(
          `http://localhost:5000/adminRoutes/generateQuestions`,
          {
            count,
            subject,
            topic,
            difficulty,
          }
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchAIQuestions();
  }, []);
  return <div>AddExam</div>;
};

export default AddExam;
