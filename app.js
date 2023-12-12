import { app } from '#core/index';
import { findUser,updateUser } from '#route/user'
import { login } from '#route/login';
import { adminJoin } from '#route/admin/join';
import { adminUserList } from '#route/admin/list';
import { adminProductList } from '#route/admin/product';
import { adminProductAdd } from '#route/admin/product';
import { categoryDetail, category } from '#route/category';

/**
 * client, admin common
 */
app.use(findUser);
app.use(updateUser);
app.use(login);

/**
 * client
 */
// category
app.use(category);
app.use(categoryDetail)

/**
 * admin
 */
app.use(adminJoin);
app.use(adminUserList);
app.use(adminProductList);
app.use(adminProductAdd);