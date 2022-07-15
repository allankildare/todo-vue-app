import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(relativeTime)
dayjs.extend(LocalizedFormat)

export function formatDate(date: string) {
    return dayjs(date).format('DD/MM/YYYY [at] LT')
}

export function timeFromNow(date: string) {
    return dayjs(date).fromNow()
}

export function isTaskLate(date: string) {
    const isLate = dayjs(date).isBefore(dayjs())
    return isLate
}
