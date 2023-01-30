import React from 'react';
import '../assets/sass/live.scss';
import Video from 'react-responsive-video';
import $ from 'jquery';
import ActionSheet from '../components/action-sheet';
import isOverflown from '../assets/js/common';

export default class GoLive extends React.Component {

    constructor(props) {
        super(props);

        this.titleActionSheet = React.createRef()
        this.selectChannelActionSheet = React.createRef()

        this.state = {
            channelTwo: '2',
            channelOne: '1',
            selectedChannelRadioVal: '0',
            selectedChannel: "",
            channelSelected: false
        }

    }

    selectChannel = () => {

        this.selectChannelActionSheet.hideActionSheet();

        $('.start-live-overlay').fadeOut(250);
        $('.started-live-overlay').fadeIn(250).css('display', 'flex');

    }

    handleChannelChange = (event) => {


        this.setState({
            
            selectedChannel: event.target.value

        });

        this.setState({
            
            channelSelected: true

        });

    }

    addLiveTitle = () => {

        this.titleActionSheet.hideActionSheet();
        this.selectChannelActionSheet.showActionSheet();

    }

    setWidthOfShowMoreBtn() {

        var truncatedDiv = $('.truncatable');

        var widthOfTruncatedDiv = truncatedDiv.innerWidth();

        $('.expand-content-btn-wrapper').css('width', widthOfTruncatedDiv + 30 + 'px');

       console.log(widthOfTruncatedDiv);

    }

    componentDidMount() {

        isOverflown(document.getElementsByClassName('truncatable'));

        var windowHeight = window.innerHeight;

        $('.comment').on('click', () => {

            $('.live-interactions').scrollTop($('.live-interactions').height());

        });

        $('.show-less-btn').on('click', (e) => {

            $(e.currentTarget).parent('.expand-content-btn-wrapper')
            .prev('.truncatable')
            .removeClass('expanded');
            
        });

        $('.see-more-btn').on('click', (e) => {

            $(e.currentTarget).parent('.expand-content-btn-wrapper')
            .prev('.truncatable')
            .addClass('expanded');
            
        });

        $('.video-player video').css('height' , windowHeight + 'px' );

    }

