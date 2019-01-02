// wakeLock requires https and is currently very experimental.
// I think it's best if this branch is left alone while other technology is considered.
//navigator.wakeLock is the main standby API property.
//request method requests the computer to not enter standby mode. Here "display" indicates that the monitor shouldn't enter standby mode.
navigator.wakeLock.request("display").then(
    function successFunction() {
        // success
        console.log("display wakelock success")
    },
    function errorFunction() {
        // error
        console.log("display wakelock error")
    });
//here system indicates CPU, GPU, radio, wifi etc.
navigator.wakeLock.request("system").then(
    function successFunction() {
        // success
        console.log("system wakelock success")
    },
    function errorFunction() {
        // error
        console.log("system wakelock error")
    }
);
//release() is used to release the lock.
// navigator.wakeLock.release("display");
