import React from 'react'
import Swal from 'sweetalert2'

export function GetSwal(title, message, icon) {
    Swal.fire(title, message, icon)
}

export function GetBasicSwal(title, message, icon) {
    Swal.fire({
        title: title,
        text: message,
        icon: icon,
        confirmButtonText:'Tamam'
    })
    .then((result) => {
        if(result.isConfirmed){
            window.location.reload()
        }
    })
}

export function GetBasicSwalUrl(title, message, icon, url) {
    Swal.fire({
        title: title,
        text: message,
        icon: icon,
        confirmButtonText:'Tamam'
    })
    .then((result) => {
        if(result.isConfirmed){
            window.location.href=process.env.REACT_APP_BASE_URL + url
        }
    })
}

/*
export function GetLongSwal(message, post_data) {
    Swal.fire({
        title: message,
        showCancelButton: true,
        confirmButtonText: 'Evet, eminim',
        cancelButtonText: 'İptal Et'
    }).then((result) => {
        if (result.isConfirmed) {
            const deleteAdmin = axios.delete('https://api.dansfabrika.com/v1/admin/' + id)
                .then((response) => {
                    if (response.status = 200) {
                        Swal.fire('Başarılı!', 'İşlem başarılı', 'success')
                    }
                })
                .catch((error) => {
                    Swal.fire('Başarısız!', error.response.data.message[0], 'error')
                })
        }
    })
}
*/
