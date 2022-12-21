import { rest } from 'msw';

export const handlers = [
  rest.post('/login', (_, res, ctx) => {
    sessionStorage.setItem('is-authenticated', 'true');

    return res(ctx.status(200));
  }),
];
