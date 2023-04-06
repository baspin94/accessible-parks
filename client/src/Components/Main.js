function Main({user}) {

    return (
        <h2>{
            (user.first_name !== undefined)
                ? `Welcome, ${user.first_name}!`
                :  'Welcome!'
            }</h2>
    )
}

export default Main