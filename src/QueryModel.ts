import Database from "./Services/Database";
import QueryBuilder from "./Builders/QueryBuilder";

class QueryModel {
    protected db: Database;
    static table = '';
    constructor() {
        this.db = Database.getInstance();
    }

    static query(): QueryBuilder {
        return new QueryBuilder(this);
    }

    static where(field: string, operatorOrValue: any, value?: any): QueryBuilder {
        return this.query().where(field, operatorOrValue, value);
    }

    static async all<T>(): Promise<T[]> {
        const db = Database.getInstance().getDb();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.table, 'readonly');
            const store = transaction.objectStore(this.table);
            const request = store.getAll();

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    static async find(id: number): Promise<any> {
        const db = Database.getInstance().getDb();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.table, 'readonly');
            const store = transaction.objectStore(this.table);
            const request = store.get(id);

            request.onsuccess = () => {
                resolve(request.result || null);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    static async create(data: any): Promise<any> {
        const db = Database.getInstance().getDb();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.table, 'readwrite');
            const store = transaction.objectStore(this.table);
            const request = store.add(data);

            request.onsuccess = () => {
                resolve({...data, id: request.result as number});
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    static async update(id: number, data: any): Promise<any> {
        const db = Database.getInstance().getDb();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.table, 'readwrite');
            const store = transaction.objectStore(this.table);

            const getRequest = store.get(id);

            getRequest.onsuccess = () => {
                const existingData = getRequest.result;
                if (!existingData) {
                    reject(new Error('Record not found'));
                    return;
                }

                const updatedData = {...existingData, ...data};
                const updateRequest = store.put(updatedData);

                updateRequest.onsuccess = () => {
                    resolve(updatedData);
                };

                updateRequest.onerror = () => {
                    reject(updateRequest.error);
                };
            };

            getRequest.onerror = () => {
                reject(getRequest.error);
            };
        });
    }

    static async forceDelete(id: number): Promise<void> {
        const db = Database.getInstance().getDb();
        var model = await this.find(id)
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.table, 'readwrite');
            const store = transaction.objectStore(this.table);
            const request = store.delete(id);

            request.onsuccess = () => {
                resolve(model);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }
}

export default QueryModel;