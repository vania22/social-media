export const getUserColor = (id) => {
    let color = '#'
    for(let i = 5; i < id.length; i++){
        if(color.length === 7){
            break
        }
        color += id[i]
    }

    return color
}
