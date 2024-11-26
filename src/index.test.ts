import { test, expect } from '@jest/globals';
import app from "./index";
import { describe } from 'node:test';

// npx jest
// test('hello world!', () => {
// 	expect(1 + 1).toBe(2);
// });

// https://hono.dev/docs/helpers/testing
describe('Testing app', () => {
	it('authorized ip address', () => {
		const req = new Request('/admin/');
		const res = app.fetch(req);
		expect(res.status).toBe(200)
	})
})