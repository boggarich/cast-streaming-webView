import $ from 'jquery';

class CommonJs {

    isOverflown = () => {

        $('.truncatable p').each((index, el) => {
    
            if( $(el)[0].scrollHeight > $(el)[0].clientHeight ) {
    
                $(el).parent('.truncatable')
                .next('.see-more-btn').show()
    
            };
    
        })
        
    }

}

let commonObj = new CommonJs

export default commonObj;