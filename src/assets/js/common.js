import $ from 'jquery';
import axios from 'axios';
import { apis } from './apis';
import { AMS } from './ams'

class CommonJs {

    navigateBack() {

        if (window.navigateBack) {

            window.navigateBack.postMessage('');

        }

    }

    showMoreDescription() {

        $('.see-more-btn').on('click', (e) => {

            $(e.currentTarget).parent('.has-show-more')
            .find('.truncatable')
            .removeClass('clamped')
            .addClass('expanded');

            $(this).hide();
            
        });

    }

    showLessDescription() {

        $('.show-less-btn').on('click', (e) => {

            $(e.currentTarget).parent('.has-show-more')
            .find('.truncatable')
            .removeClass('expanded');

            setTimeout(() => {

                $(e.currentTarget).parent('.has-show-more')
                .find('.truncatable')
                .addClass('clamped');

                $('.see-more-btn').show();

            }, 250);
                
        });

    }

    scrollToBottom = (divId) => {

        let scrollDiv = $(divId);

        scrollDiv.animate({ scrollTop: $(scrollDiv).scrollHeight }, 1000);

        // console.log(scrollDiv);

    }

    addComment = (evnt, self) => {

        if(self.state.comment && evnt.keyCode === 13) {

            return axios({
                method: 'post',
                url: apis.addComment(self.state.streamDetails.stream_id),
                headers: {
                    'Authorization': 'Bearer ' + self.state.authBearer
                },
                data: {
                    comment: self.state.comment
                }
            })

        }

        return new Promise((resolve, reject) => {

            resolve('enter key not pressed');

        })

    }

    initAMS = (self) => {

        const ams = new AMS({
            'videoId': 'video-player',
            'switch_button': 'switch_button'
        });
        
        self.setState({ ams: ams });

    }

    getUserData = (self) => {

        let params = new URLSearchParams(document.location.search);

        let authBearer = params.get("token");

        // let userPic = params.get("user_pic");

        // this.setState({ userPic: userPic });

        
        self.setState({ authBearer: authBearer });

    }

    isOverflown = () => {

        $('.truncatable p').each((index, el) => {
    
            if( $(el)[0].scrollHeight > $(el)[0].clientHeight ) {
    
                $(el).parent('.truncatable')
                .next('.see-more-btn').show()
    
            };
    
        })
        
    }

}

let commonObj = new CommonJs()

export default commonObj;