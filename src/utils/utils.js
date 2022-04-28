export const resolvePath = (object, path, defaultValue) => {
    return path.split('.').reduce((obj, path) => obj ? obj[path] : defaultValue, object);
}