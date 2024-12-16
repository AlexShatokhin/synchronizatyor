const daysOfWeek = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

const decodeCronExpression = (cronExpression: string): string => {
    const [minute, hour, , , days] = cronExpression.split(' ');

    const daysArray = days.split(',').map(day => daysOfWeek[parseInt(day)]);
    const daysString = daysArray.join(', ');

    return `Каждые ${daysString} ${hour}:${minute}`;
};

export default decodeCronExpression;