import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";
const URL = import.meta.env.VITE_URL;
axios.defaults.withCredentials = true;
// import { getUserData } from "./AuthSlice";

export const getAllStudents = createAsyncThunk(
  "adminRoute/getAllStudents",
  async (_, { rejectWithValue }) => {
    try {
      console.log("pending getAllStudents");
      const res = await axios.get(`${URL}/adminRoutes/getAllStudents`);
      // console.log("fullfilled");
      console.log("ye raha admindata", res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getAllAttempts = createAsyncThunk(
  "adminRoute/getAllAttempts",
  async (_, { rejectWithValue }) => {
    try {
      console.log("pending attempts");
      const res = await axios.get(`${URL}/adminRoutes/getAllAttempts`);
      console.log("all Attempts", res.data)
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getAllQuestions = createAsyncThunk(
  "adminRoute/getAllQuestions",
  async (_, { rejectWithValue }) => {
    try {
      console.log("pending question");
      const res = await axios.get(`${URL}/adminRoutes/getAllQuestions`);
      console.log(res.data.length)
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getBestWorstSub = createAsyncThunk(
  "adminRoute/getBestWorstSub",
  async (_, { rejectWithValue }) => {
    try {
      console.log("pending bestworst");
      const res = await axios.get(`${URL}/adminRoutes/getBestWorstSub`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const AdminSlice = createSlice({
  name: "AdminSlice",
  initialState: {
    allStudents: [],
    allAttempts:[],
    bestWorstSub : [],
    allQuestions:[]
  },
  reducers: {
    cleanAdminData: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllStudents.fulfilled, (state, action) => {
        // console.log("all students fulfill");
        state.allStudents = action.payload.data;
      })
      .addCase(getAllStudents.pending, (state, action) => {
        // console.log("pending");
      })
      .addCase(getAllStudents.rejected, (state, action) => {
        // console.log("unsuccessfull");
      })
      .addCase(getAllAttempts.fulfilled, (state, action) => {
        // console.log("attempts fulfill");
        state.allAttempts = action.payload.data;
      })
      .addCase(getAllAttempts.pending, (state, action) => {
        // console.log("pending");
      })
      .addCase(getAllAttempts.rejected, (state, action) => {
        // console.log("unsuccessfull");
      })
      .addCase(getBestWorstSub.fulfilled, (state, action) => {
        // console.log("bestworst fulfill");
        state.bestWorstSub = action.payload.data;
      })
      .addCase(getBestWorstSub.pending, (state, action) => {
        // console.log("pending");
      })
      .addCase(getBestWorstSub.rejected, (state, action) => {
        // console.log("unsuccessfull");
      })
      .addCase(getAllQuestions.fulfilled, (state, action) => {
        // console.log("getquestion fulfill");
        state.allQuestions = action.payload;
        
      })
      .addCase(getAllQuestions.pending, (state, action) => {
        // console.log(" getAllQuestions pending");
      })
      .addCase(getAllQuestions.rejected, (state, action) => {
        // console.log("getAllQuestions unsuccessfull");
      });
  },
});

// export { getAllStudents} = AdminSlice.actions;
export default AdminSlice.reducer;
