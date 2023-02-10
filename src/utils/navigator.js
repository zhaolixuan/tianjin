


export default class NavigatorApi {

    success (pos) {
        var crd = pos.coords
        window.lat = crd.latitude
        window.lng = crd.longitude
        console.log('Your current position is:')
        console.log('Latitude : ' + crd.latitude)
        console.log('Longitude: ' + crd.longitude)
        console.log('More or less ' + crd.accuracy + ' meters.')
    }

    error (err) {
        console.warn('ERROR(' + err.code + '): ' + err.message)
    }


    getCurrentPosition () {
        navigator.geolocation.getCurrentPosition(this.success, this.error)

    }
    watchPosition () {
        this.clearWatch()
        this.watchId = navigator.geolocation.watchPosition(this.success, this.error)

    }
    clearWatch () {
        navigator.geolocation.clearWatch(this.watchId)

    }

}



