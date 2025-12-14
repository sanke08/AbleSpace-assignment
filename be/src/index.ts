import app from "./app.js";

// "dev": "tsc -b && node dist/index.js",
const PORT = 3000;
// import app from "./app";

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}\n http://localhost:${PORT}`);
});
