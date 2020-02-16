function left () {
    pins.analogWritePin(AnalogPin.P1, 0)
    pins.analogWritePin(AnalogPin.P2, 0)
    pins.digitalWritePin(DigitalPin.P8, 1)
    pins.digitalWritePin(DigitalPin.P12, 0)
    item = 0
}
function stop () {
    pins.analogWritePin(AnalogPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P8, 0)
    pins.analogWritePin(AnalogPin.P2, 0)
    pins.digitalWritePin(DigitalPin.P12, 0)
}
function forward () {
    pins.analogWritePin(AnalogPin.P1, 0)
    pins.analogWritePin(AnalogPin.P2, 0)
    pins.digitalWritePin(DigitalPin.P8, 1)
    pins.digitalWritePin(DigitalPin.P12, 1)
}
function backward () {
    pins.analogWritePin(AnalogPin.P1, 1000)
    pins.analogWritePin(AnalogPin.P2, 1000)
    pins.digitalWritePin(DigitalPin.P8, 0)
    pins.digitalWritePin(DigitalPin.P12, 0)
}
function right () {
    pins.analogWritePin(AnalogPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P8, 0)
    pins.analogWritePin(AnalogPin.P2, 0)
    pins.digitalWritePin(DigitalPin.P12, 1)
    item = 0
}
let char: number[] = []
let item = 0
max7219_matrix.setup(
1,
DigitalPin.P16,
DigitalPin.P15,
DigitalPin.P14,
DigitalPin.P13
)
pins.setPull(DigitalPin.P9, PinPullMode.PullUp)
pins.setPull(DigitalPin.P10, PinPullMode.PullUp)
pins.setPull(DigitalPin.P11, PinPullMode.PullUp)
item = 0
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P9) == 0 && pins.digitalReadPin(DigitalPin.P10) == 0 && pins.digitalReadPin(DigitalPin.P11) == 1) {
        forward()
    } else if (pins.digitalReadPin(DigitalPin.P9) == 0 && pins.digitalReadPin(DigitalPin.P10) == 1 && pins.digitalReadPin(DigitalPin.P11) == 0) {
        backward()
    } else if (pins.digitalReadPin(DigitalPin.P9) == 0 && pins.digitalReadPin(DigitalPin.P10) == 0 && pins.digitalReadPin(DigitalPin.P11) == 0) {
        stop()
    } else if (pins.digitalReadPin(DigitalPin.P9) == 1 && pins.digitalReadPin(DigitalPin.P10) == 0 && pins.digitalReadPin(DigitalPin.P11) == 0) {
        right()
    } else if (pins.digitalReadPin(DigitalPin.P9) == 0 && pins.digitalReadPin(DigitalPin.P10) == 1 && pins.digitalReadPin(DigitalPin.P11) == 1) {
        left()
    } else if (pins.digitalReadPin(DigitalPin.P9) == 1 && pins.digitalReadPin(DigitalPin.P10) == 1 && pins.digitalReadPin(DigitalPin.P11) == 1) {
        char = max7219_matrix.getCustomCharacterArray(
        "B00000100,B00001000,B00010000,B00010000,B00010000,B00010000,B00001000,B00000100"
        )
        max7219_matrix.displayCustomCharacter(
        char,
        0,
        true
        )
    } else if (pins.digitalReadPin(DigitalPin.P9) == 1 && pins.digitalReadPin(DigitalPin.P10) == 0 && pins.digitalReadPin(DigitalPin.P11) == 1) {
        char = max7219_matrix.getCustomCharacterArray(
        "B01000000,B00100000,B00010000,B00010000,B00010000,B00010000,B00100000,B01000000"
        )
        max7219_matrix.displayCustomCharacter(
        char,
        0,
        true
        )
    } else if (pins.digitalReadPin(DigitalPin.P9) == 1 && pins.digitalReadPin(DigitalPin.P10) == 1 && pins.digitalReadPin(DigitalPin.P11) == 0) {
        char = max7219_matrix.getCustomCharacterArray(
        "B00000000,B00000000,B00010000,B00010000,B00010000,B00010000,B00000000,B00000000"
        )
        max7219_matrix.displayCustomCharacter(
        char,
        0,
        true
        )
    } else {
        stop()
    }
})

