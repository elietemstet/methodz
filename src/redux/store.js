import { configureStore } from "@reduxjs/toolkit";
import fieldsReducer from "./fieldsSlice";

export default configureStore({
    reducer: {
        fields: fieldsReducer
    }
})
