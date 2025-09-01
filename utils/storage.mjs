import Store from 'electron-store';

const store = new Store();

export function saveTemplate(data){
    store.set(data.key, data.data);
}

export function getTemplate(key){
    let data = store.get(key);
    return data;
}