    render() {

        let channelSelected = this.state.channelSelected;

        return (

            <>
            
                <div className='go-live-container'>

                    <div className='grid-3'>

                        <div className='hidden-lg-up'></div>

                        <div className='video-player-container d-grid'>

                            <div className='overlay started-live-overlay flex-column justify-content-between' style={{ display: 'none' }}>

                                <div className='py-4'>

                                    <div className='d-flex ps-4 pe-3 justify-content-between align-items-center'>

                                        <button className='btn'>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.3552 19.7124L10.2842 12.6413L3.21311 19.7124L0.85609 17.3554L7.92716 10.2843L0.85609 3.21325L3.21311 0.856224L10.2842 7.92729L17.3552 0.856224L19.7123 3.21325L12.6412 10.2843L19.7123 17.3554L17.3552 19.7124Z" fill="white"/>
                                            </svg>
                                        </button>

                                        <span className='f-16 live-indicator'>
                                            <span className='text-white'>Live</span>
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="7.5" cy="7.5" r="7.5" fill="#FF0000"/>
                                            </svg>
                                        </span>

                                        <button className='btn'>
                                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M0.652663 14.4207C1.28966 14.4905 2.82196 14.2671 3.08576 14.1217C2.92926 11.4972 3.39616 9.59996 4.62526 7.72236C7.00146 4.09236 11.4742 2.31066 15.785 3.63686C16.834 3.95966 17.7508 4.42436 18.5127 4.95646C19.945 5.95686 19.6514 5.90496 20.5493 6.86406L16.5885 6.89116L16.5918 9.38526L24.0124 9.37666L24.0165 2.00596C23.5559 1.88266 21.9998 1.88366 21.535 2.00426L21.5363 4.16696C21.3033 4.04556 21.3505 4.09006 21.1419 3.89606C15.576 -1.28084 6.43306 0.00346071 2.31306 6.69726C1.32506 8.30236 0.017563 12.134 0.652763 14.4206L0.652663 14.4207Z" fill="white"/>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M4.26394 21.9832C4.80204 22.2417 6.59614 24.4962 10.6765 25.2293C13.46 25.7295 16.5053 25.2108 18.6584 24.0287C21.7374 22.3383 24.0892 19.4931 24.9053 16.042C25.1454 15.0268 25.4616 12.7485 25.1462 11.7463C24.8727 11.7232 23.0835 11.8474 22.7205 12.0476C22.8516 14.6063 22.3024 16.7584 21.1407 18.515C20.2314 19.89 18.6308 21.4087 16.7829 22.1489C13.4653 23.4776 10.1816 23.1486 7.24254 21.1589C5.84254 20.2111 5.61604 19.5732 5.25834 19.2656L9.20894 19.2186L9.20824 16.7706L1.77344 16.7649L1.78874 24.2008L4.26124 24.1458L4.26414 21.9832H4.26394Z" fill="white"/>
                                            </svg>
                                        </button>

                                    </div>

                                    <div className='d-flex ps-3 mt-1 pe-3 align-items-center justify-content-between'>

                                        <div className='d-flex live-metrics justify-content-between'>

                                            <span>
                                                <span className='me-1'>1.5k</span>
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.22 0.550049C6.315 0.550049 5.505 0.990049 5 1.66505C4.495 0.990049 3.685 0.550049 2.78 0.550049C1.245 0.550049 0 1.80005 0 3.34505C0 3.94005 0.095 4.49005 0.26 5.00005C1.05 7.50005 3.485 8.99505 4.69 9.40505C4.86 9.46505 5.14 9.46505 5.31 9.40505C6.515 8.99505 8.95 7.50005 9.74 5.00005C9.905 4.49005 10 3.94005 10 3.34505C10 1.80005 8.755 0.550049 7.22 0.550049Z" fill="white"/>
                                                </svg>
                                            </span>

                                            <span>

                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6 6C7.38071 6 8.5 4.88071 8.5 3.5C8.5 2.11929 7.38071 1 6 1C4.61929 1 3.5 2.11929 3.5 3.5C3.5 4.88071 4.61929 6 6 6Z" fill="white"/>
                                                    <path d="M5.99813 7.25C3.49312 7.25 1.45312 8.93 1.45312 11C1.45312 11.14 1.56312 11.25 1.70312 11.25H10.2931C10.4331 11.25 10.5431 11.14 10.5431 11C10.5431 8.93 8.50313 7.25 5.99813 7.25Z" fill="white"/>
                                                </svg>
                                                <span className='ms-1'>40</span>
                                            </span>
                                            
                                        </div>

                                        <button className='btn'>

                                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M22.3886 13.4001H18.5261V4.40012C18.5261 2.30012 17.3886 1.87512 16.0011 3.45012L15.0011 4.58762L6.53861 14.2126C5.37611 15.5251 5.86361 16.6001 7.61361 16.6001H11.4761V25.6001C11.4761 27.7001 12.6136 28.1251 14.0011 26.5501L15.0011 25.4126L23.4636 15.7876C24.6261 14.4751 24.1386 13.4001 22.3886 13.4001Z" fill="white"/>
                                            </svg>

                                        </button>

                                    </div>

                                </div>

                                <div>

                                    <div className='live-interactions'>

                                        <div className='position-relative has-show-more'>

                                            <div className='truncatable description scrollbar-hidden'>

                                                <h4 className='text-white f-12 fw-700'>Unity Music Concert Day 2</h4>
                                                <p className='text-white f-10 fw-100'>This is the second day live stream of the Unity concert
                                                </p>

                                            </div>

                                            <div className='expand-content-btn-wrapper'>
                                                <button className='see-more-btn'>See More</button>
                                                <button className='show-less-btn'>Show less</button>
                                            </div>
                                            
                                        </div>

                                        <div className='my-3 comments scrollbar-hidden'>
                                            <div className='d-flex align-items-center'>
                                                <img className="profile-img" src={ process.env.PUBLIC_URL + "/assets/img/pexels-chris.png" } alt="human"/>
                                                <div className='mt-2'>
                                                    <h4 className='f-12 fw-600 white-muted-low'>Grace Catering</h4>
                                                    <p className='f-10 fw-500 white-muted-high'>Wow, great recipe</p>
                                                </div>
                                            </div>
                                            <div className='d-flex align-items-center'>
                                                <img className="profile-img" src={ process.env.PUBLIC_URL + "/assets/img/pexels-chris-1.png" } alt="human"/>
                                                <div>
                                                    <h4 className='f-12 fw-600 white-muted-low'>Raja Mo</h4>
                                                    <p className='f-10 fw-500 white-muted-high'>My girlfriend will love this</p>
                                                </div>
                                            </div>
                                            <div className='d-flex align-items-center'>
                                                <img className="profile-img" src={ process.env.PUBLIC_URL + "/assets/img/pexels-chris-2.png" } alt="human"/>
                                                <div>
                                                    <h4 className='f-12 fw-600 white-muted-low'>Ohemaa's Kitchen <span>Caster</span></h4>
                                                    <p className='f-10 fw-500 white-muted-high'>Thanks for Joining Guyss!... Please Like!!</p>
                                                </div>
                                            </div>
                                            <div className='d-flex align-items-center'>
                                                <img className="profile-img" src={ process.env.PUBLIC_URL + "/assets/img/pexels-chris-3.png" } alt="human"/>
                                                <div>
                                                    <h4 className='f-12 fw-600 white-muted-low'>Kris Mosh</h4>
                                                    <p className='f-10 fw-500 white-muted-high'>I'm learning a lot today.</p>
                                                </div>
                                            </div>
                                            <div className='d-flex align-items-center'>
                                                <img className="profile-img" src={ process.env.PUBLIC_URL + "/assets/img/pexels-chris-3.png" } alt="human"/>
                                                <div>
                                                    <h4 className='f-12 fw-600 white-muted-low'>Kris Mosh</h4>
                                                    <p className='f-10 fw-500 white-muted-high'>I'm learning a lot today.</p>
                                                </div>
                                            </div>
                                            <div className='d-flex align-items-center'>
                                                <img className="profile-img" src={ process.env.PUBLIC_URL + "/assets/img/pexels-chris-3.png" } alt="human"/>
                                                <div>
                                                    <h4 className='f-12 fw-600 white-muted-low'>Kris Mosh</h4>
                                                    <p className='f-10 fw-500 white-muted-high'>I'm learning a lot today.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='d-flex justify-content-between align-items-center'>
                                            <input type="text" placeholder='Comment' className='comment'/>
                                            <div className='share-btn-wrapper'>
                                                <button className='btn'>
                                                    <svg width="30" height="34" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M25 23.7999C23.7333 23.7999 22.6 24.2999 21.7333 25.0833L9.85 18.1666C9.93333 17.7833 10 17.3999 10 16.9999C10 16.5999 9.93333 16.2166 9.85 15.8333L21.6 8.98325C22.5 9.81659 23.6833 10.3333 25 10.3333C27.7667 10.3333 30 8.09992 30 5.33325C30 2.56659 27.7667 0.333252 25 0.333252C22.2333 0.333252 20 2.56659 20 5.33325C20 5.73325 20.0667 6.11659 20.15 6.49992L8.4 13.3499C7.5 12.5166 6.31667 11.9999 5 11.9999C2.23333 11.9999 0 14.2333 0 16.9999C0 19.7666 2.23333 21.9999 5 21.9999C6.31667 21.9999 7.5 21.4833 8.4 20.6499L20.2667 27.5833C20.1833 27.9333 20.1333 28.2999 20.1333 28.6666C20.1333 31.3499 22.3167 33.5333 25 33.5333C27.6833 33.5333 29.8667 31.3499 29.8667 28.6666C29.8667 25.9833 27.6833 23.7999 25 23.7999ZM25 3.66659C25.9167 3.66659 26.6667 4.41659 26.6667 5.33325C26.6667 6.24992 25.9167 6.99992 25 6.99992C24.0833 6.99992 23.3333 6.24992 23.3333 5.33325C23.3333 4.41659 24.0833 3.66659 25 3.66659ZM5 18.6666C4.08333 18.6666 3.33333 17.9166 3.33333 16.9999C3.33333 16.0833 4.08333 15.3333 5 15.3333C5.91667 15.3333 6.66667 16.0833 6.66667 16.9999C6.66667 17.9166 5.91667 18.6666 5 18.6666ZM25 30.3666C24.0833 30.3666 23.3333 29.6166 23.3333 28.6999C23.3333 27.7833 24.0833 27.0333 25 27.0333C25.9167 27.0333 26.6667 27.7833 26.6667 28.6999C26.6667 29.6166 25.9167 30.3666 25 30.3666Z" fill="white" fillOpacity="0.6"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                    </div>

                                    {/* <div className='d-flex live-controls-wrapper align-items-center flex-column justify-content-center'>
                                        <p className='text-yellow mb-1'>0:00</p>
                                        <div className='go-live-btn-wrapper d-flex align-items-center justify-content-center mb-1'>
                                        
                                            <button className='btn go-live-btn' onClick={ () => this.setState({ showActionSheet: true }) }></button>
                                        
                                        </div>
                                        <p className='text-white f-12'>End Live</p>
                                    </div> */}

                                </div>

                            </div>

                            <div className='start-live-overlay flex-column justify-content-between'>

                                <div className='d-flex py-4 ps-4 pe-3 justify-content-between'>

                                    <button className='btn'>
                                        <svg width="20" height="20"
                                         viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.3552 19.7124L10.2842 12.6413L3.21311 19.7124L0.85609 17.3554L7.92716 10.2843L0.85609 3.21325L3.21311 0.856224L10.2842 7.92729L17.3552 0.856224L19.7123 3.21325L12.6412 10.2843L19.7123 17.3554L17.3552 19.7124Z" fill="white"/>
                                        </svg>
                                    </button>
                                    <button className='btn'>
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M0.652663 14.4207C1.28966 14.4905 2.82196 14.2671 3.08576 14.1217C2.92926 11.4972 3.39616 9.59996 4.62526 7.72236C7.00146 4.09236 11.4742 2.31066 15.785 3.63686C16.834 3.95966 17.7508 4.42436 18.5127 4.95646C19.945 5.95686 19.6514 5.90496 20.5493 6.86406L16.5885 6.89116L16.5918 9.38526L24.0124 9.37666L24.0165 2.00596C23.5559 1.88266 21.9998 1.88366 21.535 2.00426L21.5363 4.16696C21.3033 4.04556 21.3505 4.09006 21.1419 3.89606C15.576 -1.28084 6.43306 0.00346071 2.31306 6.69726C1.32506 8.30236 0.017563 12.134 0.652763 14.4206L0.652663 14.4207Z" fill="white"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M4.26394 21.9832C4.80204 22.2417 6.59614 24.4962 10.6765 25.2293C13.46 25.7295 16.5053 25.2108 18.6584 24.0287C21.7374 22.3383 24.0892 19.4931 24.9053 16.042C25.1454 15.0268 25.4616 12.7485 25.1462 11.7463C24.8727 11.7232 23.0835 11.8474 22.7205 12.0476C22.8516 14.6063 22.3024 16.7584 21.1407 18.515C20.2314 19.89 18.6308 21.4087 16.7829 22.1489C13.4653 23.4776 10.1816 23.1486 7.24254 21.1589C5.84254 20.2111 5.61604 19.5732 5.25834 19.2656L9.20894 19.2186L9.20824 16.7706L1.77344 16.7649L1.78874 24.2008L4.26124 24.1458L4.26414 21.9832H4.26394Z" fill="white"/>
                                        </svg>
                                    </button>

                                </div>

                                <div className='d-flex live-controls-wrapper align-items-center flex-column justify-content-center'>
                                    <p className='text-yellow mb-1'>0:00</p>
                                    <div className='go-live-btn-wrapper d-flex align-items-center justify-content-center mb-1'>
                                    
                                        <button className='btn go-live-btn' onClick={ () => this.titleActionSheet.showActionSheet() }></button>
                                    
                                    </div>
                                    <p className='text-white f-12'>Start Live</p>
                                </div>

                            </div>

                            <div className="video-player d-flex justify-content-center">
                                <Video 
                                    id="video-player"
                                    mp4={ process.env.PUBLIC_URL + '/assets/videos/test-video.mp4' } 
                                    objectFit={'contain'}
                                />
                            </div>

                            <div className='video-player-bg'>

                                <Video 
                                    id="video-player-bg"
                                    mp4={ process.env.PUBLIC_URL + '/assets/videos/test-video.mp4' } 
                                    objectFit={'cover'}
                                />

                            </div>

                        </div>

                        <div className='hidden-lg-up'></div>

                    </div>

                </div>

                <ActionSheet 
                    title="Select a Channel"
                    ref={el => this.selectChannelActionSheet = el}
                    className="select-channel-action-sheet"
                >
                    
                    <div className='mt-2'>
                        
                        <div className='channel-list'>

                            <div className='d-flex justify-content-between align-items-center mb-4'>

                                <div className='d-flex align-items-center'>
                                    <img src={ process.env.PUBLIC_URL + "/assets/img/pexels-creation-hill.png" } alt="human" style={{ width: '52px', height: '52px', borderRadius: '10px' }}/>
                                    <h4 className='fw-600 ms-3 f-12 text-truncated'>Kojo Mills Travels</h4>
                                    <p className='fw-500 f-12 text-truncated'>1.5 K Subscribers</p>
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" value="1" checked={ this.state.selectedChannel == '1' } onChange={ this.handleChannelChange } />
                                </div>

                            </div>

                            <div className='d-flex justify-content-between align-items-center mb-4'>

                                <div className='d-flex align-items-center'>
                                    <img src={ process.env.PUBLIC_URL + "/assets/img/pexels-creation-hill.png" } alt="human" style={{ width: '52px', height: '52px', borderRadius: '10px' }} />
                                    <h4 className='fw-600 ms-3 f-12 text-truncated'>Music by  Kojo Mills</h4>
                                    <p className='fw-500 f-12 text-truncated'>1.5 K Subscribers</p>
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" value="2" checked={ this.state.selectedChannel == '2' } onChange={ this.handleChannelChange } />
                                </div>

                            </div>

                        </div>

                        
                        <button className='btn btn-violet mb-4 mt-4' id="selectChannelBtn" disabled={ !channelSelected } onClick={this.selectChannel} >Done</button>

                    </div>

                </ActionSheet>

                <ActionSheet 
                    title="Title"
                    ref={el => this.titleActionSheet = el}
                >
                    
                        <div className='mb-5 mt-3'>
                            <input className='form-control' type="text" placeholder="Enter a title for your live" />
                        </div>

                        <div className='mb-5'>
                            <textarea className='form-control' rows={3} placeholder="Enter a description for your live" />
                        </div> 

                        <button className='btn btn-violet mb-4' id="addLiveTitleBtn" onClick={this.addLiveTitle} >Done</button>

                </ActionSheet>

            </>
           
        );

    }

}