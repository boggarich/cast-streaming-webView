let apiDomain = 'http://45.63.116.200'

export let apis = {

    addComment: (live_id) => { return apiDomain + `/api/livestream/${live_id}/comment` },
    setLiveDetails: apiDomain + '/api/livestream/save',
    getUserChannels: apiDomain + '/api/user/channels'
    
}