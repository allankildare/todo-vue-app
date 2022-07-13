import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export function isTaskLate(date: string) {
    const isLate = dayjs(date).isBefore(dayjs())
    return isLate
}
