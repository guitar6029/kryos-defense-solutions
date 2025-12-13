type Status = 'STABLE' | 'WEAK' | 'LOST'

export type LinkState = {
    status: Status,
    signalQuality: number
}