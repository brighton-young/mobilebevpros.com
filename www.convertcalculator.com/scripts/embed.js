const ready = (fn) => {
    if (typeof window === 'undefined') return;

    if (document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
        window.addEventListener('popstate', fn);
        window.addEventListener('mercury:load', fn);
    }
};

const loadCalculators = (shouldReInit = false) => {
    const calculatorEls = document.querySelectorAll('.calculator');

    const calculatorElsArray = Array.from(calculatorEls);

    let loadedCount = 0;
    calculatorElsArray.forEach(async (el) => {
        const {
            dataset
        } = el;
        const {
            loaded: isLoaded,
            type = 'inPage'
        } = dataset;

        if (!shouldReInit && isLoaded) return;

        const calculatorId = el.dataset.calcId;

        if (!calculatorId) return;

        // eslint-disable-next-line no-param-reassign
        el.dataset.loaded = true;

        if (type.toUpperCase().includes('PAGE')) {
            const {
                default: initInPageCalculator
            } = await
            import (
                './initInPageCalculator'
            );

            initInPageCalculator({
                el,
                calculatorId
            });
        }

        if (type.toUpperCase().includes('FRAME')) {
            const {
                default: initFramedCalculator
            } = await
            import (
                './initFramedCalculator'
            );

            initFramedCalculator({
                el,
                calculatorId
            });
        }

        loadedCount += 1;
    });

    return loadedCount;
};

const initCalculators = () => {
    const loadedCalculatorCount = loadCalculators();

    // If a calculator was loaded, the job is done
    if (loadedCalculatorCount > 0) return;

    // Keep on trying to load calculators until there is one (or more) loaded
    const intervalId = window.setInterval(() => {
        const newLoadedCalculatorCount = loadCalculators();

        if (newLoadedCalculatorCount > 0) {
            window.clearInterval(intervalId);
        }
    }, 200);

    // After 10 seconds, stop trying to load calculators
    window.setTimeout(() => {
        window.clearInterval(intervalId);
    }, 10000);
};

if (typeof window !== 'undefined') {
    window.cc = {
        ...window.cc,
        reinitialize: () => {
            console.warn(
                'The reinitialize method is depreciated. Please use the method reload() instead',
            );
            loadCalculators(true);
        },

        reload: () => {
            loadCalculators(true);
        },
    };
}

ready(() => {
    initCalculators();
});