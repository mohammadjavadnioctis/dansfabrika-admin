import React from 'react'

const ErrorEnum = {
    AUTH_EMAIL_PASSWORD_ERROR: 'Eposta veya parola hatalı',
    AUTH_2FA_ERROR: 'Onay kodu hatalı',

    QUEUE_REQUIRED: 'Sıra boş geçilemez',
    INTERNAL_SERVER_ERROR: 'Bilinmeyen bir hata ile karşılaşıldı. Daha sonra tekrar deneyiniz',

    EMAIL_REQUIRED: 'Eposta boş geçilemez',
    EMAIL_UNIQUE: 'Bu eposta zaten kullanılıyor',
    EMAIL_INVALID: 'Geçersiz eposta',
    SMS_POST_ERROR: 'SMS gönderim hatası',
    CODE_REQUIRED: 'Onay kodu boş geçilemez',

    TITLE_REQUIRED: 'Başlık boş geçilemez',
    MESSAGE_REQUIRED: 'Mesaj boş geçilemez',

    PROCESS_DATE_REQUIRED: 'İşlem tarihi boş geçilemez',
    PROCESS_REQUIRED: 'İşlem boş geçilemez',
    PROCESS_TYPE_REQUIRED: 'İşlem tipi boş geçilemez',

    NEW_PASSWORD_REQUIRED: 'Yeni parola boş geçilemez',
    OLD_PASSWORD_AGAIN_REQUIRED: 'Eski parola boş geçilemez',
    OLD_PASSWORD_REQUIRED: 'Eski parola boş geçilemez',
    OLD_AND_NEW_DOESNT_MATCH: 'Parolalar eşleşmiyor',

    COURSE_REQUIRED: 'Akademi boş geçilemez',
    ATTENDANCE_DATE_REQUIRED: 'Yoklama tarihi boş geçilemez',

    DAY_REQUIRED: 'Gün boş geçilemez',
    LESSON_REQUIRED: 'Ders boş geçilemez',

    ONSALE_REQUIRED: 'Satış aktifliği boş geçilemez',
    COURSETYPE_REQUIRED: 'Akademi tipi boş geçilemez',
    TRAINER_REQUIRED: 'Eğitmen boş geçilemez',
    CAPACITY_REQUIRED: 'Kapasite boş geçilemez',
    DANCE_LEVEL_REQUIRED: 'Dans seviyesi boş geçilemez',
    DANCE_TYPE_REQUIRED: 'Dans tipi boş geçilemez',

    END_DATE_REQUIRED: 'Bitiş tarihi boş geçilemez',
    START_DATE_REQUIRED: 'Başlangıç tarihi boş geçilemez',

    END_TIME_REQUIRED: 'Bitiş saati boş geçilemez',
    START_TIME_REQUIRED: 'Başlangıç saati boş geçilemez',

    PRICE_REQUIRED: 'Fiyat boş geçilemez',

    IDENTITY_REQUIRED: 'Kimlik no boş geçilemez',

    CREDIT_REQUIRED: 'Katılım hakkı boş geçilemez',

    SELLBY_REQUIRED: 'Satış tarihi boş geçilemez',

    ID_REQUIRED: 'ID boş geçilemez',

    STUDENT_REQUIRED: 'Öğrenci boş geçilemez',

    IMAGE_REQUIRED: 'Görsel boş geçilemez',
    DESCRIPTION_REQUIRED: 'Açıklama boş geçilemez',

    ID_MUST_NUMBER: 'ID sayısal veri tipinde olmalıdır',

    PASSWORD_REQUIRED: 'Parola boş geçilemez',
    PASSWORD_MIN: 'Parolanız minimum 8 karakter olmalıdır',

    NAME_LENGTH: 'İsim boş geçilemez',

    TIME_REQUIRED: 'Tarih/Zaman boş geçilemez',

    TYPE_REQUIRED: 'Tip boş geçilemez',
    STUDENT_OR_COURSE_REQUIRED: 'Öğrenci veya akademi boş geçilemez',

    REFEREDID_REQUIRED: 'Referans ID boş geçilemez',

    NAME_REQUIRED: 'İsim boş geçilemez',
    NAME_MAX: 'İsim maksimum 60 karakter olabilir',

    STATUS_REQUIRED: 'Durum boş geçilemez',

    ROLE_REQUIRED: 'Rol/Yetki boş geçilemez',

    PHONE_REQUIRED: 'Telefon boş geçilemez',
    PHONE_UNIQUE: 'Bu telefon numarası zaten sistemde kayıtlı',
    PHONE_INVALID: 'Geçersiz telefon numarası',

    HAVENT_RECORD: 'Kayıt bulunamadı',


    NO_COURSE_RECORD: 'Bu kursa kaydınız bulunmamaktadır',

    BAD_REQUEST: 'Eksik veya hatalı bilgiler',
    PRIOTRY_REQUIRED: 'Öncelik boş geçilemez',
}

export function ControlErrorMessage(message) {
    const enumKeys = Object.keys(ErrorEnum);
    for (const key of enumKeys) {
        if (key === message) {
            return ErrorEnum[key];
        }
    }

    return message;
}
