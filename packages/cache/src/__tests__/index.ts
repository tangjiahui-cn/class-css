
import createCache from '..';

describe('class-css-cache', () => {
  const cache = createCache('css');

  it('if hash exist, do not add again.', () => {
    cache.add('hash1', 'h1{color: red}')
    expect(cache.tempSize()).toBe(1);
    cache.add('hash2', 'h1{color: red}')
    expect(cache.tempSize()).toBe(2);
    cache.add('hash2', 'h1{color: red}')
    expect(cache.tempSize()).toBe(2);
  })

  it('cache.genRulesText() get value of the sum from hash value', () => {
    const result = 'h1{color: red}h1{color: red}';
    expect(cache.genRulesText()).toBe(result);
    const text = 'h2{color: red}'
    cache.add('hash3', text)
    expect(cache.genRulesText()).toBe(result + text);
  })
})