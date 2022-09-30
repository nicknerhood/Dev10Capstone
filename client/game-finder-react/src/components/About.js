function About() {

    return (<>
      <div className="App">
        <div className="container=flex mt-5">
          <div className="row justify-content-md-center">
            <div className="col">
              <div className="card text-center">
                <h2 className="card-header">About</h2>
                <div className="card-body text-wrap">
                  <ul>This is an App to find PickUp games near you</ul>
                  <ul>Helping people find entertainment even if all of their friends moved away</ul>
                  <ul>This app was created by Team_Name_Generator</ul>
                </div>
              </div>
              <div className="center-block mt-5">
                        <img className="image" src="../images/game-finder-icon.png" width="400" height="400" alt= "" />
                </div>
            </div>
          </div>
        </div>
      </div>
    </>);
  }
  
  export default About;