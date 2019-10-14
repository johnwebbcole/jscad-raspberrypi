import test from 'ava';
import { Spacer } from '../src';

import { csgImageSnapshot } from '@jwc/jscad-test-utils';

test('create a hat spacer', async t => {
  var object = Spacer().Center();

  const value = await csgImageSnapshot(t, object);
  t.true(value);
});
