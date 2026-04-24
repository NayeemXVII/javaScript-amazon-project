export default function saveToStorage(storageKey, storageData) {
    localStorage.setItem(storageKey, JSON.stringify(storageData));
};