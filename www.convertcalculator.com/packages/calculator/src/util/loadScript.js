const loadScript = async ({
    id,
    src
}) => {
    return new Promise((resolve) => {
        const existingScript = document.getElementById(id);

        if (existingScript) {
            if (existingScript.dataset.loaded) {
                resolve();
            } else {
                existingScript.addEventListener('load', resolve);
            }
        } else {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = src;
            script.id = id;
            document.body.appendChild(script);

            script.addEventListener('load', resolve);
        }
    });
};

export default loadScript;