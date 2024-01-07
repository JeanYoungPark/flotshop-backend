import express from 'express';
import { app } from '#root/index';
import { adminAuthRouter } from '#route/admin/auth';
import { adminUserRouter } from '#route/admin/user';
import { adminProductRouter } from '#route/admin/product';;
import { authRouter } from '#route/auth';
import { categoryRouter } from '#route/category';
import { userRouter } from '#route/user';
import { specs, swaggerUi } from './src/swagger/swagger.js';
import { boardRouter } from '#route/board';
import { optionRouter } from '#route/admin/option';

const api = express.Router();
const admin = express.Router();

app.use("/api", api);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.static("uploads"));

api.use(authRouter);
api.use(categoryRouter);
api.use(optionRouter)
api.use(boardRouter)
api.use(userRouter);

api.use("/admin", admin);
admin.use(adminAuthRouter);
admin.use(adminUserRouter);
admin.use(adminProductRouter);

