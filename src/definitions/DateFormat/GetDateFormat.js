import React from 'react'
import { format } from 'date-fns'

export function SetDateFormat(date) {
    const isoDate = date;
    const formattedDate = format(new Date(isoDate), 'yyyy-MM-dd');

    return formattedDate;
}

export function SetDateTimeFormat(date) {
    const isoDate = date;
    const formattedDate = format(new Date(isoDate), 'yyyy-MM-dd HH:mm');

    return formattedDate;
}


