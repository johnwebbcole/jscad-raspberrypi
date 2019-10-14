import test from 'ava';
import { Hat } from '../src';

import { csgImageSnapshot } from '@jwc/jscad-test-utils';

test('create a hat', async t => {
  var group = Hat();

  var object = group.combine().Center();

  const value = await csgImageSnapshot(t, object);
  t.true(value);
});
