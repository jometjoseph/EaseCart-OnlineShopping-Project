import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from 'yup';

function Registration() {
    const schema = yup.object().shape({
        name: yup.string().required('* Name is required'),
        email: yup.string().email('email is not valid').required("Email is required"),
        phoneNumber: yup.string("Phone number is not valid").required("Phone no is required"),
        dateOfBirth: yup.date().required('* Dob is required'),
        password: yup
            .string()
            .min(8, '* Password not valid')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                '* invalid password'
            )
            .required('* Password is required'),
        confirmPassword: yup.string().oneOf([yup.ref("password"), "password doesn't match"]).required("password is required")
    });

    const onSubmit = async (data) => {
        console.log("data to be submitted ", data);
        console.log("name is ", data.name);
        const RegData = {
            "Name": data.name,
            "Email": data.email,
            "PhoneNumber": data.phoneNumber,
            "Password": data.password,
            "DateOfBirth": data.dateOfBirth
        };

        try {
            await axios.post('https://localhost:7258/register',RegData)
            .then(res => {
                console.log("result after registration", res)
            })
}
        catch (err) {
    console.log("error while registration", err)
}
    
    }
const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
});
return (
    <section class="vh-100 bg-image">
        <div class="mask d-flex align-items-center h-100 gradient-custom-3">
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                        <div class="card" style={{ borderRadius: "15px" }}>
                            <div class="card-body p-5">
                                <h2 class="text text-center mb-5">Create an Account</h2>

                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <div class="form-outline mb-4">
                                        <input type="text" id="name" class="form-control form-control-md" placeholder=" Name"
                                            {...register("name", { required: true, maxLength: 50 })} />
                                        <div id='passwordHelp' className='form-text text-danger'>{errors.name?.message}</div>
                                    </div>

                                    <div class="form-outline mb-4">
                                        <input type="email" id="email" class="form-control form-control-md" placeholder="Email Address"
                                            {...register("email", { required: true, maxLength: 50 })} />
                                        <div id='passwordHelp' className='form-text text-danger'>{errors.email?.message}</div>
                                    </div>
                                    <div class="form-outline mb-4">
                                        <input type="text" id="phoneNumber" class="form-control form-control-md" placeholder="PhoneNumber"
                                            {...register("phoneNumber", { required: true, maxLength: 10 })} />
                                        <div id='passwordHelp' className='form-text text-danger'>{errors.phoneNumber?.message}</div>
                                    </div>
                                    <div class="form-outline mb-4">
                                        <input type="date" id="Dob" class="form-control form-control-md" placeholder="Date of Birth"
                                            {...register("dateOfBirth", { required: true, valueAsDate: true })} />
                                        <div id='passwordHelp' className='form-text text-danger'>{errors.dateOfBirth?.message}</div>
                                    </div>

                                    <div class="form-outline mb-4">
                                        <input type="password" id="password" class="form-control form-control-md" placeholder="Password"
                                            {...register("password", { required: true, validate: true })} />
                                        <div id='passwordHelp' className='form-text text-danger'>{errors.password?.message}</div>
                                    </div>

                                    <div class="form-outline mb-4">
                                        <input type="password" id="cpassword" class="form-control form-control-md" placeholder="Confirm Password"
                                            {...register("confirmPassword", { required: true, validate: true })} />
                                        <div id='passwordHelp' className='form-text text-danger'>{errors.confirmPassword?.message}</div>
                                    </div>

                                    <div class="form-check d-flex justify-content-center mb-5">
                                        <input class="form-check-input me-2" type="checkbox" value="" id="terms" />
                                        <label class="form-check-label" for="terms">
                                            I agree all statements in <a href="#!" class="text-body"><u>Terms of service</u></a>
                                        </label>
                                    </div>

                                    <div class="d-flex justify-content-center">
                                        <button type="submit"
                                            class="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                                    </div>

                                    <p class="text-center text-muted mt-5 mb-0">Have already an account? <Link to={'/'}
                                        class="fw-bold text-body"><u>Login here</u></Link></p>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
)
}

export default Registration;