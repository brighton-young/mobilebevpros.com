const loadStylesheet = ({
    id,
    href
}) => {
    return new Promise((resolve) => {
        const {
            head
        } = document;
        const link = document.createElement('link');

        link.id = id;
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = href;

        head.appendChild(link);

        link.addEventListener('load', resolve);
    });
};

export default loadStylesheet;