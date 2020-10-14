import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();
router.allowedMethods();
router.get('/api/v1/orgs', (ctx) => { ctx.response.body = 'GET orgs'; });
router.post('/api/v1/orgs', (ctx) => { ctx.response.body = 'POST orgs'; });
router.put('/api/v1/orgs', (ctx) => { ctx.response.body = 'PUT orgs'; });
router.delete('/api/v1/orgs', (ctx) => { ctx.response.body = 'DELETE orgs'; });

export default router; 