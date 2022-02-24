import { tns } from "../../node_modules/tiny-slider/src/tiny-slider"; //

function tiny_slider() {
    tns({
        container: '.offer__slider-inner',
        items: 4,
        slideBy: 'page',
        autoplay: true,

      });
};

export default tiny_slider;