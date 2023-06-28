function Currency(money) {
    var formatter = new Intl.NumberFormat('uz', {
        style: 'currency',
        currency: 'UZS'
    })

    return formatter.format(money);
}

export default Currency