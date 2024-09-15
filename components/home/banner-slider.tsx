'use client'
import React from 'react';
import {Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const responsiveSettings = [

    {
        breakpoint: 500,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 3
        }
    },

];
const Example = () => {
    return (
        <div>
            <Slide slidesToScroll={2} slidesToShow={2} indicators={true} >
                <img
                    src="https://htcamera.htskys.com/wp-content/uploads/2024/07/Banner-web-smart-xpro-htcamera-desktop.png"
                    alt="Slide 1"/>
                <img
                    src="https://htcamera.htskys.com/wp-content/uploads/2024/07/Banner-web-pocket-3-htcamera-desktop.png"
                    alt="Slide 1"/>
                <img
                    src="https://htcamera.htskys.com/wp-content/uploads/2024/09/banner-web-gopro-13-pre-order-desktop.png"
                    alt="Slide 1"/>
                {/*<img*/}
                {/*    src="https://htcamera.htskys.com/wp-content/uploads/2024/07/Banner-web-pocket-3-htcamera-desktop.png"*/}
                {/*    alt="Slide 1"/>*/}
                {/*<img*/}
                {/*    src="https://htcamera.htskys.com/wp-content/uploads/2024/07/Banner-web-pocket-3-htcamera-desktop.png"*/}
                {/*    alt="Slide 1"/>*/}
            </Slide>
        </div>
    );
};

export default Example;