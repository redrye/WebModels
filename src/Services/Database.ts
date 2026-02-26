// src/services/Database.ts
import DATABASE_CONFIG from '../Config/Database';


type DatabaseConfig = {
    name: string;
    version: number;
    stores: { [key: string]: IDBObjectStoreParameters };
};

class Database {
    private static instance: Database;
    private db: IDBDatabase | null = null;
    private config: DatabaseConfig = DATABASE_CONFIG;

    private constructor() {}

    static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    async connect(config?: DatabaseConfig): Promise<IDBDatabase> {
        this.config = config || DATABASE_CONFIG;
        if (this.db) return this.db;

        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.config.name, this.config.version);

            request.onerror = () => {
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;

                // Create object stores
                for (const [storeName, config] of Object.entries(this.config.stores)) {
                    if (!db.objectStoreNames.contains(storeName)) {
                        db.createObjectStore(storeName, config);
                    }
                }
            };
        });
    }

    getDb(): IDBDatabase {
        if (!this.db) {
            throw new Error('Database not initialized. Call connect() first.');
        }
        return this.db;
    }
}

export default Database;