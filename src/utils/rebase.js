export const rebase = (numberOfEpocs, epocValue, initialValue) => {
    return numberOfEpocs >= 1 ?
        rebase(numberOfEpocs - 1, valuePlusPercentage(initialValue, epocValue, initialValue)) :
        initialValue
}
export const valuePlusPercentage = (value, percentageToAdd) => {
    return value + value * percentageToAdd / 100
}
export const epocsRemaining = (start, end, epocValue) => {
    return start < end ?
        1 + epocsRemaining(valuePlusPercentage(start, epocValue), end) :
        0
}