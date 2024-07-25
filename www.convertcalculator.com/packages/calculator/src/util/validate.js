// TODO: a bit ugly with the parentMap as argument, but it works for now
// if it wasnt recursive, we could return the parentMap from the function
const getFlattenedItems = (items, parentMap, level = 0) => {
    let flattenedItems = [];

    items.forEach((item) => {
        const flatItem = {
            ...item,
            level,
        };
        flattenedItems.push(flatItem);

        if (Array.isArray(item.children)) {
            flattenedItems = flattenedItems.concat(
                getFlattenedItems(item.children, parentMap, level + 1),
            );

            item.children.forEach((child) => {
                parentMap.set(child.itemId, flatItem);
            });
        }
    });

    return flattenedItems;
};

const getParentItem = (parentId, collection) => {
    return collection ? .find((item) => {
        return item._id === parentId;
    });
};

const validate = ({
    calculator,
    outputs,
    answers,
    items = []
}) => {
    const {
        questions = []
    } = calculator.contents;

    const parentMap = new Map();
    const elementsInView = getFlattenedItems(items, parentMap);

    const questionIds = new Set(
        elementsInView
        .filter((element) => {
            return element.collection === 'questions';
        })
        .map((element) => {
            return element.itemId;
        }),
    );

    const hasErrors = questions.some((question) => {
        const isInView = questionIds.has(question._id);

        if (!isInView) {
            return false;
        }

        const isHidden =
            question.shouldAddVisibilityLogic &&
            !outputs[`${question.reference}-VE`] ? .result;

        if (isHidden) {
            return false;
        }

        let isParentHidden = false;
        const parentInTree = parentMap.get(question._id);

        // here we check if any of the parents are hidden
        if (parentInTree) {
            let currentParentInTree = parentInTree;
            let {
                level
            } = currentParentInTree;
            let currentParentId = currentParentInTree.itemId;

            do {
                const collection = calculator.contents[currentParentInTree ? .collection];
                const currentParent = getParentItem(currentParentId, collection);

                isParentHidden =
                    currentParent &&
                    currentParent.shouldAddVisibilityLogic &&
                    !outputs[`${currentParent.reference}-VE`] ? .result;

                if (isParentHidden) {
                    break;
                }

                currentParentInTree = parentMap.get(currentParentInTree.itemId);
                currentParentId = currentParentInTree ? .itemId;

                level -= 1;
            } while (level >= 0);
        }

        if (isParentHidden) {
            return false;
        }

        const answer = answers[question.reference] || {};

        const {
            error
        } = answer;

        return Boolean(error);
    });

    return !hasErrors;
};

export default validate;