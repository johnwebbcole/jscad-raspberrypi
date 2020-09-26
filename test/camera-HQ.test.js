import { csgImageSnapshot } from '@jwc/jscad-test-utils';
import test from 'ava';
import { HQCameraModule } from '../src';

test('create a HQ camera', async (t) => {
  var group = HQCameraModule();

  t.snapshot(group.names, 'default parts');

  t.snapshot(Object.keys(group.parts), 'all parts');

  t.snapshot(group.toString());

  var object = group.combine().Center();

  const value = await csgImageSnapshot(t, object);
  t.true(value);
});
