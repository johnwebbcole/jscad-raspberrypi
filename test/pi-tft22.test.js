import test from 'ava';
import { PiTFT22 } from '../src';

import { csgImageSnapshot } from '@jwc/jscad-test-utils';

test('create a PiTFT22 hat', async t => {
  var group = PiTFT22();

  var object = group.combine().Center();

  const value = await csgImageSnapshot(t, object);
  t.true(value);
});
