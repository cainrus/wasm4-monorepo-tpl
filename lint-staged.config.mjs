export default {
    ["*.js"]: (files) => {
        return [
            `yarn run eslint:fix ${files.join(' ')}`,
            `git add ${files.join(' ')}`,
        ];
    },
}
