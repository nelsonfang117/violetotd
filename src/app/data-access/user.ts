type User = {
    id: string;
    name: string;
};

// Type-safe global storage
declare global {
    var _userStore: User | undefined;
}

// Initialize store
global._userStore = {
    id: "50",
    name: "John Doe",
};

export function getUser(userId: string): User | undefined {
    if (!global._userStore || global._userStore.id !== userId) {
        return undefined;
    }
    return global._userStore;
}

export function updateUser(userId: string, name: string): boolean {
    if (!global._userStore || global._userStore.id !== userId) {
        return false;
    }
    global._userStore.name = name;
    return true;
}