import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';

/*
 * Light / dark switch.
 *
 * The first visit follows the operating system, because someone who has told
 * their machine they want light has already answered this question. After that
 * their own choice wins and is remembered.
 *
 * The theme is written to <html data-theme>, which is where _root.scss expects
 * it. Reading and writing storage is wrapped: Safari in private browsing throws
 * on localStorage, and a colour preference is not worth a blank page.
 */
const STORAGE_KEY = 'saadaoui.theme';

function readStored() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function store(theme) {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* Storage unavailable; the choice simply is not remembered. */
  }
}

function preferred() {
  return readStored() === 'light' || readStored() === 'dark'
    ? readStored()
    : window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    setTheme(preferred());
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => {
        setTheme(next);
        store(next);
      }}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      <Icon icon={theme === 'dark' ? 'ph:sun-bold' : 'ph:moon-bold'} />
    </button>
  );
}
