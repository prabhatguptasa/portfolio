import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('combines simple strings', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('handles conditional classes', () => {
    expect(cn('class1', { class2: true, class3: false })).toBe('class1 class2');
  });

  it('ignores falsy values', () => {
    expect(cn('class1', null, undefined, false, 0, '')).toBe('class1');
  });

  it('merges tailwind classes correctly', () => {
    // twMerge feature: "p-2" and "p-4" conflict, last one wins
    expect(cn('p-2', 'p-4')).toBe('p-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('handles complex combinations', () => {
    expect(
      cn(
        'base-class',
        { 'is-active': true, 'is-disabled': false },
        'p-2',
        ['extra-class', 'm-4'],
        'p-4' // overrides p-2
      )
    ).toBe('base-class is-active extra-class m-4 p-4');
  });
});
