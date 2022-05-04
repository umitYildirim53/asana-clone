const express = require("express");
const fileUpload = require("express-fileupload");
const helmet = require("helmet");
const config = require("./config")
const events = require("./scripts/events")
const { ProjectRoutes, UserRoutes, SectionRoutes, TaskRoutes } = require("./api-routes");
const loaders = require("./loaders");

const errorHandler = require("./middlewares/errorHandler");

config();   // bu ikili yer değişirse env çekemiyor
loaders();
events();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(fileUpload());

app.listen(process.env.APP_PORT, () => {
    console.log("Sunucu ayağa kalktı..");
    app.use("/projects", ProjectRoutes);
    app.use("/users", UserRoutes);
    app.use("/sections", SectionRoutes);
    app.use("/tasks", TaskRoutes);

    app.use((req, res, next) => {
        const error = new Error("Aradığınız sayfa bulunmamaktadır..");
        error.status = 404;
        next(error);
    });

    //! Error Handler
    app.use(errorHandler);
});