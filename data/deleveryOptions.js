import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

const today = dayjs();

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

deleveryOptions.forEach((option) => {
    const dayAdd = today.add(option.deleveryDays, 'day');
    const dateWeek = dayAdd.format('dddd');

    if (dateWeek === 'Sunday') {
        option.deleveryDays = option.deleveryDays - 2;
    } else if (dateWeek === 'Saturday') {
        option.deleveryDays = option.deleveryDays - 1;
    }
});

export function getDeleveryOptions(deleveryOptionId) {
    let deleveryOption;

    deleveryOptions.forEach((options) => {
        if (deleveryOptionId === options.id) {
            deleveryOption = options;
        };
    });

    return deleveryOption || deleveryOption[0];
};

        