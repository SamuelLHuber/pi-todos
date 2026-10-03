import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolve, join } from 'node:path';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { load } from './pi-host.mjs';

test('Pi 1 loads todo schemas and CRUD stays session-scoped', async t => {
  const cwd = mkdtempSync(join(tmpdir(), 'pi-todos-test-'));
  t.after(() => rmSync(cwd, { recursive: true, force: true }));
  const host = await load(resolve('index.ts'), cwd);
  host.ctx.sessionManager.getSessionId = () => 'test-session';
  host.ctx.sessionManager.getSessionFile = () => undefined;
  const tool = host.extension.tools.get('todo').definition;
  assert.equal(tool.executionMode, 'sequential');
  const create = await tool.execute('1', { action: 'create', title: 'Pi 1 migration', body: 'Verify me' }, undefined, undefined, host.ctx);
  assert.equal(create.details.todo.title, 'Pi 1 migration');
  const id = create.details.todo.id;
  const get = await tool.execute('2', { action: 'get', id }, undefined, undefined, host.ctx);
  assert.equal(get.details.todo.body.trim(), 'Verify me');
  const list = await tool.execute('3', { action: 'list-all' }, undefined, undefined, host.ctx);
  assert.equal(list.details.todos.length, 1);
  const removed = await tool.execute('4', { action: 'delete', id }, undefined, undefined, host.ctx);
  assert.equal(removed.details.action, 'delete');
  assert.equal((await tool.execute('5', { action: 'list-all' }, undefined, undefined, host.ctx)).details.todos.length, 0);
});
