import Swal from 'sweetalert2'

export	const errorAlert = (props) => {
		Swal.fire({
			title: 'Continue to delete',
			showConfirmButton: true,
			showCancelButton: true,
			confirmButtonText: "OK",
			cancelButtonText: "Cancel",
			icon: 'warning'
		}
		).then((result) => {
			if (result.isConfirmed) {

				Swal.fire('Continue to delete', '', 'success');

			} else
				Swal.fire(' Cancelled', '', 'error')
		})
}

