import test from 'ava';
import { BPlus } from '../src';

import { csgImageSnapshot } from '@jwc/jscad-test-utils';

test.after.always.cb('wait for logging', t => {
  setTimeout(t.end, 250);
});

test('create a bplus3', async t => {
  var group = BPlus(true);

  var object = group.combine().Center();

  const value = await csgImageSnapshot(t, object, {
    camera: {
      position: [100, -100, 100]
    }
  });
  t.true(value);
});
