import React, { useState, useEffect } from 'react'
import Qrcode from "qrcode"


const Qr = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [address, setAddress] = useState('')
    const [url, setUrl] = useState('')
    const [location, setLocation] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true)






    useEffect(() => {
        setIsDisabled(
            firstName.length === 0 ||
            lastName.length === 0 ||
            mobileNumber.length !== 10 ||
            address.length === 0
        );
    }, [firstName, lastName, mobileNumber, address]);



    const handleQrCode = async () => {
        if (
            (!isDisabled)
        ) {
            setIsDisabled(false)
            try {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        const qrData = `${firstName} ${lastName}\nMobile: ${mobileNumber}\nAddress: ${address}\nLatitude: ${latitude}, Longitude: ${longitude}`;

                        const code = await Qrcode.toDataURL(qrData);
                        setUrl(code);
                        setLocation({ latitude, longitude });
                    },
                    (error) => {
                        console.log(error);
                        alert('Failed to get location.');
                    }
                );
                setFirstName("")
                setLastName("")
                setAddress("")
                setMobileNumber("")

            } catch (error) {
                console.log(error);
            }
        } else {
            alert('There is an error');
        }
    };


    return (
        <div>
            <div className='w-full  px-6 py-7'>
                <div className='h-36 bg-white shadow-lg w-full rounded-lg flex justify-center items-center'>

                    <div className='h-20 bg-indigo-500  text-white font-mono font-medium w-full mx-5 rounded-sm uppercase text-3xl flex justify-center items-center'>
                        <h1>Generating the QR Code</h1>
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-center'>

                <div className='border-[1px] shadow-2xl rounded-md border-slate-300 px-5 py-3' >


                    <div className='mb-5'>
                        <label htmlFor="firstName">First Name:</label>
                        <input type="text" placeholder='Enter Your Name' onChange={(e) => setFirstName(e.target.value)} value={firstName} className='outline-none w-full h-8 text-base flex justify-center items-center capitalize' />
                        <hr className='my-1' />
                    </div>

                    <div className='mb-5'>
                        <label htmlFor="lastName">Last Name:</label>
                        <input type="text" placeholder='Enter Your Name' onChange={(e) => setLastName(e.target.value)} value={lastName} className='outline-none w-full h-8 text-base flex justify-center items-center capitalize' />
                        <hr className='my-1' />
                    </div>

                    <div className='mb-5'>
                        <label htmlFor="mnumber">Mobile Number:</label>
                        <input type="text" placeholder='Mobile Number' onChange={(e) => setMobileNumber(e.target.value.replace(/\D/, ''))} value={mobileNumber}  maxLength = {10} className='outline-none w-full h-8 text-base flex justify-center items-center capitalize' />
                        <hr className='my-1' />
                    </div>


                    <div className='mb-5 flex flex-col'>
                        <label htmlFor="address">Address:</label>
                        <textarea name="address" id="" className='w-96 rounded-sm h-28 outline-none border-2 border-slate-100 py-2' placeholder='Enter your address' onChange={(e) => setAddress(e.target.value)}>

                        </textarea>
                        <button
                            className={`${isDisabled ? 'bg-purple-400' : 'bg-purple-600'
                                } text-white font-['Poppins'] my-2 px-2 h-9 rounded-sm w-52`}
                            onClick={() => {
                                handleQrCode();
                            }}

                        >
                            Generate QR
                        </button>
                    </div>

                    {
                        url ? (<a href={url} download><img src={url} className="cursor-pointer" alt="No-image-found" /></a>) : null
                    }

                </div>
            </div>
        </div>
    )
}

export default Qr
