import test from 'ava';
import { PiTFT24 } from '../src';

import { csgImageSnapshot } from '@jwc/jscad-test-utils';

test('create a PiTFT24 hat', async t => {
  var group = PiTFT24();

  var object = group.combine().Center();

  const value = await csgImageSnapshot(t, object);
  t.true(value);
});
