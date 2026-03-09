import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());

app.get('/api/rooms', (req, res) => {
    res.send([
        {
            "id": 1,
            "roomNumber": "115",
            "capacity": 2,
            "type": "Lecture Hall"
        }
    ]);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});