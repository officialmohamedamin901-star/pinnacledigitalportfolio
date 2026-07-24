/**
 * Persistent Storage Helper utilizing IndexedDB for large media/data persistence
 * with automatic fallback & sync to localStorage.
 */

const DB_NAME = 'MateoSanchezCmsDB';
const DB_VERSION = 1;
const STORE_NAME = 'cms_data_store';
const STORAGE_KEY = 'mateo_sanchez_portfolio_cms_v2';

// Initialize IndexedDB
const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      return reject(new Error('IndexedDB not supported in this browser environment.'));
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(request.error || new Error('Failed to open IndexedDB.'));
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
};

/**
 * Saves CMS state asynchronously to IndexedDB and synchronously to localStorage
 */
export const saveCmsState = async (data: Record<string, any>): Promise<void> => {
  // 1. Try saving to IndexedDB (Supports unlimited storage for high-res images & base64)
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(data, STORAGE_KEY);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('IndexedDB save warning:', err);
  }

  // 2. Backup to localStorage (with safe error handler if quota is exceeded)
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (err) {
    console.warn('localStorage quota reached or unavailable, relying on IndexedDB:', err);
  }
};

/**
 * Loads saved CMS state from IndexedDB first, with fallback to localStorage
 */
export const loadCmsState = async (): Promise<Record<string, any> | null> => {
  // 1. Attempt to fetch from IndexedDB
  try {
    const db = await openDatabase();
    const data = await new Promise<Record<string, any> | null>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(STORAGE_KEY);

      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });

    if (data) return data;
  } catch (err) {
    console.warn('IndexedDB read warning:', err);
  }

  // 2. Fallback to localStorage
  try {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) {
      return JSON.parse(local);
    }
  } catch (err) {
    console.warn('localStorage read warning:', err);
  }

  return null;
};

/**
 * Synchronous read from localStorage for immediate non-blocking initial frame render
 */
export const getSyncLocalCmsState = (): Record<string, any> | null => {
  try {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) return JSON.parse(local);
  } catch (e) {
    // ignore error
  }
  return null;
};
