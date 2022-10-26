

function addSignedUp(pickupId) {
const [signedUps, setSignedUps] = useState([]);



useEffect(() => {
    fetch(`http://localhost:8080/signedUp/${pickupId}`)
    .then(resp => {
        if (resp.status === 200) {
            return resp.json();
        }
        return Promise.reject('Something terrible has occurred');
    })
    .then(data => {
        setSignedUps(data)
    })
    .catch(err => history.pushState('./error', {errorMessage: err}));
}, [])

const joinPickup = () => {

    const init =  {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...signedUp})
    };

    fetch('http://localhost:8080/signedUp', init)
    .then(resp => {
        if(resp.status === 201 || resp.status === 400){
            return resp.json();
        }
        return Promise.reject('Something terrible has gone wrong');
    })
    .then(body => {
        if (body.signedUpId){
            history.push('/pickup')
        } else if (body) {
            setErrors(body);
        }
    })
    .catch(err => history.push('./errors', {errorMessage: err}));
}

const handleJoin = () => {
    joinPickup();
}



return(
<div>
<button type="button" className="btn btn-primary" onClick={handleJoin}>Join</button>
</div>)

}

export default addSignedUp;
