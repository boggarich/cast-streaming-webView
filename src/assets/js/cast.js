import $ from 'jquery'

(function () {
    var params = {},
    r = /([^&=]+)=?([^&]*)/g;

    function d(s) {
        return decodeURIComponent(s.replace(/\+/g, ' '));
    }
    var match, search = window.location.search;
    while (match = r.exec(search.substring(1)))
        params[d(match[1])] = d(match[2]);
    window.params = params;
})();


window.Cast = {
    url:'',

    send: function (data, method, callback=null, url=this.url) {
        let self = this;
        
        $.ajax({
            url: url,
            dataType: "json",
            method: method,
            data : data,
        }).done(function(response) {

            
            

            self.stop_loading();

            if (callback) {
                callback(response)
            }

        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            self.stop_loading();
            self.error_message(errorThrown);
            callback(null, errorThrown)
        });
    },
    post: function (data, callback=null, url=this.url) {
        let self = this;
        self.send(data,"POST",callback, url)
    },
    get: function (data, callback=null, url=this.url) {
        let self = this;
        self.send(data,"GET",callback,url)
    },
    _get_data: function(action) {
        // var pos_form = document.forms[0];
        // var form_data = new FormData(pos_form);
        // var post_data = [];

        var post_data = $(this.main_form).serializeArray().reduce(function(obj, item) {
            obj.push(`${item.name}=${encodeURIComponent(item.value)}`);
            return obj;
        }, []);

        post_data.push('action='+action);
        //post_data['action'] = action

        return post_data;
    },
    _get_csrf_token:function(){
        return $("input:hidden[name=csrfmiddlewaretoken]").val();
    },
    error_message:function(message) {

    },
    success_message:function(message) {
        

    },
    start_loading:function() {
        $("#indicator").removeClass('d-none');
        this.is_loading = true;
    },
    stop_loading:function() {
        $("#indicator").addClass('d-none');
        this.is_loading = false;
    },

    comment:function() {

    },
    like:function() {
        
    }
}