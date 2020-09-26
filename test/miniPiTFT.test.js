import { csgImageSnapshot } from '@jwc/jscad-test-utils';
import test from 'ava';
import { MiniPiTFT } from '../src';

test('create a MiniPiTFT', async (t) => {
  var group = MiniPiTFT();
  t.snapshot(group.toString());

  var object = group.combine().Center();

  const value = await csgImageSnapshot(t, object);
  t.true(value);
});
