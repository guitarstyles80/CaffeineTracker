import mongoist from 'mongoist';
let db = mongoist('mongodb://localhost:27017/CaffeineTracker', {});
export default db;
