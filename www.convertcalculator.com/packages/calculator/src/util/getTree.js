const getTree = (items) => {
    const flattenedItems = getFlattenedItems(items);

    const views = [
        ...flattenedItems.filter(({
            type
        }) => {
            return type === 'viewBreak';
        }),
        {
            topIndex: -1
        },
    ];

    return views.map((item, index) => {
        const isFirst = index === 0;
        const isLast = views.length - 1 === index;

        const {
            topIndex: startIndex = 0
        } = views[index - 1] || {};

        const {
            topIndex: endIndex
        } = item;

        const newStartIndex = isFirst ? startIndex : startIndex + 1;
        const newEndIndex = isLast ? undefined : endIndex + 1;

        return items.slice(newStartIndex, newEndIndex);
    });
};

const getFlattenedItems = (items = [], level = 0, topIndex = undefined) => {
    return items.reduce((acc, item, itemIndex) => {
        return [
            ...acc,
            {
                ...item,
                level,
                topIndex: level === 0 ? itemIndex : topIndex,
            },
            ...getFlattenedItems(item.children, level + 1, itemIndex),
        ];
    }, []);
};

export default getTree;