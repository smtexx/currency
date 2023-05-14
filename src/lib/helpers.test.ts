import { setClass } from './helpers';

it('setClass helper returns right class name', () => {
  const one = 'classOne';
  const two = 'classTwo';
  const three = 'classThree';
  expect(setClass([[one]])).toBe(one);
  expect(setClass([[one, true]])).toBe(one);
  expect(setClass([[one, false]])).toBe('');
  expect(setClass([[one], [two]])).toBe(`${one} ${two}`);
  expect(setClass([[one], [two, true]])).toBe(`${one} ${two}`);
  expect(setClass([[one], [two, false]])).toBe(one);
  expect(setClass([[one], [two, three, true]])).toBe(`${one} ${two}`);
  expect(setClass([[one], [two, three, false]])).toBe(
    `${one} ${three}`
  );
});

it('setClass throws error if class name is undefined', () => {
  expect(() => setClass([[undefined]])).toThrow();
});
