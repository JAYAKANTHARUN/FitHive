import React from "react";

const Home = () => {
    const images = [
        "https://www.si.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cq_auto:good%2Cw_1200/MTk0NDYwOTQ0Nzc0OTk3NTA5/workout-apps-for-men_hero.png",
        "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/17883764/pexels-photo-17883764/free-photo-of-man-practising-on-a-gym-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/1640768/pexels-photo-1640768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/3764011/pexels-photo-3764011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ];
    return (
        <div>
            <div className="home">
                <div className="hometext1">
                    <h1>Welcome to <span>Fithive</span>,<br /> your ultimate destination for fitness, wellness, and healthy living</h1>
                </div>
                <div className="images">
                    <img
                        src={images[0]}
                        alt={`error`}
                        className="homeimager"
                    />
                </div>
            </div>
            <hr />
            <div className="home">
                
                <div className="images">
                    <img
                        src={images[1]}
                        alt={`error`}
                        className="homeimagel"
                    />
                </div>
                <div className="hometext">
                    <h1>Embark on a transformative journey with FitHive. Discover the power of balanced nutrition, effective workouts, and a supportive community</h1>
                </div>
            </div>
            <hr />
            <div className="home">
                <div className="hometext">
                    <h1>Elevate your fitness game with us. We offer expert guidance, motivational resources, and a variety of tools to help you achieve your health goals</h1>
                </div>
                <div className="images">
                    <img
                        src={images[2]}
                        alt={`error`}
                        className="homeimager"
                    />
                </div>
            </div>
            <hr />
            <div className="home">
                
                <div className="images">
                    <img
                        src={images[3]}
                        alt={`error`}
                        className="homeimagel"
                    />
                </div>
                <div className="hometext">
                    <h1>Unlock your potential with our comprehensive wellness platform. From nutrition tips to workout plans, we're here to guide you every step of the way</h1>
                </div>
            </div>
            <hr />
            <div className="home">
                <div className="hometext">
                    <h1>Join our vibrant community of health enthusiasts. Connect, learn, and grow as you embark on a path of self-improvement and holistic wellness</h1>
                </div>
                <div className="images">
                    <img
                        src={images[4]}
                        alt={`error`}
                        className="homeimager"
                    />
                </div>
            </div>
        </div>
    )
}

export default Home;