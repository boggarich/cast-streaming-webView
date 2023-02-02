import { WebRTCAdaptor } from "@antmedia/webrtc_adaptor"
import { getUrlParameter } from "@antmedia/webrtc_adaptor/dist/fetch.stream"
import { generateRandomString } from "@antmedia/webrtc_adaptor/dist/utility"
import $ from 'jquery';

export class AMS {

    webRTCAdaptor=null;
    localVideoId=null
    videoDevices=[]
    audioDevices=[]
    currentVideoDeviceIndex=0;
	

    /**
	 * If publishing stops for any reason, it tries to republish again.
	 */
	 autoRepublishEnabled=true;
	/**
	 * Timer job that checks the WebRTC connection 
	 */
	 autoRepublishIntervalJob=null

	 streamId=null

	 token=null

     rtmpForward=true

    appName='WebRTCAppEE'
    hostName="gudu.tv"
    port="5080"
    protocol="ws"

    debug=true

    maxVideoBitrateKbps=900
    subscriberId = null
    subscriberCode = null

    mediaConstraints = {
		video: true,
		audio: true
	}

    sdpConstraints = {
		OfferToReceiveAudio: false,
		OfferToReceiveVideo: false
	}

    pc_config = {
		'iceServers': [{
			'urls': 'stun:stun1.l.google.com:19302'
		}]
	}

    get websocketURL() {
        return `${this.protocol}://${this.hostName}:${this.port}/${this.appName}/websocket?rtmpForward=${this.rtmpForward}`
    }

    constructor(config) {
		this.startButtonId = config['start_button'] || null
		this.stopButtonId = config['stop_button'] || null
		this.switchButtonId = config['switch_button'] || null
		this.localVideoId = config['videoId'] || null

		if(this.startButtonId){
			this.startButton = document.getElementById(this.startButtonId)
			this.startButton.addEventListener("click", this.handleStartButtonEvent.bind(this), false);
		}
        	
		if(this.stopButtonId){

        	this.stopButton = document.getElementById(this.stopButtonId)
			this.stopButton.addEventListener("click", this.handleStopButtonEvent.bind(this), false);
		}

		if(this.switchButtonId){

        	this.switchButton = document.getElementById(this.switchButtonId)
			this.switchButton.addEventListener("click", this.switchVideoMode.bind(this), false);
		}
		

        this.subscriberId = getUrlParameter("subscriberId")
        this.subscriberCode = getUrlParameter("subscriberCode")
        this.token = getUrlParameter("token")
        this.streamId = getUrlParameter("id") || generateRandomString(9)
        

        this.initWebRTCAdaptor(false, this.autoRepublishEnabled)
    } 

	handleStartButtonEvent(event) {
		this.startStream();
		event.stopPropagation()
	}

	handleStopButtonEvent(event) {
		this.stopStream();
		event.stopPropagation()
	}

    startStream(streamId=null) {
		if(streamId == null){
			this.webRTCAdaptor.publish(this.streamId, this.token, this.subscriberId, this.subscriberCode);
		} else {
			this.webRTCAdaptor.publish(streamId, this.token, this.subscriberId, this.subscriberCode);
		}
        
    }

    stopStream(streamId=null) {
        if (this.autoRepublishIntervalJob != null) {
			clearInterval(this.autoRepublishIntervalJob);
			this.autoRepublishIntervalJob = null;
		}
		if(streamId == null){
			this.webRTCAdaptor.stop(this.streamId);
		} else {
			this.webRTCAdaptor.stop(streamId);
		}
        
    }

    get getNextVideoDevice(){
        this.currentVideoDeviceIndex += 1
        if (this.currentVideoDeviceIndex > 1){
            this.currentVideoDeviceIndex = 0;
        }
        if (this.currentVideoDeviceIndex > this.videoDevices.length){
            this.currentVideoDeviceIndex = 0;
        }
        return this.videoDevices[this.currentVideoDeviceIndex]
    }

	enableStartButton() {
		if(this.startButton)
			this.startButton.disabled = false;
		if (this.stopButton)
			this.switchButton.disabled = false;
	}

    switchVideoMode() {
		// if (chbx.value == "screen") {
		// 	//webRTCAdaptor.switchDesktopWithMicAudio(streamId);
		// 	this.webRTCAdaptor.switchDesktopCapture(this.streamId);
		// }
		// else if (chbx.value == "screenwithcamera") {
		// 	this.webRTCAdaptor.switchDesktopCaptureWithCamera(this.streamId);
		// }
		
		let device = this.getNextVideoDevice
		this.webRTCAdaptor.switchVideoCameraCapture(this.streamId, device.id);
		
	}

