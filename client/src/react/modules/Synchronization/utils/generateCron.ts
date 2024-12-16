const generateCronExpression = (days: string[], time: string): string => {
    const dayMap: { [key: string]: number } = {
        'Каждый понедельник': 1,
        'Каждый вторник': 2,
        'Каждую среду': 3,
        'Каждый четверг': 4,
        'Каждую пятницу': 5,
        'Каждую субботу': 6,
        'Каждое воскресенье': 0,
    };

    const [hour, minute] = time.split(':').map(Number);
    const dayOfWeek = days.map(day => dayMap[day]).join(',');

    return `${minute} ${hour} * * ${dayOfWeek}`;
};

export default generateCronExpression;