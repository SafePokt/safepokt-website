export const easyClone = <T>(object: T): T => JSON.parse(JSON.stringify(object))
