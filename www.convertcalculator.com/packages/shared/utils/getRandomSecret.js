import getRandomCharacter from './getRandomCharacter';

const BASE64_CHARS =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';

const getRandomSecret = (charCount = 43) => {
    return Array.from(new Array(charCount)).reduce((acc) => {
        return `${acc}${getRandomCharacter(BASE64_CHARS)}`;
    }, '');
};

export default getRandomSecret;