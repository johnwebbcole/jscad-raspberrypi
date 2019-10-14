import test from 'ava';
import { CameraModuleV2 } from '../src';

import { csgImageSnapshot } from '@jwc/jscad-test-utils';

test('create a camera v2', async t => {
  var group = CameraModuleV2();

  var object = group.combine().Center();

  const value = await csgImageSnapshot(t, object);
  t.true(value);
});
