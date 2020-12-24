import Chrome from '../Chrome';
import Mutex from '../Mutex';
import StorageManager from './StorageManager';

class Work
{
    constructor() {
        this.storage = new StorageManager(new WorkSchema(), Chrome.storage.local);
        this.mutex = new Mutex();
    }

    async all() {
        return await this.storage.get();
    }

    async clear() {
        await this.storage.set(this.storage.schema.default);
    }

    // async addTask(){
    //     await this.mutex.exclusive(async () => {
    //         let local = await this.storage.get();

    //     });
    // }
}

class WorkSchema
{
    get version() {
        return 1;
    }

    get default() {
        return {
            tasks: [],
            tabs: [],
            version: this.version
        }
    }
}

export {
    Work
}
