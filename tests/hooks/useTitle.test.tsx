import { beforeEach, describe, expect, it } from 'vitest';

import { useTitle } from '@/hooks/useTitle';
import { render } from '@testing-library/react';

function TestComponent({ title }: { title: string }) {
  useTitle(title);
  return null;
}

describe('useTitle', () => {
  const originalTitle = 'Original Title';

  beforeEach(() => {
    document.title = originalTitle;
  });

  it('sets document.title on mount', () => {
    render(<TestComponent title='New Title' />);
    expect(document.title).toBe('New Title');
  });

  it('restores document.title on unmount', () => {
    const { unmount } = render(<TestComponent title='Changed Title' />);
    expect(document.title).toBe('Changed Title');
    unmount();
    expect(document.title).toBe(originalTitle);
  });

  it('updates document.title when title prop changes', () => {
    const { rerender } = render(<TestComponent title='First Title' />);
    expect(document.title).toBe('First Title');
    rerender(<TestComponent title='Second Title' />);
    expect(document.title).toBe('Second Title');
  });
});
