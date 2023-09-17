import { Snippet } from '@redux/snippets';

export type IDBSnippet = Omit<Snippet, 'creator'>;

const DB_NAME = 'snippetDB';
const OBJECT_STORE_NAME = 'snippets';

export const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBRequest<IDBDatabase>).result;
      db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
    };

    request.onsuccess = () => {
      resolve(request.result as IDBDatabase);
    };

    request.onerror = () => {
      reject('Failed to initialize IndexedDB');
    };
  });
};

async function withTransaction<T>(
  mode: IDBTransactionMode,
  callback: (
    transaction: IDBTransaction,
    objectStore: IDBObjectStore,
  ) => Promise<T>,
): Promise<T> {
  return new Promise<T>(async (resolve, reject) => {
    try {
      const db = await openDatabase();
      const transaction = db.transaction(OBJECT_STORE_NAME, mode);
      const objectStore = transaction.objectStore(OBJECT_STORE_NAME);
      const result = await callback(transaction, objectStore);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

export const getAllDrafts = (): Promise<IDBSnippet[]> => {
  return withTransaction('readonly', (_, objectStore) => {
    return new Promise<IDBSnippet[]>((resolve, reject) => {
      const request = objectStore.getAll();

      request.onsuccess = (event) => {
        const request = event.target as IDBRequest;
        if (request?.result) {
          resolve(request.result as IDBSnippet[]);
        } else {
          resolve([]);
        }
      };

      request.onerror = () => {
        resolve([]);
      };
    });
  });
};

export const updateDraftById = (
  id: string,
  updatedSnippet: Omit<IDBSnippet, 'id'>,
): Promise<void> => {
  return withTransaction('readwrite', async (_, objectStore) => {
    const getRequest = objectStore.get(id);

    return new Promise<void>((resolve, reject) => {
      getRequest.onsuccess = (event) => {
        const existingSnippet = getRequest.result as IDBSnippet | undefined;

        if (existingSnippet) {
          Object.assign(existingSnippet, updatedSnippet);

          const putRequest = objectStore.put(existingSnippet);

          putRequest.onsuccess = () => {
            resolve();
          };

          putRequest.onerror = () => {
            reject('Error while updating snippet');
          };
        } else {
          reject('Snippet not found for update');
        }
      };

      getRequest.onerror = () => {
        reject('Error while updating snippet');
      };
    });
  });
};

export const addDraft = (snippet: IDBSnippet): Promise<void> => {
  return withTransaction('readwrite', (_, objectStore) => {
    const request = objectStore.add(snippet);

    return new Promise<void>((resolve, reject) => {
      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject('Failed to add snippet to IndexedDB');
      };
    });
  });
};

export const deleteDraftById = (id: string): Promise<void> => {
  return withTransaction('readwrite', (_, objectStore) => {
    const request = objectStore.delete(id);

    return new Promise<void>((resolve, reject) => {
      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject('Error while deleting snippet');
      };
    });
  });
};
