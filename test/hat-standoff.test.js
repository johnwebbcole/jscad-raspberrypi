import test from 'ava';
import { HatStandoff } from '../src';

import { csgImageSnapshot } from '@jwc/jscad-test-utils';

test('create a hat standoff', async t => {
  var object = HatStandoff();

  const value = await csgImageSnapshot(t, object);
  t.true(value);
});
