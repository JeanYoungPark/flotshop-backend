import { app } from '#core/index.js';
import { findUser,updateUser } from '#route/user.js'
import { adminJoinRouter } from '#route/admin/join.js';
import { adminListRouter } from '#route/admin/list.js';

app.use(findUser);
app.use(updateUser);

// admin
app.use(adminJoinRouter);
app.use(adminListRouter);