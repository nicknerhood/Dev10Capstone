function Errors({ errors }){
    return (
        <div className="alert alert-danger" role="alert">
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
        </div>
    )
}

export default Errors;