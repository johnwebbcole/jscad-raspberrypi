import { csgImageSnapshot } from '@jwc/jscad-test-utils';
import test from 'ava';
import { BPlus } from '../src';

test.after.always.cb('wait for logging', (t) => {
  setTimeout(t.end, 250);
});

test('create a bplus4', async (t) => {
  var group = BPlus(4);

  var object = group.combine().Center();

  const value = await csgImageSnapshot(t, object, {
    camera: {
      position: [100, -100, 100],
    },
  });
  t.true(value);
});
