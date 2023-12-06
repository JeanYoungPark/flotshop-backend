import { app } from '#core/index.js';
import { findUser } from '#route/user.js'
import { adminJoinRouter } from '#route/admin/join.js';
import { adminListRouter } from '#route/admin/list.js';

app.use(findUser);

// admin
app.use(adminJoinRouter);
app.use(adminListRouter);