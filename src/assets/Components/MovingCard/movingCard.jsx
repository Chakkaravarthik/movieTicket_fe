import { useEffect, useState } from "react";


function MovingCard() {

    const [imgsrc, setimgsrc] = useState(null);

    const [imgarr, setimgarr] = useState(["https://t3.ftcdn.net/jpg/05/00/81/96/360_F_500819621_7bRfuKkKyaRYU6aJ1Sa9RBCPdscka6Iq.jpg",
        "https://t4.ftcdn.net/jpg/06/89/49/95/360_F_689499531_MeYeI1VVavgYQRzz0S3JxkQ9VxzgYZQh.jpg",
        "https://wallpapers.com/images/featured/movie-poster-background-1aa3ksi0cu7wydbw.jpg"
    ])


    useEffect(() => {
        let index = 0; // Keep track of the current image index
        const interval = setInterval(() => {
            setimgsrc(imgarr[index]); // Set the current image
            index = (index + 1) % imgarr.length; // Move to the next image, loop back to 0 at the end
        }, 3000);

        return () => clearInterval(interval); // Clear the interval when the component unmounts
    }, []);


    return (
        <>
            <div >
                {imgsrc ? <ImageCard imgsrc={imgsrc} /> : <></>}
            </div>
        </>
    )
}

export default MovingCard;


const ImageCard = ({ imgsrc }) => {

    return (
        <>
            <img style={{ width: "100vw", height: "50vh", }} src={imgsrc}></img>
        </>
    )
}