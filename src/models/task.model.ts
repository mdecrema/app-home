export interface Task {
    title: string
    description: string,
    startDate: number,
    smallDate: number,
    fromTime: string,
    toTime: string,
    color?: string,
    completed: boolean
}

export const enum TASK_KEY {
    TITLE = 'title',
    DESCRIPTION = 'description',
    STARTDATE = 'startDate',
    SMALLDATE = 'smallDate',
    FROMTIME = 'fromTime',
    TOTIME = 'toTitme',
    COLOR = 'color',
    COMPLETED = 'completed'
}