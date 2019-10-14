import test from 'ava';
import { CameraModuleV1 } from '../src';

import { csgImageSnapshot } from '@jwc/jscad-test-utils';

test('create a camera v1', async t => {
  var group = CameraModuleV1();

  var object = group.combine().Center();

  const value = await csgImageSnapshot(t, object);
  t.true(value);
});
