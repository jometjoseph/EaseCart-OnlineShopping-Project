import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'

export	const errorAlert = (message1,type,message2) => {
	var result = Swal.fire({
			title: message1,
			showConfirmButton: true,
			showCancelButton: true,
			confirmButtonText: "OK",
			cancelButtonText: "Cancel",
			icon: type
		}
		).then((result) => {
			if (result.isConfirmed) {

				Swal.fire(message2, '', 'success');
				return true;

			} else
				Swal.fire(' Cancelled', '', 'error');
				return false;
		})
		console.log("result from sweealert",result);
	return result;	
}

