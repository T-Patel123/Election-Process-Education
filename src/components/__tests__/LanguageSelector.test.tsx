import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { LanguageSelector } from '../LanguageSelector';

describe('LanguageSelector', () => {
  let originalReload: any;

  beforeEach(() => {
    vi.useFakeTimers();
    // Mock window.location.reload
    originalReload = window.location.reload;
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { ...window.location, reload: vi.fn() }
    });
  });

  afterEach(() => {
    // Cleanup
    window.location.reload = originalReload;
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('renders language options', () => {
    const onSelect = vi.fn();
    render(<LanguageSelector onSelect={onSelect} />);

    expect(screen.getByText('Choose Your Language')).toBeInTheDocument();
    expect(screen.getAllByText('English')[0]).toBeInTheDocument();
    expect(screen.getByText('ગુજરાતી')).toBeInTheDocument();
  });

  it('calls onSelect when a language is clicked', () => {
    const onSelect = vi.fn();
    render(<LanguageSelector onSelect={onSelect} />);

    fireEvent.click(screen.getAllByText('English')[0]);
    vi.advanceTimersByTime(300);
    expect(onSelect).toHaveBeenCalledWith('en');

    fireEvent.click(screen.getByText('ગુજરાતી'));
    vi.advanceTimersByTime(300);
    expect(onSelect).toHaveBeenCalledWith('gu');
  });

  it('stores selected language in localStorage', () => {
    const onSelect = vi.fn();
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    
    render(<LanguageSelector onSelect={onSelect} />);
    
    fireEvent.click(screen.getByText('ગુજરાતી'));
    
    expect(setItemSpy).toHaveBeenCalledWith('selectedLanguage', 'gu');
    
    setItemSpy.mockRestore();
  });
});
