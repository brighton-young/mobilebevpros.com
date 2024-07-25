import loadScript from './loadScript';
import loadStylesheet from './loadStylesheet';

const loadSnipcart = async ({
    apiKey
}) => {
    if (apiKey && !document.getElementById('snipcart')) {
        const snipcartDiv = document.createElement('div');
        snipcartDiv.id = 'snipcart';
        snipcartDiv.dataset.apiKey = apiKey;
        snipcartDiv.dataset.configModalStyle = 'side';
        snipcartDiv.hidden = true;
        document.body.appendChild(snipcartDiv);
    }

    const hasScript = getHasExistingSnipcartScript();

    if (!hasScript) {
        await loadScript({
            src: 'https://cdn.snipcart.com/themes/v3.4.0/default/snipcart.js',
            id: 'snipcart-script',
        });
    }

    const hasStylesheet = getHasExistingSnipcartStylesheet();

    if (!hasStylesheet) {
        await loadStylesheet({
            id: 'snipcart-stylesheet',
            href: 'https://cdn.snipcart.com/themes/v3.4.0/default/snipcart.css',
        });
    }
};

const getHasExistingSnipcartScript = () => {
    return !![...document.scripts].find(({
        src
    }) => {
        return src.includes('snipcart.js');
    });
};

const getHasExistingSnipcartStylesheet = () => {
    return !![...document.styleSheets].find(({
        href
    }) => {
        if (!href) return false;

        return href.includes('snipcart.css');
    });
};

export default loadSnipcart;