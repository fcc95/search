import { createAsyncThunk } from "@reduxjs/toolkit";

const FETCH_USERS = "FETCH_USERS";

type QuestionDataParams = {
  text: string;
};

export const getUser = createAsyncThunk(
  FETCH_USERS,
  async ({ text }: QuestionDataParams) => {
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${text}`
    );
    return response.json();
  }
);
