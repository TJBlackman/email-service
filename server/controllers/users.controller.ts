import { Router } from "https://deno.land/x/oak/mod.ts";
import { getUsers, postNewUser, editUser, deleteUser } from "../services/users.service.ts";

const router = new Router();
router.allowedMethods();

router.get('/api/v1/users', (ctx) => {
  ctx.response.body = getUsers();
});

router.post('/api/v1/users', async (ctx) => {
  ctx.response.body = await postNewUser({ email: 'test@test.com', password: 'pooper' });
});

router.put('/api/v1/users', (ctx) => {
  ctx.response.body = editUser();
});

router.delete('/api/v1/users', (ctx) => {
  ctx.response.body = deleteUser();
});


export default router; 