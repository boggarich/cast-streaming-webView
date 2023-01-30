import $ from 'jquery';

let isOverflown = () => {

    $('.has-show-more').each((index, el) => {

        var truncatable = $(el).find('.truncatable');

        console.log(truncatable[0].clientWidth)

        // if( $(el)[0].clientWidth > truncatable[0].clientWidth ) {

        //     console.log(truncatable.next('.see-more-btn').hide());

        // };

       

    })
    
}

export default isOverflown;