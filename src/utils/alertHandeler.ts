import Swal, { SweetAlertIcon } from "sweetalert2";

export const alert=async (type:SweetAlertIcon, mess:string, err:string, next:any|undefined)=>{
    if(type=='question'){
        Swal.fire({
            title:'Are you sure?',
            text: mess,
            icon:'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
        }).then((result) => {
        if (result.isConfirmed) {
            next();            
        }})
    }else{
        Swal.fire(
            mess,
            err,
            type
        )
    }

}