function NameLength(name, NameLength) {
    if (NameLength === undefined) {
        if (name.length > 6) {
            return name.slice(0, 6) + "..."
        }
    } else {
        if (name.length > NameLength) {
            return name.slice(0, NameLength) + "..."
        } else {
            return name
        }
    }
}

export default NameLength