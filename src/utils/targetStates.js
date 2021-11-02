
export const TargetStates = {
    ABOVE: 'above',
    BELOW: 'below',
    NONE: 'none'
}
export const currentTargetState = (price, target) => {
    return !target || target === 0 ?
        TargetStates.NONE :
        target < price ?
            TargetStates.ABOVE :
            TargetStates.BELOW
}