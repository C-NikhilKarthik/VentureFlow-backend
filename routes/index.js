const express = require("express");

const userRouter = require("./User.route")

const router = new express.Router();

router.get("/", async (request, response) => {
    response.json({ status: "success", api: "VentureFlow backend api", version: "1.0.0" });
});
router.use(express.json());
router.use("/api/users", userRouter);


module.exports = router;
