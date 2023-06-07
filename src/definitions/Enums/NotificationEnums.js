export const NotificationStatusEnum = {
    SİLİNDİ: -1,
    GÖNDERİLDİ: 0,
    OKUNDU: 1
}

export const NotificationTypeEnum = {
    SMS: 0,
    EMAIL: 1,
    BİLDİRİM: 2
}

export function GetNotificationStatusOptions() {
    const enumKeys = Object.keys(NotificationStatusEnum);

    return enumKeys.map((key) => (
        <option key={key} value={NotificationStatusEnum[key]}>
            {key}
        </option>
    ));
}

export function GetNotificationTypeOptions() {
    const enumKeys = Object.keys(NotificationTypeEnum);

    return enumKeys.map((key) => (
        <option key={key} value={NotificationTypeEnum[key]}>
            {key}
        </option>
    ));
}
