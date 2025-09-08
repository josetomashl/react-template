import { act, renderHook } from '@testing-library/react';
import Cookies from 'js-cookie';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useCookie } from '@/hooks/useCookie';

vi.mock('js-cookie', () => ({
  default: {
    get: vi.fn(),
    set: vi.fn(),
    remove: vi.fn()
  }
}));

const mockedCookies = Cookies as unknown as {
  get: ReturnType<typeof vi.fn>;
  set: ReturnType<typeof vi.fn>;
  remove: ReturnType<typeof vi.fn>;
};

describe('useCookie', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return null if no cookie and no defaultValue', () => {
    mockedCookies.get.mockReturnValue(undefined);
    const { result } = renderHook(() => useCookie('test'));
    expect(result.current[0]).toBeNull();
    expect(mockedCookies.set).not.toHaveBeenCalled();
  });

  it('should return parsed cookie value if cookie exists (JSON)', () => {
    mockedCookies.get.mockReturnValue(JSON.stringify({ foo: 'bar' }));
    const { result } = renderHook(() => useCookie<{ foo: string }>('test'));
    expect(result.current[0]).toEqual({ foo: 'bar' });
  });

  it('should return string cookie value if cookie exists (not JSON)', () => {
    mockedCookies.get.mockReturnValue('plainstring');
    const { result } = renderHook(() => useCookie('test'));
    expect(result.current[0]).toBe('plainstring');
  });

  it('should set and return defaultValue if no cookie exists', () => {
    mockedCookies.get.mockReturnValue(undefined);
    const { result } = renderHook(() => useCookie('test', 'default'));
    expect(result.current[0]).toBe('default');
    expect(mockedCookies.set).toHaveBeenCalledWith('test', 'default');
  });

  it('should set and return defaultValue (object) if no cookie exists', () => {
    mockedCookies.get.mockReturnValue(undefined);
    const defaultObj = { foo: 'bar' };
    const { result } = renderHook(() => useCookie('test', defaultObj));
    expect(result.current[0]).toEqual(defaultObj);
    expect(mockedCookies.set).toHaveBeenCalledWith('test', JSON.stringify(defaultObj));
  });

  it('should update cookie value', () => {
    mockedCookies.get.mockReturnValue(undefined);
    const { result } = renderHook(() => useCookie('test'));
    act(() => {
      result.current[1]('newValue');
    });
    expect(mockedCookies.set).toHaveBeenCalledWith('test', 'newValue', undefined);
    expect(result.current[0]).toBe('newValue');
  });

  it('should update cookie value (object)', () => {
    mockedCookies.get.mockReturnValue(undefined);
    const { result } = renderHook(() => useCookie<{ foo: string }>('test'));
    act(() => {
      result.current[1]({ foo: 'baz' });
    });
    expect(mockedCookies.set).toHaveBeenCalledWith('test', JSON.stringify({ foo: 'baz' }), undefined);
    expect(result.current[0]).toEqual(JSON.stringify({ foo: 'baz' }));
  });

  it('should remove cookie when setting value to null', () => {
    mockedCookies.get.mockReturnValue('something');
    const { result } = renderHook(() => useCookie('test'));
    act(() => {
      result.current[1](null);
    });
    expect(mockedCookies.remove).toHaveBeenCalledWith('test');
    expect(result.current[0]).toBeNull();
  });

  it('should pass options to Cookies.set', () => {
    mockedCookies.get.mockReturnValue(undefined);
    const { result } = renderHook(() => useCookie('test'));
    act(() => {
      result.current[1]('value', { expires: 7 });
    });
    expect(mockedCookies.set).toHaveBeenCalledWith('test', 'value', { expires: 7 });
  });
});
