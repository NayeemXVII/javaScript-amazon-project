export const deleveryOptions = [
    {
        id: 'id1',
        deleveryDays: 7,
        priceCents: 0
    },
    {
        id: 'id2',
        deleveryDays: 3,
        priceCents: 499
    },
        {
        id: 'id3',
        deleveryDays: 1,
        priceCents: 999
    },
];

export function getDeleveryOptions(deleveryOptionId) {
    let deleveryOption;

    deleveryOptions.forEach((options) => {
        if (deleveryOptionId === options.id) {
            deleveryOption = options;
        };
    });

    return deleveryOption || deleveryOption[0];
};

        