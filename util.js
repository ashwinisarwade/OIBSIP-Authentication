const isNull = (value) => {

    return (value === null || value.length === 0)

}


const somethingWentWrong = () =>{
    return {
        status:{
            code:-1,
            message:"Something went wrong"
        }
    }
}

module.exports = {
    isNull,
    somethingWentWrong
}