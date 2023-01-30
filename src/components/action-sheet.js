import React from 'react';
import $ from 'jquery';

export default class ActionSheet extends React.Component {

    constructor(props) {
        super(props);

        this.actionSheet = React.createRef();

    }

    hideActionSheet = () => {

        $(this.actionSheet).find('.action-sheet-content').removeClass('show');
        $(this.actionSheet).find('.action-sheet-bg').hide();

        setTimeout(() => {

            $(this.actionSheet).hide();

        }, 550);

    }

    showActionSheet = () => {

        $(this.actionSheet).show().css('display', 'grid');

        $(this.actionSheet).find('.action-sheet-bg').show();

        setTimeout(() => {

            $(this.actionSheet).find('.action-sheet-content').addClass('show');

        }, 550);

    }

    componentDidMount() {

        let clientY;

        $(this.actionSheet).find('.action-sheet-content .close-btn').on('click', (e) => {

            this.hideActionSheet();

        })

        // $(this.actionSheet).find('.action-sheet-content').on('click', (e) => {

        //     this.hideActionSheet();

        // })

        // $(this.actionSheet).find('.action-sheet-content').on('click', (e) => {

        //     this.hideActionSheet();

        // }).children().click(function(e) {

        //     return false;

        // });

        $(this.actionSheet).find('.action-sheet-content .content').on('touchstart', (e) => {

            clientY = e.touches[0].clientY;

        });

        // $('.action-sheet-content .content').on('touchmove', (e) => {

        //     let deltaY = 0;
        //     let innerHeight = $(e.currentTarget).innerHeight();

        //     deltaY = e.changedTouches[0].clientY - clientY;

        //     if( e.changedTouches[0].clientY - clientY < 0) {

        //         deltaY = 0;

        //     }

        //     console.log(deltaY)

        //     $(e.currentTarget).css('height', `${ (innerHeight - deltaY) }px`);

        // });

        $(this.actionSheet).find('.action-sheet-content .content').on('touchend', (e) => {

                let deltaY;
                let innerHeight = $(e.currentTarget).innerHeight();
              
                deltaY = e.changedTouches[0].clientY - clientY;

                if( (deltaY / innerHeight) > 0.3 ) {

                    this.hideActionSheet();

                };
                
        });

    }

    render() {

        return (
            
            <div className={ 'action-sheet-container ' + this.props.className } ref={el => this.actionSheet = el}>

                <div className='action-sheet-bg'></div>
                <div className='action-sheet-content d-flex flex-column justify-content-end'>

                    <div className='content'>

                        <div className='header d-flex justify-content-between align-items-center'>

                            <h4 className='header-md fw-700'>{ this.props.title }</h4>
                            
                            <div className='btn-position-right'>
                                <button className='btn btn-small btn-purple close-btn'>

                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="341454" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.3552 19.7124L10.2842 12.6413L3.21311 19.7124L0.85609 17.3554L7.92716 10.2843L0.85609 3.21325L3.21311 0.856224L10.2842 7.92729L17.3552 0.856224L19.7123 3.21325L12.6412 10.2843L19.7123 17.3554L17.3552 19.7124Z" fill="341454"/>
                                    </svg>

                                </button>
                            </div>

                        </div>

                        <div className='body'>

                        <> { this.props.children } </>

                        </div>

                    </div>

                </div>

            </div>

        )

    }

}