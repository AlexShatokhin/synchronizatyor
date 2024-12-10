const router = require("express").Router();
const categoryRoutes = require("./categoryRoutes");
const userRoutes = require("./userRoutes");
const transactionRoutes = require("./transactionRoutes");
const DBMigrationRoutes = require("./DBMigrationRoutes");

router.use(categoryRoutes);
router.use(userRoutes);
router.use(transactionRoutes);
router.use(DBMigrationRoutes);

module.exports = router;