    startAnimation() {
        let self = this
		$("#broadcastingInfo").fadeIn(800, function () {
			$("#broadcastingInfo").fadeOut(800, function () {
				var state = self.webRTCAdaptor.signallingState(self.streamId);
				if (state != null && state != "closed") {
					var iceState = self.webRTCAdaptor.iceConnectionState(self.streamId);
					if (iceState != null && iceState != "failed" && iceState != "disconnected") {
						self.startAnimation();
					}
				}
			});
		});
	}

    checkAndRepublishIfRequired() {
		var iceState = this.webRTCAdaptor.iceConnectionState(this.streamId);
		console.log("Ice state checked = " + iceState);

		if (iceState == null || iceState == "failed" || iceState == "disconnected") {
			this.webRTCAdaptor.stop(this.streamId);
			this.webRTCAdaptor.closePeerConnection(this.streamId);
			this.webRTCAdaptor.closeWebSocket();
			this.initWebRTCAdaptor(true, this.autoRepublishEnabled);
		}
	}

    updateStreamStats(obj) {

        $("#average_bit_rate").text(obj.averageOutgoingBitrate);
					
        if (obj.averageOutgoingBitrate > 0) {
            $("#average_bit_rate_container").show();
        }
        else {
            $("#average_bit_rate_container").hide();
        }

        $("#latest_bit_rate").text(obj.currentOutgoingBitrate);
        if (obj.currentOutgoingBitrate > 0) {
            $("#latest_bit_rate_container").show();
        }
        else {
            $("#latest_bit_rate_container").hide();
        }
        var packetLost = parseInt(obj.videoPacketsLost) + parseInt(obj.audioPacketsLost);

        $("#packet_lost_text").text(packetLost);
        if (packetLost > -1) {
            $("#packet_lost_container").show();
        }
        else {
            $("#packet_lost_container").hide();
        }
        var jitter = ((parseFloat(obj.videoJitter) + parseInt(obj.audioJitter)) / 2).toPrecision(3);
        $("#jitter_text").text(jitter);
        if (jitter > 0) {
            $("#jitter_container").show();
        }
        else {
            $("#jitter_container").hide();
        }

        var rtt = ((parseFloat(obj.videoRoundTripTime) + parseFloat(obj.audioRoundTripTime)) / 2).toPrecision(3);
        $("#round_trip_time").text(rtt);
        if (rtt > 0) {
            $("#round_trip_time_container").show();
        }
        else {
            $("#round_trip_time_container").hide();
        }

        $("#source_width").text(obj.resWidth);
        $("#source_height").text(obj.resHeight);
        if (obj.resWidth > 0 && obj.resHeight > 0) {
            $("#source_resolution_container").show();
        }
        else {
            $("#source_resolution_container").hide();
        }

        $("#ongoing_width").text(obj.frameWidth);
        $("#ongoing_height").text(obj.frameHeight);
        if (obj.frameWidth > 0 && obj.frameHeight > 0) {
            $("#ongoing_resolution_container").show();
        }
        else {
            $("#ongoing_resolution_container").hide();
        }

        $("#on_going_fps").text(obj.currentFPS);
        if (obj.currentFPS > 0) {
            $("#on_going_fps_container").show();
        }
        else {
            $("#on_going_fps_container").hide();
        }

        $("#stats_panel").show();

    }

    updateAvailableDevices(obj) {
        
        var i = 0;
        let self = this;
        obj.forEach(function (device) {
            var label = device.label;
            var deviceId = device.deviceId;
            var devices = new Array();

            devices.forEach(function (same) {
                if (same == device.label) {
                    i += 1;
                    label = device.label + " - " + i
                    deviceId = device.deviceId + i
                }
            })
            if (device.kind == "videoinput") {
                self.videoDevices.push({'label':label,'id':device.deviceId})
                
            }
            else if (device.kind == "audioinput") {
                self.audioDevices.push({'label':label,'id':device.deviceId})
            }
            devices.push(device.label)
        });
        
        
    }

