export function creatNotification(tokenName, currentTargetState) {
    const notificationOptions = notificationText(tokenName, currentTargetState)
    return new window.Notification(notificationOptions.title, notificationOptions)
}

const notificationText = (token, currentTargetState) => {
    return {
        title: token + " Alert",
        body: token + " has gone " + currentTargetState + " your target price!"
    }
}