import dayjs from 'dayjs';

export function timeToNormalStr(time: number): string {
    return dayjs(time).format('MM-DD HH:mm');
}

const WEEK_TIP = ['日', '一', '二', '三', '四', '五', '六'];
const DAY_TIP = ['今天', '昨天'];

export function timeToNearDayStr(time: number): [string, string] {
    const date = dayjs(time);
    const diff = dayjs().diff(date, 'day');

    return [
        DAY_TIP[diff] ?? '',
        `${date.format('MM月DD日')} 星期${WEEK_TIP[date.day()]} ${date.format(
            'HH:mm'
        )}`,
    ];
}