    initWebRTCAdaptor(publishImmediately, autoRepublishEnabled) {
		this.webRTCAdaptor = new WebRTCAdaptor({
			websocket_url: this.websocketURL,
			mediaConstraints: this.mediaConstraints,
			peerconnection_config: this.pc_config,
			sdp_constraints: this.sdpConstraints,
			localVideoId: this.localVideoId,
			debug: this.debug,
			bandwidth: this.maxVideoBitrateKbps,
			callback: (info, obj) => {
				if (info == "initialized") {
					console.log("initialized");
					this.enableStartButton()
					// stop_publish_button.disabled = true;
					if (publishImmediately) {
						this.webRTCAdaptor.publish(this.streamId, this.token)
					}

				} else if (info == "publish_started") {

					console.log("publish started");
					this.startButton.disabled = true;
					this.stopButton.disabled = false;
					this.startAnimation();
					if (autoRepublishEnabled && this.autoRepublishIntervalJob == null) {
						this.autoRepublishIntervalJob = setInterval(() => {
							this.checkAndRepublishIfRequired();
						}, 3000);
					}
					this.webRTCAdaptor.enableStats(obj.streamId);

				} else if (info == "publish_finished") {
					this.isDataChannelEnabled = false;
					// designer.undo('all');
					//stream is being finished
					console.log("publish finished");
					this.startButton.disabled = false;
					this.stopButton.disabled = true;
					// $("#stats_panel").hide();
				}
				else if (info == "browser_screen_share_supported") {
					// $(".video-source").prop("disabled", false);

					console.log("browser screen share supported");
					// browser_screen_share_doesnt_support.style.display = "none";
				}
				else if (info == "screen_share_stopped") {
					//choose the first video source. It may not be correct for all cases. 
					// $(".video-source").first().prop("checked", true);
					console.log("screen share stopped");
				}
				else if (info == "closed") {
					//console.log("Connection closed");
					if (typeof obj != "undefined") {
						console.log("Connecton closed: " + JSON.stringify(obj));
					}
				}
				else if (info == "pong") {
				}
				else if (info == "refreshConnection") {
					this.checkAndRepublishIfRequired();
				}
				else if (info == "ice_connection_state_changed") {
					console.log("iceConnectionState Changed: ", JSON.stringify(obj));

				}

				else if (info == "data_channel_opened") {
                    console.log("Data channel opened")
					// if (designer.pointsLength > 0) {
					// 	designer.undo('all');
					// }
					// sendData("request");
					// designer.sync();
				}
				else if (info == "data_received") {
                    console.log("Data received opened")
					// if (obj.data == "request") {
					// 	designer.sync();
					// }
					// else if (obj.data == "clear") {
					// 	designer.clearCanvas();
					// 	designer.sync();
					// }
					// else {
					// 	designer.syncData(JSON.parse(obj.data));
					// }

				}
				else if (info == "updated_stats") {
					//obj is the PeerStats which has fields
					//averageOutgoingBitrate - kbits/sec
					//currentOutgoingBitrate - kbits/sec
					console.log("Average outgoing bitrate " + obj.averageOutgoingBitrate + " kbits/sec"
						+ " Current outgoing bitrate: " + obj.currentOutgoingBitrate + " kbits/sec"
						+ " video source width: " + obj.resWidth + " video source height: " + obj.resHeight
						+ "frame width: " + obj.frameWidth + " frame height: " + obj.frameHeight
						+ " video packetLost: " + obj.videoPacketsLost + " audio packetsLost: " + obj.audioPacketsLost
						+ " video RTT: " + obj.videoRoundTripTime + " audio RTT: " + obj.audioRoundTripTime
						+ " video jitter: " + obj.videoJitter + " audio jitter: " + obj.audioJitter);


					// this.updateStreamStats(obj);

				}
				else if (info == "available_devices") {
					this.updateAvailableDevices(obj)
				}
				else {
					console.log(info + " notification received");
				}
			},
			callbackError: function (error, message) {
				//some of the possible errors, NotFoundError, SecurityError,PermissionDeniedError

				console.log("error callback: " + JSON.stringify(error));
				var errorMessage = JSON.stringify(error);
				if (typeof message != "undefined") {
					errorMessage = message;
				}
				var errorMessage = JSON.stringify(error);
				if (error.indexOf("NotFoundError") != -1) {
					errorMessage = "Camera or Mic are not found or not allowed in your device";
				}
				else if (error.indexOf("NotReadableError") != -1 || error.indexOf("TrackStartError") != -1) {
					errorMessage = "Camera or Mic is being used by some other process that does not let read the devices";
				}
				else if (error.indexOf("OverconstrainedError") != -1 || error.indexOf("ConstraintNotSatisfiedError") != -1) {
					errorMessage = "There is no device found that fits your video and audio constraints. You may change video and audio constraints"
				}
				else if (error.indexOf("NotAllowedError") != -1 || error.indexOf("PermissionDeniedError") != -1) {
					errorMessage = "You are not allowed to access camera and mic.";
				}
				else if (error.indexOf("TypeError") != -1) {
					errorMessage = "Video/Audio is required";
				}
				else if (error.indexOf("ScreenSharePermissionDenied") != -1) {
					errorMessage = "You are not allowed to access screen share";
					$(".video-source").first().prop("checked", true);
				}
				else if (error.indexOf("WebSocketNotConnected") != -1) {
					errorMessage = "WebSocket Connection is disconnected.";
				}
				alert(errorMessage);
			}
		});
}
}
