const translate = (ru, uz) => {
    return localStorage.getItem('language') === 'uz' ? uz : ru
}

export default translate