import { rest } from 'msw';

export const handlers = [
  rest.post('/login', async (req, res, ctx) => {
    const { email, password } = await req.json();

    if (email !== 'johndoe' || password !== 'password') {
      return res(
        ctx.status(404),
        ctx.delay(700),
        ctx.json({
          errorMessage: `Invalid email or password`,
        })
      );
    }

    sessionStorage.setItem('is-authenticated', 'true');

    return res(ctx.status(200), ctx.delay(700));
  }),
];
