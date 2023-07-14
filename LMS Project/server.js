import app from "./app.js"

const PORT=process.env.PROCESS || 5000;

app.listen(PORT,()=>{
    console.log(`App is running of http:localhost:${PORT}`);
})