export const regexConfig = {
    index: {
        category: /c:\d{18,19}/m,
        data: /d_\d{1,9}:\d{18,19}/gm,
    },
    id: /\d{18,19}/,
    key: /^[a-zA-Z0-9_-]{1,100}$/,
    keyValue: /[a-zA-Z0-9_-]{1,100}:\d{18,19}/m,
}

export const commonConfig = {
    regexConfig,
}
