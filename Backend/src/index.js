import connectDB from "./db/index.js";
import {app} from "./app.js";


connectDB().then(() => {
    app.listen(8000, () => {
        console.log("Server is running on port ", process.env?.PORT || 8000);
    });
})
    .catch((err) => {
        console.log("MongoDB connection Failed!!", err);
    })