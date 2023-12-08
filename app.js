import { app } from '#core/index';
import { findUser,updateUser } from '#route/user'
import { adminJoinRouter } from '#route/admin/join';
import { adminListRouter } from '#route/admin/list';
import { login } from '#route/admin/login';

app.use(findUser);
app.use(updateUser);
app.use(login);

// admin
app.use(adminJoinRouter);
app.use(adminListRouter);