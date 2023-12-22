import { app } from '#core/index';
import { findUser,updateUser } from '#route/user'
import { login } from '#route/auth';
import { adminJoin } from '#route/admin/join';
import { adminUserList } from '#route/admin/list';
import { adminProductList } from '#route/admin/product';
import { adminProductAdd } from '#route/admin/product';
import { categoryDetail, category } from '#route/category';
import { categoryAdd } from '#route/category';
import { categoryDelete } from '#route/category';
import { categoryDetailAdd } from '#route/category';
import { categoryDetailDelete } from '#route/category';
import { categoryInfo } from '#route/category';
import { adminProductImgUpload } from '#route/admin/product';
import { logout } from '#route/auth';
import { deleteUser } from '#route/user';

// auth
app.use(adminJoin);
app.use(findUser);
app.use(updateUser);
app.use(deleteUser)
app.use(login);
app.use(logout)

// category
app.use(category);
app.use(categoryAdd);
app.use(categoryDelete);
app.use(categoryInfo);
app.use(categoryDetail);
app.use(categoryDetailAdd);
app.use(categoryDetailDelete);

// user
app.use(adminUserList);

//product
app.use(adminProductList);
app.use(adminProductAdd);
app.use(adminProductImgUpload);